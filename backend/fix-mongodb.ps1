# MongoDB Connection Test Script for BizBoost
# This script helps you test different MongoDB connection options

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   MongoDB Connection Helper for BizBoost" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$configPath = ".\config.env"

if (-not (Test-Path $configPath)) {
    Write-Host "❌ Error: config.env file not found!" -ForegroundColor Red
    Write-Host "Please make sure you're running this from the backend directory." -ForegroundColor Yellow
    exit
}

Write-Host "Current MongoDB Configuration:" -ForegroundColor Green
Write-Host ""

# Read current MONGO_URI
$mongoUri = (Get-Content $configPath | Select-String "^MONGO_URI=").ToString().Replace("MONGO_URI=", "")

if ($mongoUri -like "*localhost*") {
    Write-Host "📍 Currently using: LOCAL MongoDB" -ForegroundColor Yellow
    Write-Host "   Connection: $mongoUri" -ForegroundColor Gray
} elseif ($mongoUri -like "*mongodb+srv*") {
    Write-Host "☁️  Currently using: MongoDB Atlas (Cloud)" -ForegroundColor Yellow
    # Hide password in output
    $safeUri = $mongoUri -replace "://([^:]+):([^@]+)@", "://$1:****@"
    Write-Host "   Connection: $safeUri" -ForegroundColor Gray
} else {
    Write-Host "❓ Unknown MongoDB configuration" -ForegroundColor Red
    Write-Host "   Connection: $mongoUri" -ForegroundColor Gray
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   Choose an option:" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Update MongoDB Atlas Password" -ForegroundColor White
Write-Host "2. Switch to Local MongoDB" -ForegroundColor White
Write-Host "3. Test Current Connection" -ForegroundColor White
Write-Host "4. View Full Setup Guide" -ForegroundColor White
Write-Host "5. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "📝 Updating MongoDB Atlas Connection..." -ForegroundColor Cyan
        Write-Host ""
        
        $username = Read-Host "Enter MongoDB Atlas username (default: lokesh)"
        if ([string]::IsNullOrWhiteSpace($username)) {
            $username = "lokesh"
        }
        
        $password = Read-Host "Enter your MongoDB Atlas password" -AsSecureString
        $passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))
        
        $cluster = Read-Host "Enter cluster URL (default: cluster1.oi3q2np.mongodb.net)"
        if ([string]::IsNullOrWhiteSpace($cluster)) {
            $cluster = "cluster1.oi3q2np.mongodb.net"
        }
        
        $newUri = "mongodb+srv://$username`:$passwordPlain@$cluster/bizboost?retryWrites=true&w=majority&appName=Cluster1"
        
        # Update config.env
        $content = Get-Content $configPath
        $content = $content -replace "^MONGO_URI=.*", "MONGO_URI=$newUri"
        Set-Content -Path $configPath -Value $content
        
        Write-Host ""
        Write-Host "✅ Updated! Connection string saved to config.env" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠️  IMPORTANT STEPS:" -ForegroundColor Yellow
        Write-Host "1. Make sure your IP is whitelisted in MongoDB Atlas Network Access" -ForegroundColor White
        Write-Host "2. Verify the password is correct" -ForegroundColor White
        Write-Host "3. Restart your backend server" -ForegroundColor White
        Write-Host ""
        Write-Host "Run the server with: npm start" -ForegroundColor Cyan
    }
    
    "2" {
        Write-Host ""
        Write-Host "💻 Switching to Local MongoDB..." -ForegroundColor Cyan
        Write-Host ""
        
        # Update config.env
        $content = Get-Content $configPath
        $content = $content -replace "^MONGO_URI=.*", "MONGO_URI=mongodb://localhost:27017/bizboost"
        Set-Content -Path $configPath -Value $content
        
        Write-Host "✅ Updated! Now using local MongoDB" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠️  Make sure MongoDB is installed and running:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "To start MongoDB service:" -ForegroundColor White
        Write-Host "  net start MongoDB" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Or download MongoDB Community Edition:" -ForegroundColor White
        Write-Host "  https://www.mongodb.com/try/download/community" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Restart your backend server: npm start" -ForegroundColor Cyan
    }
    
    "3" {
        Write-Host ""
        Write-Host "🧪 Testing MongoDB Connection..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Starting backend server..." -ForegroundColor Yellow
        Write-Host ""
        
        npm start
    }
    
    "4" {
        Write-Host ""
        Write-Host "📖 Opening MongoDB Fix Guide..." -ForegroundColor Cyan
        
        if (Test-Path "MONGODB_FIX_GUIDE.md") {
            notepad "MONGODB_FIX_GUIDE.md"
        } else {
            Write-Host ""
            Write-Host "Guide file not found. Here are the key steps:" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "For MongoDB Atlas:" -ForegroundColor White
            Write-Host "1. Go to https://cloud.mongodb.com" -ForegroundColor Cyan
            Write-Host "2. Database Access → Edit User → Reset Password" -ForegroundColor Cyan
            Write-Host "3. Network Access → Add IP → Allow Access from Anywhere" -ForegroundColor Cyan
            Write-Host "4. Get connection string and update config.env" -ForegroundColor Cyan
            Write-Host ""
        }
    }
    
    "5" {
        Write-Host ""
        Write-Host "👋 Goodbye!" -ForegroundColor Green
        exit
    }
    
    default {
        Write-Host ""
        Write-Host "❌ Invalid choice. Please run the script again." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
