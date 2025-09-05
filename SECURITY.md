# Security Guidelines for MealPlanner PWA

## 🔐 Deploy Key Security

### ⚠️ CRITICAL: Never Commit Deploy Keys

**NEVER** commit real deploy keys, API keys, or any sensitive credentials to the repository.

### ✅ Secure Testing Approach

For testing GitHub sync functionality:

1. **Use Environment Variables** (recommended):
   ```bash
   # Set environment variable for testing
   export GITHUB_DEPLOY_KEY="-----BEGIN OPENSSH PRIVATE KEY-----
   [your actual key content here]
   -----END OPENSSH PRIVATE KEY-----"
   
   # Run tests
   npm test
   ```

2. **Use Local Configuration File** (not committed):
   ```javascript
   // Create test-config.local.js (add to .gitignore)
   export const TEST_CONFIG = {
     githubRepo: 'https://github.com/chasemp/mp',
     deployKey: process.env.GITHUB_DEPLOY_KEY || 'mock-key-for-unit-tests'
   };
   ```

3. **Manual Testing Only**:
   - Test GitHub sync functionality manually in the browser
   - Use Settings tab to enter deploy key temporarily
   - Never save real keys in code

### 🛡️ Security Best Practices

1. **Deploy Key Management**:
   - Generate deploy keys specifically for this application
   - Use read-only keys when possible
   - Rotate keys regularly
   - Revoke unused keys immediately

2. **Local Storage Security**:
   - Deploy keys are stored in browser localStorage
   - Keys are not transmitted to external services (except GitHub API)
   - Clear localStorage when switching devices/browsers

3. **Repository Permissions**:
   - Use minimal required permissions
   - Consider using GitHub Apps for better security
   - Monitor repository access logs

### 🔍 Security Checklist

Before committing code:

- [ ] No hardcoded deploy keys in any files
- [ ] No real API keys or tokens in code
- [ ] Test files use mock/placeholder keys only
- [ ] Environment variables used for sensitive data
- [ ] .gitignore includes local config files

### 🚨 If Keys Are Accidentally Committed

1. **Immediately revoke the compromised key** in GitHub repository settings
2. **Generate a new deploy key**
3. **Remove the key from git history**:
   ```bash
   # Remove from history (use with caution)
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch path/to/file/with/key' \
   --prune-empty --tag-name-filter cat -- --all
   ```
4. **Force push to update remote history**
5. **Notify team members to re-clone repository**

### 📋 Testing Configuration

#### Safe Testing (Default)
By default, all tests run with mock data and no real credentials:

```bash
# Run all tests with mock data (safe)
npm test

# Run GitHub sync tests with mock data only
npm run test:github
```

#### Real GitHub API Testing (Optional)
To test with real GitHub API (requires deploy key):

```bash
# Method 1: Environment variable
export GITHUB_DEPLOY_KEY="-----BEGIN OPENSSH PRIVATE KEY-----
your-actual-deploy-key-content-here
-----END OPENSSH PRIVATE KEY-----"
npm run test:github

# Method 2: One-liner (from file)
GITHUB_DEPLOY_KEY="$(cat path/to/your-deploy-key.pem)" npm run test:github

# Method 3: Create .env.test file (copy from env.test.example)
cp env.test.example .env.test
# Edit .env.test with your actual key
npm run test:github:real
```

#### Test Behavior
- **Without deploy key**: Tests run with mock data, real API tests are skipped
- **With deploy key**: All tests run, including real GitHub API calls
- **Skipped tests**: Clearly marked with ↓ symbol and explanatory messages

### 🔗 Related Security Resources

- [GitHub Deploy Keys Documentation](https://docs.github.com/en/developers/overview/managing-deploy-keys)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [PWA Security Guidelines](https://web.dev/security/)

## 🏷️ Security Labels

Use these labels for security-related issues:

- `security` - General security concerns
- `credentials` - Issues with API keys/deploy keys
- `privacy` - User data privacy concerns
- `vulnerability` - Potential security vulnerabilities
