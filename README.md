# AI-YouTube-Studio

Production-grade Prompt-to-Video platform: convert user prompts into fully rendered YouTube explainer videos (MVP + roadmap).

Quick links

- **Code:** repo root
- **Frontend:** [apps/web](apps/web)
- **Backend:** [apps/api](apps/api)
- **Docs:** [docs](docs)

Getting started (developer)

1. Clone the repo and cd to the project root.
2. Install root dev dependencies:

```powershell
npm install
```

3. Start the API (development):

```powershell
cd apps\api
npm run dev
```

4. Use the API to create a prompt-to-video job (see API spec in `docs/api/openapi.yaml`).

Project structure

- apps/web - Next.js frontend (MVP)
- apps/api - Node TypeScript backend (Fastify) with the first mock pipeline
- packages/common - shared types and utilities
- packages/ai - AI integration wrappers (stubs)
- docs - developer docs, API specs, diagrams
- infra - Dockerfiles, CI templates

Philosophy

- Deterministic workflows, strict secrets handling, observability, and idempotence.

Next steps

- Run the backend and POST a job to `/api/v1/video-jobs` to exercise the first mocked pipeline.

# AI-YouTube-Studio

Monorepo for Prompt-to-Video web app.
