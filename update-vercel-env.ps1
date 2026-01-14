$m = Select-String -Path '.env.local' -Pattern '^TEST_SERVICE_TOKEN=' -ErrorAction SilentlyContinue
if ($m -eq $null) { Write-Host 'ERROR: TEST_SERVICE_TOKEN not found' ; exit 2 }
$tokenLine = $m.ToString()
$token = $tokenLine.Split('=')[1].Trim()
Write-Host "LOCAL_TOKEN_PREFIX=$($token.Substring(0,8))"

Write-Host 'Removing existing Vercel production env var...'
vercel env rm TEST_SERVICE_TOKEN production --yes

Write-Host 'Adding Vercel production env var...'
$token | vercel env add TEST_SERVICE_TOKEN production --yes

Write-Host 'Triggering production deploy...'
vercel --prod --yes
