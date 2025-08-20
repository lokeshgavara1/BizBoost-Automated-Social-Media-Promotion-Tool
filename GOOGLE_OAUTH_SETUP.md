# Google OAuth 2.0 Setup Guide

This guide will help you set up Google OAuth 2.0 authentication in your BizBoost project.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (if using database)
- Google Cloud Console account

## Backend Setup

### 1. Install Dependencies

Navigate to the backend directory and install the required packages:

```bash
cd backend
npm install google-auth-library
```

### 2. Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=456969076971-muo6t0bv9smg0m27b46urtrb7agd4m4f.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL
FRONTEND_URL=http://localhost:3000

# MongoDB Connection (if using database)
MONGODB_URI=mongodb://localhost:27017/bizboost

# Port
PORT=5000
```

**Important**: For local development, use `http://localhost:5000/api/auth/google/callback` as the redirect URI.

### 3. Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" → "OAuth 2.0 Client IDs"
5. Add the following authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (for local development)
   - `https://www.example.com` (for production)

### 4. Start the Backend Server

```bash
cd backend
npm run dev
```

The server will start on port 5000.

## Frontend Setup

### 1. Install Dependencies

The frontend already has the necessary dependencies installed.

### 2. Start the Frontend

```bash
cd frontend
npm start
```

The frontend will start on port 3000.

## How It Works

### 1. User clicks "Sign in with Google"
- Frontend calls `/api/auth/google`
- Backend generates Google OAuth URL
- User is redirected to Google's consent screen

### 2. User authorizes the application
- Google redirects back to `/api/auth/google/callback`
- Backend exchanges authorization code for tokens
- User profile is retrieved from Google
- JWT token is generated and user is redirected to frontend

### 3. Frontend receives the callback
- Token and user data are extracted from URL parameters
- User is logged in and redirected to dashboard

## API Endpoints

- `GET /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/google/callback` - Handle OAuth callback
- `GET /api/auth/profile` - Get user profile (protected)

## Security Considerations

1. **Environment Variables**: Never commit sensitive credentials to version control
2. **HTTPS**: Use HTTPS in production
3. **Token Storage**: In production, store tokens securely in a database with encryption
4. **JWT Secret**: Use a strong, unique JWT secret
5. **Redirect URIs**: Only allow authorized redirect URIs

## Troubleshooting

### Common Issues

1. **"Invalid redirect_uri" error**
   - Ensure the redirect URI in Google Cloud Console matches exactly
   - Check for trailing slashes or protocol mismatches

2. **"Authorization code is required" error**
   - The callback URL should include the `code` parameter from Google

3. **CORS errors**
   - Ensure the backend CORS configuration allows your frontend domain

4. **Database connection errors**
   - Check MongoDB connection string
   - Ensure MongoDB is running

### Testing

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000/login`
3. Click "Sign in with Google"
4. Complete the Google OAuth flow
5. Verify you're redirected to the dashboard

## Production Deployment

1. Update `GOOGLE_REDIRECT_URI` to your production domain
2. Use environment variables for all sensitive data
3. Enable HTTPS
4. Use a production database for token storage
5. Implement proper error logging and monitoring

## File Structure

```
backend/
├── controllers/
│   └── googleAuthController.js    # Google OAuth logic
├── routes/
│   └── googleAuth.js             # OAuth routes
├── models/
│   └── User.js                   # Updated user model
├── config.env                    # Environment variables
└── index.js                     # Main server file

frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx            # Updated with Google button
│   │   └── GoogleAuthCallback.jsx # OAuth callback handler
│   ├── context/
│   │   └── AuthContext.jsx      # Updated for Google OAuth
│   └── styles/
│       └── Auth.css             # Google button styles
└── App.js                       # Updated routing
```

## Support

If you encounter any issues:

1. Check the browser console for frontend errors
2. Check the backend console for server errors
3. Verify all environment variables are set correctly
4. Ensure Google Cloud Console configuration matches your setup
5. Check that all required dependencies are installed

The implementation is now complete and ready for testing!
