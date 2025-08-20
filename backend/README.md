# BizBoost Backend

## Environment Setup

### 1. Create Environment File

Copy the example environment file and configure it with your actual credentials:

```bash
cp env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file and replace the placeholder values with your actual credentials:

#### Google OAuth 2.0
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `GOOGLE_REDIRECT_URI`: OAuth callback URL (usually http://localhost:5000/api/auth/google/callback for development)

#### Instagram OAuth 2.0
- `INSTAGRAM_APP_ID`: Your Instagram/Facebook app ID
- `INSTAGRAM_APP_SECRET`: Your Instagram/Facebook app secret
- `INSTAGRAM_REDIRECT_URI`: OAuth callback URL
- `INSTAGRAM_PRIVACY_POLICY_URL`: Your privacy policy URL

#### Facebook OAuth 2.0
- `FACEBOOK_APP_ID`: Your Facebook app ID
- `FACEBOOK_APP_SECRET`: Your Facebook app secret
- `FACEBOOK_REDIRECT_URI`: OAuth callback URL

#### LinkedIn OAuth 2.0
- `LINKEDIN_CLIENT_ID`: Your LinkedIn client ID
- `LINKEDIN_CLIENT_SECRET`: Your LinkedIn client secret
- `LINKEDIN_REDIRECT_URI`: OAuth callback URL

#### OpenAI API
- `OPENAI_API_KEY`: Your OpenAI API key

#### Security
- `JWT_SECRET`: A strong secret key for JWT token signing (change in production!)

#### Database
- `MONGODB_URI`: MongoDB connection string

#### Application
- `FRONTEND_URL`: Frontend application URL
- `PORT`: Backend server port (default: 5000)

### 3. Security Notes

⚠️ **IMPORTANT**: Never commit the `.env` file to version control. It contains sensitive information like API keys and secrets.

The following files are automatically ignored by Git:
- `.env`
- `config.env`
- Any file ending with `.env`

### 4. Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

### 5. OAuth Setup Instructions

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and Google OAuth2 API
4. Go to "Credentials" → "OAuth 2.0 Client IDs"
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)

#### Facebook/Instagram OAuth Setup
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URIs
5. Get App ID and App Secret

#### LinkedIn OAuth Setup
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Configure OAuth 2.0 settings
4. Add redirect URIs
5. Get Client ID and Client Secret

### 6. Production Deployment

For production deployment:

1. Use environment variables instead of `.env` file
2. Change all URLs to your production domain
3. Use a strong, unique JWT secret
4. Enable HTTPS
5. Use a production MongoDB instance
6. Set up proper CORS configuration

### 7. Troubleshooting

- **"Module not found" errors**: Run `npm install`
- **OAuth errors**: Check your redirect URIs and app credentials
- **Database connection errors**: Verify MongoDB is running and connection string is correct
- **Port already in use**: Change the PORT in your `.env` file
