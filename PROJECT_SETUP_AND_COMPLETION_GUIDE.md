# CrimeGraph Project Setup and Completion Guide

This guide explains how to run CrimeGraph locally, verify the current demo, deploy it to Vercel, and turn the current static prototype into a production application.

## 1. What Works Today

The repository currently contains a responsive Next.js dashboard with:

- Dashboard views for cases, entities, documents, graph exploration, and case requests
- A documentation page at `/docs`
- Sample data stored in `app/dashboard/data.json`
- Client-side filtering, graph interactions, language selection, and demo chat state
- A deployed demo at https://crimegraph-ai-seven.vercel.app/dashboard

The current app is a frontend demo. It does not yet persist changes to a database, authenticate users, upload documents, call an AI service, or expose a production API.

The first backend foundation is now available:

- `GET /api/health` reports service status and the current storage mode.
- `GET /api/entities` lists entities and supports `search`, `type`, and `caseId` filters.
- `POST /api/entities` validates and creates an entity.
- Entity validation and storage are isolated in `lib/server/entities.ts`.

The current repository uses process memory seeded from `app/dashboard/data.json`. This is suitable for local development only; data can be lost when the process restarts or a serverless instance changes. Replace this repository with PostgreSQL before using real data.

## 2. Prerequisites

Install these tools before starting:

- Node.js 20.9 or newer
- npm 10 or newer
- Git
- A GitHub account for repository-based deployment
- A Vercel account for hosting

Check the installed versions:

```bash
node --version
npm --version
git --version
```

## 3. Run the Current Demo Locally

From the project directory, run:

```bash
npm ci
npm run dev
```

Open these URLs and verify that they load:

- http://localhost:3000/dashboard
- http://localhost:3000/docs

The welcome dialog, sidebar navigation, graph controls, tables, filters, and responsive layout should all be checked on desktop and mobile-sized browser windows.

## 4. Run Quality Checks

Run these commands before every push:

```bash
npm run lint
npm run build
```

If `eslint` is not recognized, run `npm ci` first. Never commit `node_modules`, `.next`, or local environment files.

## 5. Deploy the Current Demo to Vercel

### Option A: Import the Git repository

1. Push the project to GitHub.
2. Open the Vercel dashboard.
3. Select **Add New Project** and import the GitHub repository.
4. Set the framework to Next.js if Vercel does not detect it automatically.
5. Use the default build command, `npm run build`.
6. Leave the output directory as the default Next.js output.
7. Deploy the project.
8. Add the production URL to the README after deployment.

### Option B: Deploy from the terminal

```bash
npx vercel login
npx vercel
npx vercel --prod
```

The existing `vercel.json` already identifies the project as a Next.js application.

## 6. Decide the Production Requirements

Before implementing the backend, document these decisions:

- Who can sign in: SHO, investigator, station administrator, or system administrator
- Which users can view, create, edit, approve, and delete cases
- Which fields are required for a case, person, organization, document, and relationship
- Which document formats are accepted and the maximum file size
- Whether graph relationships are manually entered, extracted from documents, or both
- Which AI provider and model may process case information
- Data retention, export, deletion, and audit requirements
- The jurisdiction, privacy rules, and operational policies that apply

Do not put real personally identifiable information into the current demo data or public deployment.

## 7. Add the Backend Foundation

Use a server-side database and API layer. A practical first version can use PostgreSQL with a managed provider such as Neon or Supabase.

Create a schema for at least:

- `users` and `roles`
- `stations`
- `cases`
- `entities`
- `relationships`
- `documents`
- `case_requests`
- `audit_events`

Then:

1. Add a database client that runs only on the server.
2. Add migrations and seed data for development.
3. Add typed validation for every request with Zod or an equivalent schema library.
4. Add API routes or server actions for CRUD operations.
5. Replace imports from `app/dashboard/data.json` with server data queries.
6. Add loading, empty, error, and permission-denied states to every dashboard view.

Keep database credentials in environment variables. Never expose them through `NEXT_PUBLIC_*` variables.

## 8. Add Authentication and Authorization

Add an authentication provider such as Auth.js, Clerk, or Supabase Auth. The implementation must:

1. Require authentication for `/dashboard` and protected API routes.
2. Store the user, station, and role on the server-side session.
3. Enforce permissions on the server, not only by hiding buttons in the UI.
4. Restrict users to cases and documents from authorized stations.
5. Record sensitive actions in `audit_events`.
6. Add sign-in, sign-out, expired-session, and unauthorized states.

Test every role with both allowed and denied requests.

## 9. Implement Document Uploads and Processing

Use private object storage such as Vercel Blob, Supabase Storage, or S3-compatible storage.

Required workflow:

1. Validate file type, size, and ownership before upload.
2. Store files privately and issue short-lived signed URLs.
3. Store document metadata and processing status in the database.
4. Extract text asynchronously for supported formats.
5. Show processing, completed, and failed states in the Documents view.
6. Scan uploads for malware and reject unsafe files.
7. Allow authorized users to view and delete documents.

Do not process uploads directly in a request that can exceed Vercel function time limits. Use a queue or background worker for long-running extraction.

## 10. Replace the Placeholder AI Chat

The current chat returns a placeholder response from `app/dashboard/ai-chat.tsx`. Replace it with a protected server API route.

The AI workflow should:

1. Authenticate the user and verify access to the selected case.
2. Retrieve only authorized case context.
3. Redact or minimize sensitive data where possible.
4. Send the context to the selected AI provider from the server.
5. Stream or return the answer with citations to source documents and entities.
6. Store prompts and answers only according to the approved retention policy.
7. Add rate limits, token limits, timeout handling, and provider error handling.
8. Clearly label AI-generated content and require human review for operational decisions.

Do not place an AI API key in client-side code or a `NEXT_PUBLIC_*` variable.

## 11. Make the Graph Data-Driven

The graph currently renders from local demo state. Connect it to the backend by adding:

- A query for entities and relationships for the selected case
- Search and pagination for large datasets
- Server-side filters for date, entity type, and relationship type
- A path-finding endpoint with authorization checks
- Stable entity and relationship IDs
- Empty, loading, and error states
- Limits to prevent very large graph queries from exhausting browser memory

For large or highly connected datasets, evaluate a graph database or a PostgreSQL graph extension after the relational version is working.

## 12. Add Tests Before Calling It Complete

Add tests for:

- Authentication and role permissions
- Case, entity, document, and relationship CRUD operations
- Input validation and malformed requests
- File upload restrictions
- AI authorization and provider failures
- Graph filters and path finding
- Critical dashboard flows on desktop and mobile

At minimum, the CI pipeline should run:

```bash
npm ci
npm run lint
npm run build
npm test
```

Add a browser test command when Playwright or another end-to-end framework is configured.

## 13. Configure Vercel for Production

In Vercel project settings:

1. Connect the production Git branch.
2. Add the database URL and authentication secrets to **Production**, **Preview**, and **Development** as appropriate.
3. Add AI provider keys only to the environments that need them.
4. Add storage credentials and webhook secrets.
5. Configure the production domain.
6. Enable deployment protection for preview environments containing sensitive data.
7. Confirm the build command and Node.js version.
8. Redeploy after changing environment variables.

Suggested environment variable names are:

```text
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
AI_PROVIDER_API_KEY=
STORAGE_ENDPOINT=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
STORAGE_BUCKET=
```

Use the exact names required by the libraries selected during implementation. Add `.env.local` to `.gitignore` and provide a sanitized `.env.example` containing names only.

## 14. Production Security Checklist

- Enforce HTTPS and secure cookies.
- Validate and authorize every server request.
- Encrypt sensitive data at rest and in transit.
- Keep uploaded documents private.
- Add rate limiting and request size limits.
- Sanitize document-derived text before rendering it.
- Protect against prompt injection in document and AI workflows.
- Add audit logs for access, edits, exports, approvals, and deletions.
- Back up the database and test restoration.
- Monitor errors, latency, failed jobs, and unauthorized access attempts.
- Remove sample personal data before production launch.

## 15. Definition of Done

The project is ready for a controlled production launch when:

- `npm ci`, `npm run lint`, and `npm run build` pass in a clean checkout.
- Users must authenticate before accessing operational data.
- All data comes from the backend rather than JSON demo fixtures.
- Case requests, documents, entities, and relationships persist after refresh.
- Upload processing and AI responses have visible failure states.
- Every role has tested permissions and audit coverage.
- Automated tests cover the critical workflows.
- Vercel production and preview environments use separate credentials.
- No secrets or real sensitive data are committed to Git.
- Backups, monitoring, and an incident response process are documented.