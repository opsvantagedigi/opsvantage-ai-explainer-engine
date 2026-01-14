#!/usr/bin/env bash
set -euo pipefail

token=$(grep '^TEST_SERVICE_TOKEN=' .env.local | sed 's/^TEST_SERVICE_TOKEN=//; s/^"//; s/"$//; s/\r//g' | tr -d '\n')
if [ -z "$token" ]; then echo "ERROR: token not found" >&2; exit 2; fi

echo "Removing TEST_SERVICE_TOKEN..."
vercel env rm TEST_SERVICE_TOKEN production --yes || true

echo "Re-adding TEST_SERVICE_TOKEN..."
printf '%s' "$token" | vercel env add TEST_SERVICE_TOKEN production

echo "Adding ALLOW_DEV_SESSION=true..."
printf '%s' "true" | vercel env add ALLOW_DEV_SESSION production

echo "Pulling production envs..."
vercel env pull .vercel/.env.production.temp --environment production

echo "Preview lines:"
grep -E '^TEST_SERVICE_TOKEN=|^ALLOW_DEV_SESSION=' .vercel/.env.production.temp || true
