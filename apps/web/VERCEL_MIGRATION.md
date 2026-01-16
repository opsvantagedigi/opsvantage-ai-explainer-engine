# Vercel project recreation checklist

All commands must be run from the repository folder: `C:\Users\AjaySidal\AI-YouTube-Studio\apps\web`

1. Project metadata (new project)
   - Team: `opsvantagedigi-6056`
   - GitHub repo: `opsvantagedigi/AI-YouTube-Studio`
   - Vercel Root Directory: `apps/web`
   - Framework: Next.js (should be auto-detected)
   - Build command: `next build`
   - Output directory: `.next`

2. Files added
   - `vercel.json` sets `buildCommand` and `outputDirectory` for the project root.
   - `scripts/export_vercel_env.sh` - uses `vercel env pull` to export Production/Preview/Development envs and writes `vercel-env-export.json`.
   - `scripts/import_vercel_env.js` - Node script that imports `vercel-env-export.json` into a Vercel project via the Vercel API.

3. Exporting envs (run from `apps/web`)

```bash
# set these first (example)
export VERCEL_TOKEN="<your-token>"
export VERCEL_TEAM="opsvantagedigi-6056"          # optional
export VERCEL_PROJECT="<old-vercel-project-name-or-id>"
./scripts/export_vercel_env.sh
```

This produces `vercel-env-export.json` in `apps/web`.

4. Creating new project on Vercel

- Create the project in the `opsvantagedigi-6056` team and set the Root Directory to `apps/web`.
- When Vercel asks for Build & Output settings, use:
  - Build command: `next build`
  - Output directory: `.next`

Optionally you can create the project via API/CLI, then run the import script below.

5. Importing envs into the new project (run from `apps/web`)

```bash
export VERCEL_TOKEN="<your-token>"
export VERCEL_TEAM="opsvantagedigi-6056"        # optional
export NEW_VERCEL_PROJECT_ID="<new-vercel-project-id>"
node ./scripts/import_vercel_env.js
```

Notes:

- You must provide `VERCEL_TOKEN`. Use a token created in Vercel with scope to read/write envs for the team.
- The import script uses the Vercel API and will create encrypted env variables targeting Production/Preview/Development.
- The CLI-based export requires the `vercel` CLI to be installed and authenticated with the token.

6. Post-create verification

- Confirm Vercel detected Next.js in the build logs (should print "Detected Next.js version...").
- Confirm build logs show "Compiling..." and "Creating server functions...".
- After deployment, test routes `/studio` and `/auth/signin` — they should return 200 or 302 (not 404).
