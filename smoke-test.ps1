# ================================
# AI‑Shorts Studio Smoke Test
# OpsVantage Digital
# ================================

$domain = "https://explainer.opsvantagedigital.online"
$deployCheckUrl = "$domain/api/health"
$sessionUrl = "$domain/api/dev-session"
$workspaceUrl = "$domain/api/workspace/create"
$cookieFile = "cookies.txt"

# Load token from .env.local
$localLine = (Select-String -Path ".env.local" -Pattern '^TEST_SERVICE_TOKEN=').ToString()
if (-not $localLine) {
    Write-Host "❌ TEST_SERVICE_TOKEN not found in .env.local" -ForegroundColor Red
    exit 1
}
$token = $localLine.Split("=")[1].Trim()
Write-Host "Using TEST_SERVICE_TOKEN (length): $($token.Length)"

Write-Host "`n========================================"
Write-Host " AI‑Shorts Studio Smoke Test"
Write-Host "========================================`n"

# ----------------------------------------
# 1. Wait for deployment activation
# ----------------------------------------
Write-Host "⏳ Waiting for deployment to activate..."

$maxAttempts = 20
$attempt = 0
$activated = $false

while ($attempt -lt $maxAttempts) {
    try {
        $resp = Invoke-WebRequest -Uri $deployCheckUrl -Method GET -TimeoutSec 5 -ErrorAction Stop
        if ($resp.StatusCode -eq 200) {
            Write-Host "✅ Deployment active" -ForegroundColor Green
            $activated = $true
            break
        }
    } catch {
        # ignore errors during warmup
    }

    $attempt++
    Start-Sleep -Seconds 3
}

if (-not $activated) {
    Write-Host "❌ Deployment did not activate in time" -ForegroundColor Red
    exit 1
}

# ----------------------------------------
# 2. Warm the functions
# ----------------------------------------
Write-Host "`n🔥 Warming serverless functions..."
Invoke-WebRequest -Uri $deployCheckUrl -Method GET | Out-Null
Start-Sleep -Seconds 2

# ----------------------------------------
# 3. Mint session
# ----------------------------------------
Write-Host "`n🔐 Minting dev session..."

$sessionBody = @{
    serviceToken = $token
    userId = "smoke-user-1"
    email = "smoke+test@opsvantage.io"
    name = "Smoke Tester"
    globalRole = "ADMIN"
} | ConvertTo-Json

$sessionResp = curl.exe -i -s -c $cookieFile -X POST $sessionUrl `
    -H "Content-Type: application/json" `
    --data-raw $sessionBody

Write-Host $sessionResp

if ($sessionResp -notmatch "200 OK") {
    Write-Host "❌ Session mint failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Session minted successfully" -ForegroundColor Green

# ----------------------------------------
# 4. Validate cookie
# ----------------------------------------
Write-Host "`n🍪 Validating cookie..."

$cookieContent = Get-Content $cookieFile -Raw
if ($cookieContent -notmatch "next-auth.session-token") {
    Write-Host "❌ Session cookie missing" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Session cookie present" -ForegroundColor Green

# ----------------------------------------
# 5. Create workspace
# ----------------------------------------
Write-Host "`n🏗️ Creating workspace..."

$workspaceBody = @{
    name = "Smoke Test Workspace"
    organizationId = "org-smoke"
} | ConvertTo-Json

$workspaceResp = curl.exe -i -s -b $cookieFile -X POST $workspaceUrl `
    -H "Content-Type: application/json" `
    --data-raw $workspaceBody

Write-Host $workspaceResp

if ($workspaceResp -notmatch "200 OK") {
    Write-Host "❌ Workspace creation failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Workspace created successfully" -ForegroundColor Green

# ----------------------------------------
# 6. Final PASS/FAIL summary
# ----------------------------------------
Write-Host "`n========================================"
Write-Host "        SMOKE TEST RESULT"
Write-Host "========================================"

Write-Host "🔥 Deployment active"
Write-Host "🔥 Functions warmed"
Write-Host "🔥 Session minted"
Write-Host "🔥 Cookie validated"
Write-Host "🔥 Workspace created"

Write-Host "`n🎉 ALL CHECKS PASSED — AI‑Shorts Studio is LIVE" -ForegroundColor Green
Write-Host "========================================`n"
