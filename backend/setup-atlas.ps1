# MongoDB Atlas Setup Script for BizBoost
# This script helps you configure MongoDB Atlas connection

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   🌐 MongoDB Atlas Configuration Wizard" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if config.env exists
$configPath = ".\config.env"
if (-not (Test-Path $configPath)) {
    Write-Host "❌ Error: config.env file not found!" -ForegroundColor Red
    Write-Host "Please make sure you're running this from the backend directory." -ForegroundColor Yellow
    exit
}

Write-Host "📋 MongoDB Atlas Connection Setup" -ForegroundColor Green
Write-Host ""
Write-Host "You need the following information from MongoDB Atlas:" -ForegroundColor Yellow
Write-Host "  1. Database username (default: lokesh)" -ForegroundColor White
Write-Host "  2. Database password" -ForegroundColor White
Write-Host "  3. Cluster URL (default: cluster1.oi3q2np.mongodb.net)" -ForegroundColor White
Write-Host ""

# Get username
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
$username = Read-Host "Enter MongoDB Atlas username [default: lokesh]"
if ([string]::IsNullOrWhiteSpace($username)) {
    $username = "lokesh"
    Write-Host "✓ Using default username: lokesh" -ForegroundColor Green
}

Write-Host ""

# Get password
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "⚠️  Get your password from MongoDB Atlas:" -ForegroundColor Yellow
Write-Host "   https://cloud.mongodb.com → Database Access → Edit User" -ForegroundColor Cyan
Write-Host ""

$password = Read-Host "Enter your MongoDB Atlas password"

if ([string]::IsNullOrWhiteSpace($password)) {
    Write-Host ""
    Write-Host "❌ Password cannot be empty!" -ForegroundColor Red
    Write-Host ""
    Write-Host "To get your password:" -ForegroundColor Yellow
    Write-Host "1. Go to https://cloud.mongodb.com" -ForegroundColor White
    Write-Host "2. Click 'Database Access' in the sidebar" -ForegroundColor White
    Write-Host "3. Click 'Edit' next to user 'lokesh'" -ForegroundColor White
    Write-Host "4. Click 'Edit Password' and generate/set a new password" -ForegroundColor White
    Write-Host "5. Copy the password and run this script again" -ForegroundColor White
    Write-Host ""
    exit
}

Write-Host ""

# Get cluster URL
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
$cluster = Read-Host "Enter cluster URL [default: cluster1.oi3q2np.mongodb.net]"
if ([string]::IsNullOrWhiteSpace($cluster)) {
    $cluster = "cluster1.oi3q2np.mongodb.net"
    Write-Host "✓ Using default cluster: cluster1.oi3q2np.mongodb.net" -ForegroundColor Green
}

Write-Host ""

# Check for special characters in password
$specialChars = @('@', '#', '%', '/', ':', '?', '&', '=', '+', '$', ',', '<', '>', ';', ' ')
$hasSpecialChars = $false
foreach ($char in $specialChars) {
    if ($password.Contains($char)) {
        $hasSpecialChars = $true
        break
    }
}

if ($hasSpecialChars) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "⚠️  Your password contains special characters!" -ForegroundColor Yellow
    Write-Host "   Encoding them for the connection string..." -ForegroundColor White
    
    # URL encode the password
    Add-Type -AssemblyName System.Web
    $password = [System.Web.HttpUtility]::UrlEncode($password)
    
    Write-Host "✓ Password encoded successfully" -ForegroundColor Green
    Write-Host ""
}

# Build connection string
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
$connectionString = "mongodb+srv://$username`:$password@$cluster/?appName=Cluster1"

Write-Host "📝 Connection String Generated:" -ForegroundColor Green
Write-Host ""
# Hide password in display
$safeDisplay = $connectionString -replace "://([^:]+):([^@]+)@", "://$username`:****@"
Write-Host "   $safeDisplay" -ForegroundColor Cyan
Write-Host ""

# Update config.env
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "💾 Updating config.env..." -ForegroundColor Yellow

try {
    $content = Get-Content $configPath
    $updated = $false
    
    for ($i = 0; $i -lt $content.Length; $i++) {
        if ($content[$i] -match "^(#.*)?MONGO_URI=") {
            $content[$i] = "MONGO_URI=$connectionString"
            $updated = $true
            break
        }
    }
    
    if (-not $updated) {
        # If MONGO_URI not found, add it
        $content += "MONGO_URI=$connectionString"
    }
    
    Set-Content -Path $configPath -Value $content
    
    Write-Host "✅ Configuration saved successfully!" -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "❌ Error updating config.env: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please manually update config.env with:" -ForegroundColor Yellow
    Write-Host "MONGO_URI=$connectionString" -ForegroundColor White
    Write-Host ""
    exit
}

# Remind about IP whitelisting
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "⚠️  IMPORTANT: Whitelist Your IP Address" -ForegroundColor Yellow
Write-Host ""
Write-Host "To connect successfully, you must whitelist your IP in MongoDB Atlas:" -ForegroundColor White
Write-Host ""
Write-Host "1. Go to https://cloud.mongodb.com" -ForegroundColor Cyan
Write-Host "2. Click 'Network Access' in the left sidebar" -ForegroundColor Cyan
Write-Host "3. Click 'Add IP Address'" -ForegroundColor Cyan
Write-Host "4. Click 'Allow Access from Anywhere' (for development)" -ForegroundColor Cyan
Write-Host "5. Click 'Confirm'" -ForegroundColor Cyan
Write-Host ""

# Test connection
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "🧪 Test Connection?" -ForegroundColor Cyan
Write-Host ""
$testNow = Read-Host "Would you like to test the connection now? (y/n) [default: y]"

if ([string]::IsNullOrWhiteSpace($testNow) -or $testNow -eq "y" -or $testNow -eq "Y") {
    Write-Host ""
    Write-Host "Testing MongoDB connection..." -ForegroundColor Yellow
    Write-Host ""
    
    # Run the test script
    node test-mongodb.js
    
    Write-Host ""
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
        Write-Host "✅ SUCCESS! Your MongoDB Atlas is configured!" -ForegroundColor Green
        Write-Host ""
        Write-Host "You can now start your backend server:" -ForegroundColor White
        Write-Host "   npm start" -ForegroundColor Cyan
        Write-Host ""
    } else {
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
        Write-Host "❌ Connection test failed" -ForegroundColor Red
        Write-Host ""
        Write-Host "Common issues:" -ForegroundColor Yellow
        Write-Host "  • Wrong password → Reset it in Database Access" -ForegroundColor White
        Write-Host "  • IP not whitelisted → Add 0.0.0.0/0 in Network Access" -ForegroundColor White
        Write-Host "  • Special characters → Already URL-encoded by this script" -ForegroundColor White
        Write-Host ""
        Write-Host "📖 See MONGODB_ATLAS_SETUP.md for detailed troubleshooting" -ForegroundColor Cyan
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "✅ Configuration Complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor White
    Write-Host "  1. Whitelist your IP in MongoDB Atlas Network Access" -ForegroundColor Cyan
    Write-Host "  2. Test connection: node test-mongodb.js" -ForegroundColor Cyan
    Write-Host "  3. Start backend: npm start" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
