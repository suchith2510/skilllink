# User Tracking and Admin Dashboard

This document explains how to use the new user tracking and admin dashboard features in SkillLink.

## 🚀 New Features Added

### 1. User Login Tracking
- **Last Login Time**: Tracks when each user last logged in
- **Login Count**: Counts total number of logins per user
- **Online Status**: Shows if user is currently online
- **Session Tracking**: Detailed login session information

### 2. Admin Dashboard
- **User Overview**: Statistics and metrics
- **User Management**: View all users and their details
- **Session Monitoring**: Track login sessions and activity

## 📊 Where to See the Output

### 1. Admin Dashboard (Web Interface)
**URL**: `http://localhost:3001/admin-dashboard`

**Access Steps**:
1. Go to `http://localhost:3001/admin-login`
2. Login with admin credentials:
   - Email: `admin@skilllink.com`
   - Password: `admin123`
3. You'll be redirected to the admin dashboard

**Dashboard Features**:
- **Overview Tab**: Shows statistics (total users, online users, premium users, today's logins)
- **Users Tab**: Complete user list with details (name, email, role, status, last login, login count, premium status)
- **Sessions Tab**: Recent login sessions with device info, duration, and status

### 2. Database (MongoDB)
**Collections**:
- `users`: User information with tracking fields
- `loginsessions`: Detailed session information

**Key Fields in Users Collection**:
```javascript
{
  name: "User Name",
  email: "user@example.com",
  role: "student|instructor|admin",
  lastLoginAt: "2024-01-15T10:30:00Z",
  loginCount: 15,
  isOnline: true,
  isPremium: false,
  createdAt: "2024-01-01T00:00:00Z"
}
```

**Key Fields in LoginSessions Collection**:
```javascript
{
  userId: "user_id",
  userEmail: "user@example.com",
  loginAt: "2024-01-15T10:30:00Z",
  logoutAt: "2024-01-15T12:30:00Z",
  sessionDuration: 120, // minutes
  isActive: false,
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  deviceInfo: {
    browser: "Chrome",
    os: "Windows",
    device: "Desktop"
  }
}
```

### 3. API Endpoints
**Admin-only endpoints** (require admin token):
- `GET /api/auth/stats` - Get system statistics
- `GET /api/auth/users` - Get all users
- `GET /api/auth/sessions` - Get recent login sessions
- `GET /api/auth/users/:userId` - Get specific user with sessions

**User endpoints**:
- `POST /api/auth/login` - Login (now tracks sessions)
- `POST /api/auth/logout` - Logout (updates session)
- `GET /api/auth/profile` - Get user profile

## 🛠️ Setup Instructions

### 1. Create Admin User
Run this command in the backend directory:
```bash
cd backend
node createAdmin.js
```

This creates an admin user with:
- Email: `admin@skilllink.com`
- Password: `admin123`

### 2. Start the Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 3. Access Admin Dashboard
1. Open browser to `http://localhost:3001/admin-login`
2. Login with admin credentials
3. View dashboard at `http://localhost:3001/admin-dashboard`

## 📈 What You Can Monitor

### User Activity
- **Real-time online users**
- **Login frequency**
- **Session duration**
- **Device usage patterns**
- **Premium vs free users**

### System Statistics
- **Total registered users**
- **Daily login activity**
- **Premium conversion rate**
- **User engagement metrics**

### Session Details
- **Login/logout times**
- **Session duration**
- **Device information**
- **IP addresses**
- **Browser/OS usage**

## 🔧 Customization

### Add More Tracking Fields
Edit `backend/models/User.js` to add more tracking fields:
```javascript
// Example: Add more tracking
lastActivityAt: { type: Date, default: null },
preferredLanguage: { type: String, default: 'en' },
timezone: { type: String, default: 'UTC' }
```

### Modify Dashboard
Edit `frontend/src/pages/AdminDashboard.jsx` to:
- Add more statistics
- Create custom filters
- Add export functionality
- Include charts/graphs

### Add More API Endpoints
Add new routes in `backend/routes/auth.js`:
```javascript
// Example: Get user activity timeline
router.get('/users/:userId/activity', adminAuth, async (req, res) => {
  // Implementation
});
```

## 🚨 Security Notes

- Admin endpoints require admin role authentication
- Session data includes IP addresses and user agents
- Consider GDPR compliance for user data
- Implement data retention policies
- Secure admin credentials

## 📝 Troubleshooting

### Common Issues:
1. **Admin login fails**: Run `node createAdmin.js` to create admin user
2. **Dashboard not loading**: Check if backend is running on port 3000
3. **No data showing**: Make sure users have logged in at least once
4. **CORS errors**: Ensure backend CORS is properly configured

### Debug Commands:
```bash
# Check MongoDB connection
mongo skilllink --eval "db.users.find().pretty()"

# Check sessions
mongo skilllink --eval "db.loginsessions.find().pretty()"

# Reset admin user
node createAdmin.js
```

## 🎯 Next Steps

Consider implementing:
- Email notifications for admin
- User activity reports
- Automated session cleanup
- Advanced analytics dashboard
- User behavior tracking
- Performance monitoring 