$m = Select-String -Path '.env.local' -Pattern '^TEST_SERVICE_TOKEN=' -ErrorAction SilentlyContinue
if ($m -eq $null) { Write-Host 'ERROR: TEST_SERVICE_TOKEN not found' ; exit 2 }
$token = $m.ToString().Split('=')[1].Trim()

Write-Host 'Adding TEST_SERVICE_TOKEN to Vercel production (safe pipe)...'
[System.Text.Encoding]::UTF8.GetBytes($token) | vercel env add TEST_SERVICE_TOKEN production --stdin

Write-Host 'Adding ALLOW_DEV_SESSION=true to Vercel production...'
[System.Text.Encoding]::UTF8.GetBytes('true') | vercel env add ALLOW_DEV_SESSION production --stdin

Write-Host 'Pulling production envs to verify...'
vercel env pull .vercel/.env.production.temp --environment production

Write-Host 'Preview: TEST_SERVICE_TOKEN line:'
Get-Content .vercel/.env.production.temp | Select-String 'TEST_SERVICE_TOKEN' -Context 0,0

Write-Host 'Preview: ALLOW_DEV_SESSION line:'
Get-Content .vercel/.env.production.temp | Select-String 'ALLOW_DEV_SESSION' -Context 0,0
