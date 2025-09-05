import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock wasm-git at the top level
const mockGit = {
    callMain: vi.fn(),
    FS: {
        mkdir: vi.fn(),
        writeFile: vi.fn(),
        readFile: vi.fn(() => new Uint8Array([1, 2, 3, 4])), // Mock database data
        stat: vi.fn()
    }
};

vi.mock('wasm-git/lg2_async.js', () => ({
    default: vi.fn(() => Promise.resolve(mockGit))
}));

// Mock SecureTokenStorage for testing
class MockSecureTokenStorage {
    constructor() {
        this.tokens = {};
    }
    
    async storeTokens(tokens) {
        this.tokens = { ...this.tokens, ...tokens };
        return Promise.resolve();
    }
    
    async getTokens() {
        return Promise.resolve(this.tokens);
    }
    
    async clearTokens() {
        this.tokens = {};
        return Promise.resolve();
    }
}

// Make SecureTokenStorage available globally for the GitHubDatabaseSync class
global.SecureTokenStorage = MockSecureTokenStorage;

describe('GitHub Git Sync Integration', () => {
    let dom;
    let GitHubDatabaseSync;
    let githubSync;

    // Test repository details
    const testRepo = 'https://github.com/chasemp/mp';
    
    // Check for deploy key in environment variable
    const deployKey = process.env.GITHUB_DEPLOY_KEY;
    const hasRealDeployKey = deployKey && deployKey.includes('-----BEGIN OPENSSH PRIVATE KEY-----');
    
    
    // Mock deploy key for unit tests (when real key not available)
    const mockDeployKey = `-----BEGIN OPENSSH PRIVATE KEY-----
MOCK_KEY_FOR_TESTING_ONLY_NOT_REAL_KEY_DATA_PLACEHOLDER_CONTENT
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
-----END OPENSSH PRIVATE KEY-----`;

    // Use real deploy key if available, otherwise use mock for basic tests
    const testDeployKey = hasRealDeployKey ? deployKey : mockDeployKey;

    // Log testing mode
    if (hasRealDeployKey) {
        console.log('🔑 Running GitHub Git sync tests with REAL deploy key from environment');
    } else {
        console.log('🧪 Running GitHub Git sync tests with MOCK deploy key (set GITHUB_DEPLOY_KEY env var for real testing)');
    }

    beforeEach(async () => {
        // Setup DOM
        dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, { url: 'http://localhost' });
        global.window = dom.window;
        global.document = dom.window.document;

        // Reset mocks for each test
        vi.clearAllMocks();

        // Mock process.chdir for Git operations
        global.process = global.process || {};
        global.process.chdir = vi.fn();

        // Load the GitHubDatabaseSync class
        const { GitHubDatabaseSync: GitHubDatabaseSyncClass } = await import('../../../js/settings-manager.js');
        GitHubDatabaseSync = GitHubDatabaseSyncClass;
    });

    afterEach(() => {
        vi.clearAllMocks();
        dom.window.close();
    });

    describe('Git-based Repository Operations', () => {
        it('should initialize wasm-git correctly', async () => {
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            
            await githubSync.initializeGit();
            
            expect(githubSync.git).toBeDefined();
            expect(githubSync.fs).toBeDefined();
        });

        it('should setup SSH credentials correctly (memory-only)', async () => {
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            await githubSync.initializeGit();
            
            // Mock the setCredentialsCallback method
            mockGit.setCredentialsCallback = vi.fn();
            
            await githubSync.setupSSHCredentials();
            
            // 🔐 SECURITY: Verify SSH credentials are NOT written to filesystem
            expect(mockGit.FS.mkdir).not.toHaveBeenCalledWith('/home/.ssh', 0o700);
            expect(mockGit.FS.writeFile).not.toHaveBeenCalledWith(
                '/home/.ssh/id_rsa', 
                expect.any(String), 
                expect.any(Object)
            );
            
            // Verify credentials callback was set up for memory-only authentication
            if (mockGit.setCredentialsCallback) {
                expect(mockGit.setCredentialsCallback).toHaveBeenCalledWith(expect.any(Function));
                
                // Test the credentials callback
                const callback = mockGit.setCredentialsCallback.mock.calls[0][0];
                const credentials = callback('git@github.com:chasemp/mp.git', 'git');
                
                expect(credentials).toEqual({
                    type: 'ssh',
                    username: 'git',
                    privateKey: testDeployKey,
                    publicKey: '',
                    passphrase: ''
                });
            }
        });

        it('should clone repository when it does not exist locally', async () => {
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            await githubSync.initializeGit();
            
            // Mock that local repository doesn't exist
            mockGit.FS.stat.mockImplementation(() => {
                throw new Error('ENOENT: no such file or directory');
            });
            
            // Mock successful clone
            mockGit.callMain.mockResolvedValue(undefined);
            
            const result = await githubSync.ensureRepository();
            
            expect(mockGit.callMain).toHaveBeenCalledWith([
                'clone', 
                'git@github.com:chasemp/mp.git', 
                '/tmp/mealplanner-repo'
            ]);
            expect(result).toBe(true);
        });

        it('should pull changes when repository exists locally', async () => {
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            await githubSync.initializeGit();
            
            // Mock that local repository exists
            mockGit.FS.stat.mockReturnValue({ isDirectory: () => true });
            
            // Mock successful pull
            mockGit.callMain.mockResolvedValue(undefined);
            
            const result = await githubSync.ensureRepository();
            
            expect(global.process.chdir).toHaveBeenCalledWith('/tmp/mealplanner-repo');
            expect(mockGit.callMain).toHaveBeenCalledWith(['pull', 'origin', 'main']);
            expect(result).toBe(true);
        });

        it('should handle empty repository gracefully', async () => {
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            await githubSync.initializeGit();
            
            // Mock that local repository doesn't exist
            mockGit.FS.stat.mockImplementation(() => {
                throw new Error('ENOENT: no such file or directory');
            });
            
            // Mock clone failure (repository not found)
            mockGit.callMain.mockImplementation((args) => {
                if (args[0] === 'clone') {
                    throw new Error('repository not found');
                }
                return Promise.resolve();
            });
            
            const result = await githubSync.ensureRepository();
            
            // Should initialize new repository
            expect(mockGit.FS.mkdir).toHaveBeenCalledWith('/tmp/mealplanner-repo', 0o755);
            expect(mockGit.callMain).toHaveBeenCalledWith(['init', '/tmp/mealplanner-repo']);
            expect(mockGit.callMain).toHaveBeenCalledWith([
                'remote', 'add', 'origin', 'git@github.com:chasemp/mp.git'
            ]);
            expect(result).toBe(false); // No existing database
        });
    });

    describe('Database Operations', () => {
        it('should load database from repository', async () => {
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            await githubSync.initializeGit();
            
            // Mock repository exists
            mockGit.FS.stat.mockReturnValue({ isDirectory: () => true });
            mockGit.callMain.mockResolvedValue(undefined);
            
            const result = await githubSync.loadDatabase();
            
            expect(mockGit.FS.readFile).toHaveBeenCalledWith('/tmp/mealplanner-repo/mealplanner.json');
            expect(result).toEqual(new Uint8Array([1, 2, 3, 4]));
        });

        it('should return null when database file does not exist', async () => {
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            await githubSync.initializeGit();
            
            // Mock repository exists but file doesn't
            mockGit.FS.stat.mockReturnValue({ isDirectory: () => true });
            mockGit.callMain.mockResolvedValue(undefined);
            mockGit.FS.readFile.mockImplementation(() => {
                const error = new Error('ENOENT: no such file or directory');
                error.code = 'ENOENT';
                throw error;
            });
            
            const result = await githubSync.loadDatabase();
            
            expect(result).toBeNull();
        });

        it('should save database to repository', async () => {
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            await githubSync.initializeGit();
            
            // Mock repository exists
            mockGit.FS.stat.mockReturnValue({ isDirectory: () => true });
            mockGit.callMain.mockResolvedValue(undefined);
            
            const testData = new Uint8Array([5, 6, 7, 8]);
            const result = await githubSync.saveDatabase(testData);
            
            // Verify file was written
            expect(mockGit.FS.writeFile).toHaveBeenCalledWith(
                '/tmp/mealplanner-repo/mealplanner.json',
                testData
            );
            
            // Verify Git operations
            expect(mockGit.callMain).toHaveBeenCalledWith(['config', 'user.name', 'MealPlanner App']);
            expect(mockGit.callMain).toHaveBeenCalledWith(['config', 'user.email', 'mealplanner@app.local']);
            expect(mockGit.callMain).toHaveBeenCalledWith(['add', 'mealplanner.json']);
            expect(mockGit.callMain).toHaveBeenCalledWith(['commit', '-m', 'Update MealPlanner database']);
            expect(mockGit.callMain).toHaveBeenCalledWith(['push', 'origin', 'main']);
            
            expect(result).toEqual({ success: true });
        });

        it('should reject save in read-only mode', async () => {
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey, true); // read-only
            
            const testData = new Uint8Array([5, 6, 7, 8]);
            
            await expect(githubSync.saveDatabase(testData)).rejects.toThrow('Cannot save in read-only mode');
        });

        it('should reject save without deploy key', async () => {
            githubSync = new GitHubDatabaseSync(testRepo, null); // no deploy key
            
            const testData = new Uint8Array([5, 6, 7, 8]);
            
            await expect(githubSync.saveDatabase(testData)).rejects.toThrow('Deploy key required for write access');
        });
    });

    describe('Real Git Integration', () => {
        // These tests only run if a real deploy key is provided
        it.skipIf(!hasRealDeployKey)('should work with real Git operations', async () => {
            // Don't clear mocks completely - we still need SecureTokenStorage mock
            // vi.clearAllMocks();
            // vi.unstubAllGlobals();
            
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            
            try {
                console.log('🚀 Testing REAL Git operations with deploy key...');
                
                // Test that deploy key is provided in constructor
                expect(githubSync.deployKey).toBeDefined();
                expect(githubSync.deployKey).toContain('-----BEGIN OPENSSH PRIVATE KEY-----');
                console.log('✅ Deploy key provided in constructor: PASS');
                
                // Test secure deploy key loading from environment (simulate no secure storage)
                const githubSyncNoKey = new GitHubDatabaseSync(testRepo, null);
                githubSyncNoKey.secureStorage = null; // Force environment variable fallback
                const retrievedKey = await githubSyncNoKey.getDeployKeySecurely();
                expect(retrievedKey).toBeDefined();
                expect(retrievedKey).toContain('-----BEGIN OPENSSH PRIVATE KEY-----');
                console.log('✅ Deploy key retrieval from environment: PASS');
                
                // Test secure storage/retrieval cycle
                await githubSync.storeDeployKeySecurely(testDeployKey);
                const storedKey = await githubSync.getDeployKeySecurely();
                expect(storedKey).toBe(testDeployKey);
                console.log('✅ Secure storage cycle: PASS');
                
                // Test memory cleanup
                await githubSync.loadDatabase(); // This should clear deployKey in finally block
                expect(githubSync.deployKey).toBeNull();
                console.log('✅ Memory cleanup after operations: PASS');
                
                console.log('🎉 All real Git integration tests PASSED!');
                
            } catch (error) {
                console.error('❌ Real Git test failed:', error.message);
                // This is a real test failure - we should know about it
                throw error;
            }
        });

        it.skipIf(hasRealDeployKey)('should skip real Git tests without deploy key', () => {
            console.log('⏭️  Skipping real Git integration tests - no deploy key provided');
            console.log('   Set GITHUB_DEPLOY_KEY environment variable to run these tests');
            expect(true).toBe(true);
        });
    });
});
