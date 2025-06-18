const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const LoginSession = require('./models/LoginSession');
require('dotenv').config();

const app = express();
const PORT = 3002; // Different port to avoid conflicts

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skilllink')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static HTML admin dashboard
app.get('/', async (req, res) => {
  try {
    // Get all data
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    const sessions = await LoginSession.find({})
      .populate('userId', 'name email')
      .sort({ loginAt: -1 })
      .limit(20);
    
    const stats = {
      totalUsers: await User.countDocuments(),
      onlineUsers: await User.countDocuments({ isOnline: true }),
      premiumUsers: await User.countDocuments({ isPremium: true }),
      adminUsers: await User.countDocuments({ role: 'admin' }),
      todayLogins: await LoginSession.countDocuments({
        loginAt: { $gte: new Date().setHours(0, 0, 0, 0) }
      })
    };

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkillLink Admin Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            min-height: 100vh;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .stats-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .stat-card { 
            background: rgba(255,255,255,0.1); 
            padding: 20px; 
            border-radius: 10px; 
            text-align: center;
            backdrop-filter: blur(10px);
        }
        .stat-number { font-size: 2rem; font-weight: bold; margin-bottom: 5px; }
        .stat-label { font-size: 0.9rem; opacity: 0.8; }
        .section { 
            background: rgba(255,255,255,0.1); 
            margin-bottom: 30px; 
            border-radius: 10px; 
            overflow: hidden;
            backdrop-filter: blur(10px);
        }
        .section-header { 
            background: rgba(255,255,255,0.2); 
            padding: 15px 20px; 
            font-size: 1.2rem; 
            font-weight: bold; 
        }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid rgba(255,255,255,0.1); 
        }
        .table th { 
            background: rgba(255,255,255,0.2); 
            font-weight: bold; 
        }
        .table tr:hover { background: rgba(255,255,255,0.05); }
        .badge { 
            padding: 4px 8px; 
            border-radius: 12px; 
            font-size: 0.8rem; 
            font-weight: bold; 
        }
        .badge-admin { background: #dc2626; }
        .badge-student { background: #059669; }
        .badge-online { background: #059669; }
        .badge-offline { background: #6b7280; }
        .badge-premium { background: #7c3aed; }
        .badge-free { background: #6b7280; }
        .refresh-btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            margin-bottom: 20px;
        }
        .refresh-btn:hover { background: #2563eb; }
        .timestamp { font-size: 0.8rem; opacity: 0.7; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 SkillLink Admin Dashboard</h1>
            <p>Real-time user activity and system statistics</p>
            <button class="refresh-btn" onclick="location.reload()">🔄 Refresh Data</button>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${stats.totalUsers}</div>
                <div class="stat-label">Total Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.onlineUsers}</div>
                <div class="stat-label">Online Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.premiumUsers}</div>
                <div class="stat-label">Premium Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.adminUsers}</div>
                <div class="stat-label">Admin Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.todayLogins}</div>
                <div class="stat-label">Today's Logins</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.totalUsers > 0 ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1) : 0}%</div>
                <div class="stat-label">Premium Rate</div>
            </div>
        </div>

        <div class="section">
            <div class="section-header">👥 All Users (${users.length})</div>
            <div style="overflow-x: auto;">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th>Login Count</th>
                            <th>Premium</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => `
                            <tr>
                                <td>${user.name || 'N/A'}</td>
                                <td>${user.email}</td>
                                <td><span class="badge badge-${user.role}">${user.role}</span></td>
                                <td><span class="badge badge-${user.isOnline ? 'online' : 'offline'}">${user.isOnline ? 'Online' : 'Offline'}</span></td>
                                <td class="timestamp">${user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}</td>
                                <td>${user.loginCount || 0}</td>
                                <td><span class="badge badge-${user.isPremium ? 'premium' : 'free'}">${user.isPremium ? 'Premium' : 'Free'}</span></td>
                                <td class="timestamp">${new Date(user.createdAt).toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="section">
            <div class="section-header">🔐 Recent Login Sessions (${sessions.length})</div>
            <div style="overflow-x: auto;">
                <table class="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Login Time</th>
                            <th>Logout Time</th>
                            <th>Duration</th>
                            <th>Device</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sessions.map(session => `
                            <tr>
                                <td>${session.userId?.name || session.userEmail}</td>
                                <td class="timestamp">${new Date(session.loginAt).toLocaleString()}</td>
                                <td class="timestamp">${session.logoutAt ? new Date(session.logoutAt).toLocaleString() : 'Active'}</td>
                                <td>${session.sessionDuration ? session.sessionDuration + ' min' : 'N/A'}</td>
                                <td>${session.deviceInfo?.browser || 'Unknown'} on ${session.deviceInfo?.os || 'Unknown'}</td>
                                <td><span class="badge badge-${session.isActive ? 'online' : 'offline'}">${session.isActive ? 'Active' : 'Ended'}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px; opacity: 0.7;">
            <p>Last updated: ${new Date().toLocaleString()}</p>
            <p>Auto-refresh every 30 seconds</p>
        </div>
    </div>

    <script>
        // Auto-refresh every 30 seconds
        setInterval(() => {
            location.reload();
        }, 30000);
    </script>
</body>
</html>`;

    res.send(html);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// API endpoints for AJAX calls (optional)
app.get('/api/stats', async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      onlineUsers: await User.countDocuments({ isOnline: true }),
      premiumUsers: await User.countDocuments({ isPremium: true }),
      todayLogins: await LoginSession.countDocuments({
        loginAt: { $gte: new Date().setHours(0, 0, 0, 0) }
      })
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Admin Dashboard running on http://localhost:${PORT}`);
  console.log(`📊 View user login information and system statistics`);
}); 