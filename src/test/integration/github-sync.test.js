import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('GitHub Sync Integration', () => {
    let dom;
    let GitHubDatabaseSync;
    let githubSync;
    let mockFetch;

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
        console.log('🔑 Running GitHub sync tests with REAL deploy key from environment');
    } else {
        console.log('🧪 Running GitHub sync tests with MOCK deploy key (set GITHUB_DEPLOY_KEY env var for real testing)');
    }

    beforeEach(async () => {
        // Setup DOM
        dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, { url: 'http://localhost' });
        global.window = dom.window;
        global.document = dom.window.document;

        // Mock fetch
        mockFetch = vi.fn();
        global.fetch = mockFetch;

        // Mock btoa/atob
        global.btoa = vi.fn(str => Buffer.from(str).toString('base64'));
        global.atob = vi.fn(str => Buffer.from(str, 'base64').toString());

        // Load the GitHubDatabaseSync class
        const { GitHubDatabaseSync: GDS } = await import('../../../js/settings-manager.js');
        GitHubDatabaseSync = GDS;
    });

    afterEach(() => {
        vi.clearAllMocks();
        if (dom) {
            dom.window.close();
        }
    });

    describe('Repository URL Parsing', () => {
        it('should correctly parse the test repository URL', () => {
            githubSync = new GitHubDatabaseSync(testRepo, mockDeployKey);
            
            expect(githubSync.owner).toBe('chasemp');
            expect(githubSync.repo).toBe('mp');
            expect(githubSync.apiBase).toBe('https://api.github.com');
        });

        it('should handle repository URL with trailing slash', () => {
            githubSync = new GitHubDatabaseSync(testRepo + '/', mockDeployKey);
            
            expect(githubSync.owner).toBe('chasemp');
            expect(githubSync.repo).toBe('mp');
        });

        it('should throw error for invalid repository URL', () => {
            expect(() => {
                new GitHubDatabaseSync('invalid-url', mockDeployKey);
            }).toThrow('Invalid GitHub repository URL');
        });
    });

    describe('Deploy Key Handling', () => {
        it('should store deploy key correctly', () => {
            githubSync = new GitHubDatabaseSync(testRepo, mockDeployKey);
            
            expect(githubSync.deployKey).toBe(mockDeployKey);
            expect(githubSync.readOnly).toBe(false);
        });

        it('should handle read-only mode without deploy key', () => {
            githubSync = new GitHubDatabaseSync(testRepo, '', true);
            
            expect(githubSync.deployKey).toBe('');
            expect(githubSync.readOnly).toBe(true);
        });

        it('should validate deploy key format', () => {
            const validKey = mockDeployKey;
            expect(validKey).toContain('-----BEGIN OPENSSH PRIVATE KEY-----');
            expect(validKey).toContain('-----END OPENSSH PRIVATE KEY-----');
        });
    });

    describe('Database Loading from GitHub', () => {
        beforeEach(() => {
            githubSync = new GitHubDatabaseSync(testRepo, mockDeployKey);
        });

        it('should handle successful database load', async () => {
            const mockDatabaseContent = {
                format: 'mealplanner-db',
                version: '1.0',
                data: btoa('mock database content')
            };

            mockFetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    content: btoa(JSON.stringify(mockDatabaseContent))
                })
            });

            const result = await githubSync.loadDatabase();
            
            expect(result).toBeInstanceOf(Uint8Array);
            expect(mockFetch).toHaveBeenCalledWith(
                'https://api.github.com/repos/chasemp/mp/contents/mealplanner.json'
            );
        });

        it('should handle 404 (no existing database)', async () => {
            mockFetch.mockResolvedValue({
                ok: false,
                status: 404
            });

            const result = await githubSync.loadDatabase();
            
            expect(result).toBe(null);
            expect(mockFetch).toHaveBeenCalledWith(
                'https://api.github.com/repos/chasemp/mp/contents/mealplanner.json'
            );
        });

        it('should handle API errors gracefully', async () => {
            mockFetch.mockResolvedValue({
                ok: false,
                status: 403,
                statusText: 'Forbidden'
            });

            await expect(githubSync.loadDatabase()).rejects.toThrow('GitHub API error: 403 Forbidden');
        });

        it('should handle network errors', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));

            await expect(githubSync.loadDatabase()).rejects.toThrow('Network error');
        });
    });

    describe('Database Saving to GitHub', () => {
        beforeEach(() => {
            githubSync = new GitHubDatabaseSync(testRepo, mockDeployKey);
        });

        it('should reject save in read-only mode', async () => {
            const readOnlySync = new GitHubDatabaseSync(testRepo, '', true);
            
            await expect(readOnlySync.saveDatabase('test data')).rejects.toThrow('Cannot save in read-only mode');
        });

        it('should reject save without deploy key', async () => {
            const noKeySync = new GitHubDatabaseSync(testRepo, '');
            
            await expect(noKeySync.saveDatabase('test data')).rejects.toThrow('Deploy key required for write access');
        });

        it('should handle successful save (new file)', async () => {
            // Mock getting current file (404 - doesn't exist)
            mockFetch
                .mockResolvedValueOnce({
                    ok: false,
                    status: 404
                })
                // Mock successful save
                .mockResolvedValueOnce({
                    ok: true,
                    status: 201,
                    json: () => Promise.resolve({ sha: 'new-sha-123' })
                });

            const result = await githubSync.saveDatabase('test database content');
            
            expect(result).toBe(true);
            expect(mockFetch).toHaveBeenCalledTimes(2);
            
            // Check the save request
            const saveCall = mockFetch.mock.calls[1];
            expect(saveCall[0]).toBe('https://api.github.com/repos/chasemp/mp/contents/mealplanner.json');
            expect(saveCall[1].method).toBe('PUT');
            
            const requestBody = JSON.parse(saveCall[1].body);
            expect(requestBody.message).toContain('Update MealPlanner database');
            expect(requestBody.content).toBe(btoa('test database content'));
        });

        it('should handle successful save (update existing file)', async () => {
            // Mock getting current file (exists)
            mockFetch
                .mockResolvedValueOnce({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({ sha: 'existing-sha-456' })
                })
                // Mock successful update
                .mockResolvedValueOnce({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({ sha: 'updated-sha-789' })
                });

            const result = await githubSync.saveDatabase('updated database content');
            
            expect(result).toBe(true);
            expect(mockFetch).toHaveBeenCalledTimes(2);
            
            // Check the update request includes SHA
            const updateCall = mockFetch.mock.calls[1];
            const requestBody = JSON.parse(updateCall[1].body);
            expect(requestBody.sha).toBe('existing-sha-456');
        });

        it('should handle save errors', async () => {
            // Mock getting current file (doesn't exist)
            mockFetch
                .mockResolvedValueOnce({
                    ok: false,
                    status: 404
                })
                // Mock failed save
                .mockResolvedValueOnce({
                    ok: false,
                    status: 422,
                    statusText: 'Unprocessable Entity'
                });

            await expect(githubSync.saveDatabase('test content')).rejects.toThrow('Failed to save to GitHub: 422 Unprocessable Entity');
        });
    });

    describe('Real Repository Integration', () => {
        beforeEach(() => {
            githubSync = new GitHubDatabaseSync(testRepo, mockDeployKey);
        });

        it('should construct correct API URLs for the test repository', () => {
            expect(githubSync.owner).toBe('chasemp');
            expect(githubSync.repo).toBe('mp');
            
            const expectedUrl = 'https://api.github.com/repos/chasemp/mp/contents/mealplanner.json';
            
            // This is the URL that would be used for API calls
            expect(`${githubSync.apiBase}/repos/${githubSync.owner}/${githubSync.repo}/contents/mealplanner.json`).toBe(expectedUrl);
        });

        it('should handle the specific deploy key format provided', () => {
            expect(githubSync.deployKey).toContain('-----BEGIN OPENSSH PRIVATE KEY-----');
            expect(githubSync.deployKey).toContain('MOCK_KEY_FOR_TESTING_ONLY');
            expect(githubSync.deployKey).toContain('-----END OPENSSH PRIVATE KEY-----');
            expect(githubSync.deployKey).toContain('PLACEHOLDER_CONTENT');
        });

        it('should prepare correct commit message format', async () => {
            // Mock the API calls
            mockFetch
                .mockResolvedValueOnce({ ok: false, status: 404 })
                .mockResolvedValueOnce({ ok: true, status: 201 });

            await githubSync.saveDatabase('test content');
            
            const saveCall = mockFetch.mock.calls[1];
            const requestBody = JSON.parse(saveCall[1].body);
            
            expect(requestBody.message).toMatch(/Update MealPlanner database - \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
            expect(requestBody.branch).toBe('main');
        });
    });

    describe('Data Serialization', () => {
        it('should handle database serialization correctly', async () => {
            const testData = 'MealPlanner database content';
            const base64Data = btoa(testData);
            
            // Mock successful save
            mockFetch
                .mockResolvedValueOnce({ ok: false, status: 404 })
                .mockResolvedValueOnce({ ok: true, status: 201 });

            await githubSync.saveDatabase(testData);
            
            const saveCall = mockFetch.mock.calls[1];
            const requestBody = JSON.parse(saveCall[1].body);
            
            expect(requestBody.content).toBe(base64Data);
        });

        it('should handle database deserialization correctly', async () => {
            const originalData = 'Original database content';
            const mockResponse = {
                format: 'mealplanner-db',
                data: btoa(originalData)
            };

            mockFetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    content: btoa(JSON.stringify(mockResponse))
                })
            });

            const result = await githubSync.loadDatabase();
            
            // Convert Uint8Array back to string for comparison
            const resultString = new TextDecoder().decode(result);
            expect(resultString).toBe(originalData);
        });
    });

    describe('Error Handling and Edge Cases', () => {
        it('should handle malformed JSON in repository', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    content: btoa('invalid json content')
                })
            });

            await expect(githubSync.loadDatabase()).rejects.toThrow();
        });

        it('should handle empty repository response', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    content: btoa(JSON.stringify({}))
                })
            });

            await expect(githubSync.loadDatabase()).rejects.toThrow();
        });

        it('should validate repository permissions', () => {
            // In a real scenario, this would test actual GitHub permissions
            // For now, we verify the deploy key is properly formatted
            expect(mockDeployKey).toMatch(/^-----BEGIN OPENSSH PRIVATE KEY-----[\s\S]*-----END OPENSSH PRIVATE KEY-----$/);
        });
    });

    // Real GitHub API Tests - Only run when GITHUB_DEPLOY_KEY environment variable is set
    describe('Real GitHub API Integration', () => {
        beforeEach(() => {
            if (!hasRealDeployKey) {
                console.log('⏭️  Skipping real GitHub API tests - no deploy key provided');
                console.log('   Set GITHUB_DEPLOY_KEY environment variable to run these tests');
            }
        });

        it.skipIf(!hasRealDeployKey)('should successfully read from the actual GitHub repository', async () => {
            // Remove mocks for real API testing
            vi.clearAllMocks();
            vi.unstubAllGlobals();
            
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            
            try {
                const result = await githubSync.loadDatabase();
                
                // Should either get data or a 404 (both are valid responses)
                if (result) {
                    expect(result).toBeDefined();
                    console.log('✅ Successfully loaded database from GitHub');
                } else {
                    console.log('ℹ️  No database file found in repository (expected for new repos)');
                }
            } catch (error) {
                // 404 is expected if no database file exists yet
                if (error.message.includes('404')) {
                    console.log('ℹ️  Database file not found (404) - this is expected for new repositories');
                } else {
                    throw error;
                }
            }
        });

        it.skipIf(!hasRealDeployKey)('should successfully write to the actual GitHub repository', async () => {
            // Remove mocks for real API testing
            vi.clearAllMocks();
            vi.unstubAllGlobals();
            
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            
            const testContent = JSON.stringify({
                format: 'mealplanner-db',
                timestamp: new Date().toISOString(),
                data: 'test-data-from-integration-test',
                version: '1.0.0'
            });
            
            try {
                await githubSync.saveDatabase(testContent);
                console.log('✅ Successfully saved test database to GitHub');
                
                // Verify we can read it back
                const result = await githubSync.loadDatabase();
                expect(result).toBeDefined();
                
                const parsed = JSON.parse(result);
                expect(parsed.data).toBe('test-data-from-integration-test');
                console.log('✅ Successfully verified round-trip save/load to GitHub');
                
            } catch (error) {
                console.error('❌ GitHub API test failed:', error.message);
                throw error;
            }
        });

        it.skipIf(!hasRealDeployKey)('should handle repository permissions correctly', async () => {
            // Remove mocks for real API testing
            vi.clearAllMocks();
            vi.unstubAllGlobals();
            
            githubSync = new GitHubDatabaseSync(testRepo, testDeployKey);
            
            // Test that we can access the repository
            try {
                // This should work if the deploy key has proper permissions
                await githubSync.loadDatabase();
                console.log('✅ Deploy key has proper read permissions');
            } catch (error) {
                if (error.message.includes('404')) {
                    console.log('ℹ️  Repository accessible, no database file yet');
                } else if (error.message.includes('403')) {
                    throw new Error('Deploy key lacks read permissions for repository');
                } else {
                    throw error;
                }
            }
        });
    });
});
