# BizBoost - Automated Social Media Promotion Tool

A comprehensive full-stack web application that enables businesses to automate and manage their social media presence across multiple platforms including Facebook, Instagram, LinkedIn, and Google.

## 🚀 Features

### Core Functionality
- **Multi-Platform OAuth Integration**: Seamlessly connect with Facebook, Instagram, LinkedIn, and Google
- **Business Profile Management**: Create and manage detailed business profiles
- **AI-Powered Content Generation**: Generate engaging social media content using AI
- **Campaign Management**: Schedule, track, and manage social media campaigns
- **Post Scheduling & Publishing**: Plan and automate your social media posts
- **Analytics Dashboard**: Track performance metrics and insights
- **Email Notifications**: Automated welcome emails and campaign alerts
- **User Authentication**: Secure JWT-based authentication system

### User Interface
- **Responsive Design**: Mobile-friendly interface with bottom navigation
- **Dark Mode Support**: Toggle between light and dark themes
- **Interactive Dashboard**: Real-time analytics and insights
- **Content Calendar**: Visual calendar for managing scheduled posts
- **Content Library**: Organize and reuse your best content
- **Smart Recommendations**: AI-driven content suggestions

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, OAuth 2.0 (Google, Facebook, LinkedIn, Instagram)
- **AI Integration**: OpenAI API
- **Email Service**: Nodemailer
- **File Upload**: Multer
- **Validation**: Express Validator

### Frontend
- **Framework**: React 19.1.1
- **Routing**: React Router DOM 7.7.1
- **State Management**: Context API
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: React Icons
- **Testing**: Jest, React Testing Library

## 📁 Project Structure

```
BizBoost/
├── backend/
│   ├── config/           # Database and configuration files
│   ├── controllers/      # Request handlers and business logic
│   ├── middleware/       # Authentication, validation, file upload
│   ├── models/           # MongoDB schemas (User, Post, Campaign, etc.)
│   ├── routes/           # API endpoint definitions
│   ├── utils/            # Helper utilities (email service)
│   ├── index.js          # Server entry point
│   └── package.json      # Backend dependencies
│
└── frontend/
    ├── public/           # Static assets
    ├── src/
    │   ├── api/          # Axios configuration
    │   ├── components/   # Reusable React components
    │   ├── context/      # Global state management
    │   ├── hooks/        # Custom React hooks
    │   ├── pages/        # Page components
    │   ├── styles/       # CSS stylesheets
    │   └── App.js        # Main application component
    └── package.json      # Frontend dependencies
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- API keys for social media platforms (Facebook, Instagram, LinkedIn, Google)
- OpenAI API key (for AI content generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BizBoost-Automated-Social-Media-Promotion-Tool-main
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `config.env` file in the `backend` directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # JWT
   JWT_SECRET=your_jwt_secret_key

   # OAuth Credentials
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   LINKEDIN_CLIENT_ID=your_linkedin_client_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
   INSTAGRAM_APP_ID=your_instagram_app_id
   INSTAGRAM_APP_SECRET=your_instagram_app_secret

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Email Service
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password

   # Server
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```

4. **MongoDB Atlas Setup (Recommended)**
   
   Run the interactive setup script:
   ```powershell
   .\setup-atlas.ps1
   ```
   
   This script will guide you through:
   - MongoDB Atlas URL configuration
   - Password encoding
   - Connection testing

5. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend application will run on `http://localhost:3000`

### Testing

**Backend Testing**
```bash
cd backend
# Test MongoDB connection
node test-mongodb.js

# Test authentication
node test-auth.js

# Test email service
node test-email.js

# Check users
node check-users.js
```

**Frontend Testing**
```bash
cd frontend
npm test
```

## 🔐 Authentication Flow

1. **User Registration**: Create account with email and password
2. **Email Verification**: Receive welcome email
3. **Social Media Connection**: OAuth flow for each platform
4. **Token Management**: JWT tokens for secure API access
5. **Protected Routes**: Middleware ensures authenticated access

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Business Profile
- `GET /api/businessProfile` - Get business profiles
- `POST /api/businessProfile` - Create business profile
- `PUT /api/businessProfile/:id` - Update business profile
- `DELETE /api/businessProfile/:id` - Delete business profile

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### AI Content
- `POST /api/aiContent/generate` - Generate AI content

### Analytics
- `GET /api/analytics` - Get analytics data

### Social Media OAuth
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/facebook` - Facebook OAuth
- `GET /api/auth/linkedin` - LinkedIn OAuth
- `GET /api/auth/instagram` - Instagram OAuth

## 🎨 Key Components

### Frontend Components
- **DashboardSidebar**: Navigation and menu
- **SocialConnections**: Manage platform connections
- **AIContentGenerator**: Generate content with AI
- **BusinessProfileForm**: Create/edit business profiles
- **NotificationsBell**: Real-time notifications
- **ProtectedRoute**: Secure route wrapper

### Backend Models
- **User**: User account and authentication
- **BusinessProfile**: Business information and settings
- **Campaign**: Marketing campaign details
- **Post**: Social media post content and scheduling
- **InstagramConnection**: Instagram OAuth tokens

## 🔧 Utility Scripts

- **setup-atlas.ps1**: Interactive MongoDB Atlas configuration
- **fix-mongodb.ps1**: MongoDB connection troubleshooting
- **test-mongodb.js**: Database connection testing
- **test-auth.js**: Authentication testing
- **test-email.js**: Email service testing
- **check-users.js**: User database inspection

## 📱 Responsive Design

The application features a fully responsive design with:
- Desktop sidebar navigation
- Mobile bottom navigation
- Touch-friendly interfaces
- Optimized layouts for tablets and phones

## 🌙 Dark Mode

Built-in dark mode support with persistent theme settings across sessions.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### MongoDB Connection Issues
Run the diagnostic script:
```powershell
.\fix-mongodb.ps1
```

### Authentication Problems
Check the authentication debug summary:
```bash
cat backend/AUTH_DEBUG_SUMMARY.md
```

### Environment Variables
Ensure all required variables in `config.env` are properly set and the file is located in the `backend` directory.

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

## 🙏 Acknowledgments

- OpenAI for AI content generation
- MongoDB Atlas for database hosting
- All social media platforms for their OAuth APIs
- React and Node.js communities

---

## Author
### Gavara Lokesh
📧 lokeshgavara1@gmail.com
🔗 LinkedIn Profile
