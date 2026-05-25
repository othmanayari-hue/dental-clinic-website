# Configuration initiale — à lancer une fois depuis la racine web
$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot
$App = Join-Path $Root "mohamed-ayari-dentist-web-\dental-clinic"
$EnvExample = Join-Path $Root "mohamed-ayari-dentist-web-\.env.example"
$EnvLocal = Join-Path $App ".env"

Write-Host "=== Cabinet Dentaire Ayari — setup ===" -ForegroundColor Cyan

if (-not (Test-Path $EnvLocal)) {
    Copy-Item $EnvExample $EnvLocal
    Write-Host "Fichier .env cree. Modifiez DATABASE_URL (mot de passe MySQL)." -ForegroundColor Yellow
} else {
    Write-Host ".env existe deja." -ForegroundColor Gray
}

Set-Location $Root
npm install

Set-Location $App
npm run db:generate
npm run db:push
npm run db:seed

Write-Host ""
Write-Host "Pret ! Lancez: npm run dev" -ForegroundColor Green
Write-Host "Site: http://localhost:3000" -ForegroundColor Green
