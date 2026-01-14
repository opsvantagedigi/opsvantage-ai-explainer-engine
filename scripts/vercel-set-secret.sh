#!/usr/bin/env bash
set -euo pipefail

# Extract token from .env.local (strip quotes and CR)
if [ ! -f .env.local ]; then
  echo "ERROR: .env.local not found" >&2
  exit 2
fi

token=$(grep '^TEST_SERVICE_TOKEN=' .env.local || true)
if [ -z "$token" ]; then
  echo "ERROR: TEST_SERVICE_TOKEN not found in .env.local" >&2
  exit 2
fi

token=$(echo "$token" | sed 's/^TEST_SERVICE_TOKEN=//; s/^"//; s/"$//; s/\r//g' | tr -d '\n')
if [ -z "$token" ]; then
  echo "ERROR: extracted token is empty" >&2
  exit 2
fi

echo "TOKEN_PREFIX=${token:0:8}"

# Remove old secret and env var
vercel secrets rm TEST_SERVICE_TOKEN_SECRET --yes || true
vercel env rm TEST_SERVICE_TOKEN production --yes || true
vercel env rm ALLOW_DEV_SESSION production --yes || true

# Add secret from stdin safely (printf avoids extra newline)
printf '%s' "$token" | vercel secrets add TEST_SERVICE_TOKEN_SECRET -

# Add env var from secret
vercel env add TEST_SERVICE_TOKEN production --from-secret TEST_SERVICE_TOKEN_SECRET

# Add ALLOW_DEV_SESSION=true
printf '%s' 'true' | vercel env add ALLOW_DEV_SESSION production

# Pull production envs to verify
vercel env pull .vercel/.env.production.temp --environment production

echo '--- TEST_SERVICE_TOKEN line ---'
grep '^TEST_SERVICE_TOKEN=' .vercel/.env.production.temp || true

echo '--- ALLOW_DEV_SESSION line ---'
grep '^ALLOW_DEV_SESSION=' .vercel/.env.production.temp || true

echo '--- byte-level TEST_SERVICE_TOKEN (hex) ---'
grep '^TEST_SERVICE_TOKEN=' .vercel/.env.production.temp | sed -n '1p' | od -An -t x1 || true
