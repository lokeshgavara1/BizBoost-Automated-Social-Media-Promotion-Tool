# PowerShell script to clean Git history of sensitive files
# This script will remove config.env and other sensitive files from the entire Git history

Write-Host "🔒 Cleaning Git History of Sensitive Files" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Yellow
Write-Host ""

# Check if git-filter-repo is installed
try {
    git filter-repo --version | Out-Null
    Write-Host "✅ git-filter-repo is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ git-filter-repo is not installed" -ForegroundColor Red
    Write-Host "Please install git-filter-repo first:" -ForegroundColor Yellow
    Write-Host "pip install git-filter-repo" -ForegroundColor Cyan
    Write-Host "Or download from: https://github.com/newren/git-filter-repo" -ForegroundColor Cyan
    exit 1
}

Write-Host ""
Write-Host "⚠️  WARNING: This will rewrite Git history!" -ForegroundColor Red
Write-Host "This operation cannot be undone." -ForegroundColor Red
Write-Host ""

$confirmation = Read-Host "Do you want to continue? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "Operation cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🧹 Cleaning Git history..." -ForegroundColor Yellow

# Remove sensitive files from entire Git history
git filter-repo --path backend/config.env --invert-paths --force
git filter-repo --path "*.env" --invert-paths --force
git filter-repo --path "config.env" --invert-paths --force

Write-Host ""
Write-Host "✅ Git history cleaned successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Force push to remote: git push origin main --force" -ForegroundColor Cyan
Write-Host "2. Create your .env file locally: npm run setup (in backend directory)" -ForegroundColor Cyan
Write-Host "3. Add your actual credentials to the .env file" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔒 Your sensitive data is now safe!" -ForegroundColor Green
