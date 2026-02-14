# Deployment Documentation

## Deferred Vercel Deployment (Existing Project)

Deployment is FULLY SET UP and READY, but intentionally not finalized or activated until all remaining website components are verified.

### Exact Commands for Final Deployment
Once credentials are set, run:
```bash
npx vercel --token $VERCEL_TOKEN --yes
npx vercel --prod --token $VERCEL_TOKEN --yes
```

### Preconditions Checklist
- [ ] All sub-projects added and verified.
- [ ] Final UI/UX review completed.
- [ ] Environment variables (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID) set in the environment.

### Vercel Linkage
The project uses `.vercel/project.json` for automatic linkage to the existing Vercel project.
Template content:
```json
{
  "orgId": "${VERCEL_ORG_ID}",
  "projectId": "${VERCEL_PROJECT_ID}"
}
```

## Local Build Verification
To verify the build locally:
```bash
npm install
npm run build
```
