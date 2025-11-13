# FileForge Codebase Issues & Improvements List

**Generated:** November 13, 2025  
**Scope:** Complete codebase review (API, Worker, Client)  
**Severity Levels:** 🔴 Critical | 🟠 High | 🟡 Medium | 🔵 Low | ℹ️ Info

---

## 🔴 CRITICAL ISSUES

### 1. **Exposed API Keys and Secrets in Code**
- **Location:** `client/src/lib/firebase.ts` (lines 8-16)
- **Issue:** Firebase configuration hardcoded directly in source code instead of using environment variables
- **Risk:** Security vulnerability - API keys exposed in version control and client bundle
- **Fix:** Move to `.env` file and use `import.meta.env.VITE_FIREBASE_*` variables

### 2. **Exposed Database Credentials**
- **Location:** `worker/.env` (line 1)
- **Issue:** MongoDB connection string with credentials committed to repository
- **Risk:** Database access credentials exposed in version control
- **Fix:** Add `.env` to `.gitignore` and use environment variables only

### 3. **Exposed Gemini API Key**
- **Location:** `client/.env` (line 1)
- **Issue:** Google Gemini API key committed to repository
- **Risk:** API key can be stolen and abused, leading to billing issues
- **Fix:** Remove from repository, add to `.gitignore`, use secure environment management

### 4. **Missing Email Unique Index**
- **Location:** `api/models/userModel.ts` (line 23)
- **Issue:** Email field has `unique: true` commented out
- **Risk:** Allows duplicate email registrations, data integrity issues
- **Fix:** Uncomment `unique: true` or add proper duplicate checking logic

### 5. **Inconsistent Cookie Configuration**
- **Location:** `api/controllers/authController.ts` (lines 73-79, 115-120, 217-221)
- **Issue:** Cookie sameSite attribute uses different types (`"none"` vs `"lax"`) causing TypeScript type errors
- **Risk:** Authentication cookies may not work correctly across environments
- **Fix:** Use consistent typing with `as const` assertion

---

## 🟠 HIGH PRIORITY ISSUES

### 6. **Missing Error Handling in File Cleanup**
- **Location:** `worker/app/api/routes/convert_routes.py` (multiple finally blocks)
- **Issue:** `os.remove(temp_path)` can fail if file doesn't exist or is locked
- **Risk:** Unhandled exceptions, temp files not cleaned up
- **Fix:** Wrap in try-except block: `try: os.remove(temp_path) except: pass`

### 7. **Duplicate `load_dotenv()` Call**
- **Location:** `worker/app/config/db.py` (lines 1-2, 5)
- **Issue:** `load_dotenv()` called twice unnecessarily
- **Risk:** Performance overhead, code duplication
- **Fix:** Remove duplicate import and call

### 8. **Missing Input Validation**
- **Location:** `api/routes/conversionRoutes.ts` (line 13)
- **Issue:** No validation for `operation` parameter format before splitting
- **Risk:** Potential crashes if malformed operation string is sent
- **Fix:** Add validation: `if (!operation || !operation.includes('-to-')) { return res.status(400)... }`

### 9. **Incorrect Return Statement**
- **Location:** `api/routes/conversionRoutes.ts` (line 16)
- **Issue:** Missing `return` after sending 400 response
- **Risk:** Code continues executing after error response
- **Fix:** Add `return;` after `res.status(400).json(...)`

### 10. **Missing File Validation**
- **Location:** `api/routes/conversionRoutes.ts` (line 11)
- **Issue:** No validation that file exists before processing
- **Risk:** Undefined behavior if no file uploaded
- **Fix:** Add proper check and return early

### 11. **Unused Worker Instance**
- **Location:** `api/routes/conversionRoutes.ts` (lines 56-67)
- **Issue:** BullMQ worker created but never used for actual job processing
- **Risk:** Memory leak, unnecessary Redis connection
- **Fix:** Either implement queue-based processing or remove worker code

### 12. **Missing Await in Async Function**
- **Location:** `worker/app/services/conversions/imageConversion.py` (line 42)
- **Issue:** `_log_to_db()` is async but not awaited (if MongoDB operations are async)
- **Risk:** Database operations may not complete before function returns
- **Fix:** Check if MongoDB operations are async and add await if needed

### 13. **Hardcoded Pandoc Installer**
- **Location:** `worker/pandoc-3.7.0.2-windows-x86_64.msi`
- **Issue:** 50MB+ installer committed to repository
- **Risk:** Bloats repository size, not cross-platform
- **Fix:** Remove from repo, add installation instructions to README

### 14. **Missing Type Safety**
- **Location:** `api/controllers/authController.ts` (line 217)
- **Issue:** Cookie options use `as const` but sameSite still has type mismatch
- **Risk:** Runtime errors in production
- **Fix:** Properly type sameSite as `"none" | "lax" | "strict"`

---

## 🟡 MEDIUM PRIORITY ISSUES

### 15. **Inconsistent Error Messages**
- **Location:** `api/controllers/authController.ts` (line 60)
- **Issue:** Error message uses template literal with provider name but may be undefined
- **Risk:** Confusing error messages like "Use undefined to login"
- **Fix:** Add null check: `Use ${user?.provider || 'social login'} to login`

### 16. **Duplicate Redirect Logic**
- **Location:** `api/controllers/authController.ts` (lines 177-178)
- **Issue:** Two redirect statements for failed verification
- **Risk:** Second redirect never executes, dead code
- **Fix:** Remove duplicate line 178

### 17. **Missing Index on Provider Fields**
- **Location:** `api/models/userModel.ts` (line 82)
- **Issue:** Compound index on provider+providerId but no validation
- **Risk:** Slow queries for social login lookups
- **Fix:** Add validation to ensure both fields are set together

### 18. **Inconsistent Timestamp Handling**
- **Location:** `worker/app/services/conversions/*.py` (all files)
- **Issue:** Using `datetime.utcnow()` which is deprecated in Python 3.12+
- **Risk:** Deprecation warnings, future compatibility issues
- **Fix:** Use `datetime.now(timezone.utc)` instead

### 19. **Missing File Size Validation**
- **Location:** `api/routes/conversionRoutes.ts`
- **Issue:** No check for file size before forwarding to Python worker
- **Risk:** Large files can crash the system or cause timeouts
- **Fix:** Add file size limit check (e.g., 50MB max)

### 20. **Incomplete Error Context**
- **Location:** `api/routes/conversionRoutes.ts` (line 48)
- **Issue:** Only logging error message, not full error object
- **Risk:** Missing stack traces for debugging
- **Fix:** Log full error: `logger.error("Error:", error)`

### 21. **Missing Content-Type Validation**
- **Location:** `worker/app/api/routes/convert_routes.py`
- **Issue:** Only checking file extension, not MIME type
- **Risk:** Malicious files with fake extensions can be processed
- **Fix:** Validate both extension and MIME type

### 22. **Hardcoded Port Numbers**
- **Location:** `api/server.ts` (line 48), `worker/setup.sh` (line 14)
- **Issue:** Port 4000 and 8000 hardcoded instead of using environment variables
- **Risk:** Port conflicts in different environments
- **Fix:** Use `process.env.PORT` with fallback

### 23. **Missing Rate Limiting**
- **Location:** `api/server.ts`
- **Issue:** No rate limiting middleware configured
- **Risk:** API abuse, DDoS attacks
- **Fix:** Add express-rate-limit middleware

### 24. **Incomplete Test Coverage**
- **Location:** `api/__tests__/integration/auth.test.ts`
- **Issue:** Only auth routes tested, no tests for conversion routes
- **Risk:** Conversion logic bugs not caught by tests
- **Fix:** Add integration tests for file conversion endpoints

### 25. **Missing CSRF Protection**
- **Location:** `api/server.ts`
- **Issue:** No CSRF token validation for state-changing operations
- **Risk:** Cross-site request forgery attacks
- **Fix:** Implement CSRF protection for POST/PUT/DELETE routes

### 26. **Inconsistent Credit Deduction**
- **Location:** `client/src/components/universal-convertor/main.tsx` (line 103)
- **Issue:** Credits deducted after successful conversion, not before
- **Risk:** Users can process files even with insufficient credits if timing is right
- **Fix:** Check and reserve credits before processing

### 27. **Missing Transaction Support**
- **Location:** `api/controllers/accountController.ts` (line 67)
- **Issue:** Credit updates not atomic, race condition possible
- **Risk:** Credit balance can become inconsistent with concurrent requests
- **Fix:** Use MongoDB transactions or atomic operations

### 28. **Incomplete Dockerfile**
- **Location:** `worker/DockerFile`
- **Issue:** Missing health check, no non-root user, no multi-stage build
- **Risk:** Security vulnerabilities, larger image size
- **Fix:** Add USER directive, HEALTHCHECK, and multi-stage build

---

## 🔵 LOW PRIORITY ISSUES

### 29. **Unused Import**
- **Location:** `worker/app/services/conversions/imageConversion.py` (line 5)
- **Issue:** `pytesseract` imported but never used
- **Risk:** Unnecessary dependency
- **Fix:** Remove import or implement OCR feature

### 30. **Commented Out Code**
- **Location:** `client/src/lib/firebase.ts` (lines 3-10)
- **Issue:** Environment variable configuration commented out
- **Risk:** Confusing for developers, dead code
- **Fix:** Remove commented code or document why it's there

### 31. **Inconsistent Naming Convention**
- **Location:** `worker/DockerFile` (filename)
- **Issue:** Should be `Dockerfile` not `DockerFile`
- **Risk:** Docker build commands may not work
- **Fix:** Rename to `Dockerfile`

### 32. **Missing JSDoc Comments**
- **Location:** `client/src/components/universal-convertor/main.tsx`
- **Issue:** Complex functions lack documentation
- **Risk:** Harder for team members to understand code
- **Fix:** Add JSDoc comments for public functions

### 33. **Magic Numbers**
- **Location:** `client/src/components/universal-convertor/main.tsx` (line 103)
- **Issue:** Hardcoded credit cost (10) without constant
- **Risk:** Hard to maintain if credit costs change
- **Fix:** Define `const CONVERSION_CREDIT_COST = 10`

### 34. **Inconsistent File Extensions**
- **Location:** `client/src/data/toolConfigs.ts`
- **Issue:** Extension map uses inconsistent format (some with dot, some without)
- **Risk:** Potential bugs in file naming
- **Fix:** Standardize to always include dot prefix

### 35. **Missing Loading States**
- **Location:** `client/src/components/universal-convertor/results-panel.tsx`
- **Issue:** No loading indicator while fetching user credits
- **Risk:** Poor UX during slow network
- **Fix:** Add skeleton loader or spinner

### 36. **Duplicate Type Definitions**
- **Location:** `api/types/express/` directory exists but is empty
- **Issue:** Custom Express types not defined
- **Risk:** Missing type safety for custom request properties
- **Fix:** Define AuthRequest type in types directory

### 37. **Missing Pagination**
- **Location:** `client/src/components/universal-convertor/results-panel.tsx`
- **Issue:** Shows all completed jobs without pagination
- **Risk:** Performance issues with many jobs
- **Fix:** Implement virtual scrolling or pagination

### 38. **Inconsistent Error Handling**
- **Location:** `client/src/context/auth.tsx` (line 88)
- **Issue:** Error concatenated to string instead of proper formatting
- **Risk:** Displays "[object Object]" to users
- **Fix:** Use `error?.message` or proper error formatting

### 39. **Missing Cleanup on Unmount**
- **Location:** `client/src/components/universal-convertor/main.tsx`
- **Issue:** Blob URLs created but not revoked on component unmount
- **Risk:** Memory leaks
- **Fix:** Add cleanup in useEffect return function

### 40. **Hardcoded Text**
- **Location:** Multiple client components
- **Issue:** UI text hardcoded instead of using i18n
- **Risk:** Difficult to internationalize later
- **Fix:** Implement i18n library (e.g., react-i18next)

---

## ℹ️ INFORMATIONAL / BEST PRACTICES

### 41. **Missing API Documentation**
- **Location:** `api/routes/*.ts`
- **Issue:** No OpenAPI/Swagger documentation
- **Risk:** Harder for frontend developers to integrate
- **Fix:** Add Swagger/OpenAPI spec

### 42. **No Health Check Endpoint**
- **Location:** `api/server.ts`
- **Issue:** Missing `/health` endpoint for monitoring
- **Risk:** Can't monitor service health in production
- **Fix:** Add simple health check route

### 43. **Missing Logging Levels**
- **Location:** `api/utils/logger.ts`
- **Issue:** All logs at same level, no debug/trace separation
- **Risk:** Too verbose in production or too quiet in development
- **Fix:** Use appropriate log levels (debug, info, warn, error)

### 44. **No Request ID Tracking**
- **Location:** `api/server.ts`
- **Issue:** No correlation ID for tracing requests across services
- **Risk:** Difficult to debug distributed system issues
- **Fix:** Add request ID middleware

### 45. **Missing Metrics Collection**
- **Location:** All services
- **Issue:** No Prometheus/metrics endpoint
- **Risk:** Can't monitor performance in production
- **Fix:** Add metrics collection (response times, error rates, etc.)

### 46. **No Graceful Shutdown**
- **Location:** `api/server.ts`, `worker/app/main.py`
- **Issue:** No SIGTERM/SIGINT handlers for graceful shutdown
- **Risk:** In-flight requests lost during deployment
- **Fix:** Add signal handlers to close connections gracefully

### 47. **Missing Database Migrations**
- **Location:** Project root
- **Issue:** No migration system for schema changes
- **Risk:** Manual database updates required, error-prone
- **Fix:** Add migration tool (e.g., migrate-mongo)

### 48. **No Backup Strategy**
- **Location:** Documentation
- **Issue:** No documented backup/restore procedures
- **Risk:** Data loss in case of failure
- **Fix:** Document backup strategy and automate backups

### 49. **Missing Security Headers**
- **Location:** `api/server.ts`
- **Issue:** No helmet middleware for security headers
- **Risk:** Vulnerable to XSS, clickjacking, etc.
- **Fix:** Add helmet middleware

### 50. **No Dependency Vulnerability Scanning**
- **Location:** CI/CD pipeline
- **Issue:** No automated security scanning of dependencies
- **Risk:** Using packages with known vulnerabilities
- **Fix:** Add npm audit / Snyk to CI pipeline

### 51. **Missing Environment Validation**
- **Location:** `api/server.ts`, `worker/app/main.py`
- **Issue:** No validation that required env vars are set
- **Risk:** Cryptic errors at runtime
- **Fix:** Validate env vars at startup with clear error messages

### 52. **No API Versioning Strategy**
- **Location:** `api/routes/*.ts`
- **Issue:** All routes under `/api/v1` but no version management
- **Risk:** Breaking changes affect all clients
- **Fix:** Document versioning strategy and deprecation policy

### 53. **Missing Monitoring Alerts**
- **Location:** Infrastructure
- **Issue:** No alerting for errors, high latency, or downtime
- **Risk:** Issues go unnoticed until users complain
- **Fix:** Set up monitoring alerts (PagerDuty, Sentry, etc.)

### 54. **No Load Testing**
- **Location:** Testing suite
- **Issue:** No performance/load tests
- **Risk:** Don't know system limits until production
- **Fix:** Add load tests with k6 or Artillery

### 55. **Missing Code Coverage Badges**
- **Location:** README.md
- **Issue:** No visual indication of test coverage
- **Risk:** Coverage can decrease without notice
- **Fix:** Add coverage badge and enforce minimum threshold

---

## 📊 SUMMARY

**Total Issues Found:** 55

### By Severity:
- 🔴 Critical: 5 issues
- 🟠 High: 9 issues  
- 🟡 Medium: 14 issues
- 🔵 Low: 12 issues
- ℹ️ Info: 15 issues

### By Category:
- **Security:** 12 issues (API keys, auth, CSRF, etc.)
- **Code Quality:** 15 issues (duplicates, unused code, etc.)
- **Error Handling:** 8 issues (missing try-catch, validation, etc.)
- **Performance:** 6 issues (memory leaks, pagination, etc.)
- **Testing:** 4 issues (coverage, load testing, etc.)
- **DevOps:** 10 issues (monitoring, deployment, etc.)

### Priority Recommendations:
1. **Immediate:** Fix all 🔴 Critical issues (exposed secrets)
2. **This Sprint:** Address 🟠 High priority issues (error handling, validation)
3. **Next Sprint:** Tackle 🟡 Medium issues (performance, consistency)
4. **Backlog:** Plan for 🔵 Low and ℹ️ Info issues (refactoring, best practices)

---

## 🎯 QUICK WINS (Easy fixes with high impact)

1. Remove exposed API keys from code (Issues #1, #2, #3)
2. Fix duplicate redirect (Issue #16)
3. Add missing return statements (Issue #9)
4. Remove unused imports (Issue #29)
5. Rename DockerFile to Dockerfile (Issue #31)
6. Add health check endpoint (Issue #42)
7. Fix duplicate load_dotenv (Issue #7)
8. Add file size validation (Issue #19)
9. Fix error message formatting (Issue #38)
10. Add environment variable validation (Issue #51)

---

**Note:** This list is comprehensive but not exhaustive. Additional issues may be discovered during implementation or code review. Prioritize based on your team's capacity and project timeline.
