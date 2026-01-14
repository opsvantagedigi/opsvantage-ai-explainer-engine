$m = Select-String -Path '.env.local' -Pattern '^TEST_SERVICE_TOKEN=' -ErrorAction SilentlyContinue
if ($m -eq $null) { Write-Host 'ERROR: TEST_SERVICE_TOKEN not found' ; exit 2 }
$token = $m.ToString().Split('=')[1].Trim()
Write-Host 'Adding TEST_SERVICE_TOKEN to Vercel production (piping value)...'
$token | vercel env add TEST_SERVICE_TOKEN production

Write-Host 'Pulling production envs to verify...'
vercel env pull .vercel/.env.production.temp --environment production
Write-Host 'Preview: searching for TEST_SERVICE_TOKEN in pulled file...'
Get-Content .vercel/.env.production.temp | Select-String 'TEST_SERVICE_TOKEN' -Context 0,0
