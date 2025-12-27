# 🚀 MERN Lawyer Appointment Booking - Complete Setup Guide

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Database Setup](#database-setup)
6. [Project Structure](#project-structure)
7. [Development Workflow](#development-workflow)
8. [Troubleshooting](#troubleshooting)

---

## 📦 System Requirements

Before you start, ensure you have:
- **Node.js** v14.0.0 or higher
- **npm** v6.0.0 or higher
- **MongoDB** (local installation or Atlas cloud account)
- **Git** for version control
- A code editor (VS Code recommended)

### Check Installation

```bash
node --version    # Should be v14+
npm --version     # Should be v6+
git --version     # Should be installed
```

---

## 🔧 Installation

### Step 1: Clone or Navigate to Project

```bash
cd Lower-Appointment-Booking
```

### Step 2: Install All Dependencies

```bash
npm run install-all
```

Or manually:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

1. **Create .env file** in `backend/` folder:

```bash
cd backend
touch .env  # On Linux/Mac
echo. > .env  # On Windows
```

2. **Add environment variables**:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/lawyer-appointment

# Server
PORT=5000
NODE_ENV=development

# Optional: For MongoDB Atlas cloud
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lawyer-appointment?retryWrites=true&w=majority
```

### Frontend Configuration

1. **Create .env file** in `frontend/` folder:

```bash
cd ../frontend
touch .env  # On Linux/Mac
echo. > .env  # On Windows
```

2. **Add environment variables**:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎯 Running the Application

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend runs at: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend runs at: `http://localhost:3000` (opens automatically)

### Option 2: Development Mode with Auto-reload

**Terminal 1 - Backend (with nodemon):**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

---

## 🗄️ Database Setup

### Step 1: Install MongoDB

**Option A: Local Installation**
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Step 2: Seed Sample Data

After MongoDB is running:

```bash
cd backend
npm run seed
# Or: node seed.js
```

This adds 12 sample lawyers to your database.

### Step 3: Verify Data

Open MongoDB Compass or Atlas UI to verify:
- Database: `lawyer-appointment`
- Collection: `lawyers` (should have 12 documents)

---

## 📁 Project Structure

```
Lower-Appointment-Booking/
│
├── frontend/
│   ├── public/
│   │   └── index.html              # Main HTML
│   ├── src/
│   │   ├── components/             # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LawyerCard.jsx
│   │   │   ├── AppointmentCard.jsx
│   │   │   └── SuccessSection.jsx
│   │   ├── pages/                  # Page components
│   │   │   ├── Homepage.jsx
│   │   │   ├── LawyerDetails.jsx
│   │   │   ├── Bookings.jsx
│   │   │   ├── Blogs.jsx
│   │   │   └── ErrorPage.jsx
│   │   ├── styles/                 # CSS files
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── models/                     # Database schemas
│   │   ├── Lawyer.js
│   │   ├── Appointment.js
│   │   └── Blog.js
│   ├── controllers/                # Business logic
│   │   ├── lawyerController.js
│   │   ├── appointmentController.js
│   │   └── blogController.js
│   ├── routes/                     # API routes
│   │   ├── lawyerRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── blogRoutes.js
│   ├── server.js                   # Express server
│   ├── seed.js                     # Sample data
│   ├── package.json
│   └── .env
│
├── README.md                       # Full documentation
├── QUICKSTART.md                   # Quick setup
├── IMPLEMENTATION.md               # Implementation details
├── SETUP.md                        # This file
├── package.json                    # Root package.json
└── .gitignore
```

---

## 💻 Development Workflow

### Making Changes

1. **Create a feature branch:**
```bash
git checkout -b feature/feature-name
```

2. **Make your changes:**
   - Edit files in frontend or backend
   - Frontend auto-reloads with `npm start`
   - Backend auto-reloads with `npm run dev`

3. **Test your changes:**
   - Test in browser at http://localhost:3000
   - Check console for errors
   - Test API endpoints

4. **Commit your changes:**
```bash
git add .
git commit -m "Add feature description"
```

5. **Push to repository:**
```bash
git push origin feature/feature-name
```

### Common Development Tasks

**Add a new page:**
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Add link in Navbar

**Add a new API endpoint:**
1. Create route in `backend/routes/`
2. Add controller logic in `backend/controllers/`
3. Import route in `backend/server.js`

**Add styling:**
1. Create CSS file in `frontend/src/styles/`
2. Import in component: `import '../styles/Component.css'`

---

## 🐛 Troubleshooting

### Port Already in Use

**Error:** `Port 5000 or 3000 already in use`

**Solution:**
```bash
# Change port in backend/.env
PORT=5001

# Or kill process using port (Linux/Mac)
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Failed

**Error:** `Failed to connect to MongoDB`

**Solutions:**
1. Ensure MongoDB is running:
   ```bash
   # Check MongoDB status
   sudo systemctl status mongod  # Linux
   # Or check Activity Monitor (Mac)
   ```

2. Check connection string in `.env`:
   ```env
   # Local
   MONGODB_URI=mongodb://localhost:27017/lawyer-appointment
   
   # Atlas Cloud
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/lawyer-appointment?retryWrites=true&w=majority
   ```

3. Ensure database is accessible

### Frontend Can't Connect to Backend

**Error:** `Failed to fetch from http://localhost:5000`

**Solutions:**
1. Verify backend is running on port 5000
2. Check `REACT_APP_API_URL` in `frontend/.env`
3. Clear browser cache and restart

### Dependencies Not Installing

**Error:** `npm ERR! ...`

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules  # Linux/Mac
rmdir /s node_modules  # Windows

# Reinstall
npm install
```

### Git Issues

**Commit fails:**
```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

**Merge conflicts:**
```bash
# Abort merge
git merge --abort

# Or manually resolve conflicts
git add .
git commit -m "Resolve merge conflict"
```

---

## 📝 Important Notes

### Security
- Never commit `.env` files with real credentials
- Use `.gitignore` to exclude sensitive files
- For production, use environment variables from hosting platform

### Performance
- API calls are cached in React state
- Components re-render only when needed
- Images are optimized from Unsplash

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🚀 Deployment Preparation

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```
Creates optimized build in `frontend/build/`

**Backend:**
- No build needed, deploy `backend/` folder

### Environment Variables for Production
```env
# Backend
MONGODB_URI=production-mongodb-uri
PORT=5000
NODE_ENV=production

# Frontend
REACT_APP_API_URL=production-api-url
```

---

## 📚 Useful Resources

- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [React Router Documentation](https://reactrouter.com)
- [Recharts Documentation](https://recharts.org)

---

## ✅ Verification Checklist

Before considering the project ready:

- [ ] Node and npm installed
- [ ] MongoDB running
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] `npm run install-all` successful
- [ ] `npm run seed` executed
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can view all lawyers on homepage
- [ ] Can book an appointment
- [ ] Can view bookings
- [ ] Can cancel appointment
- [ ] Chart updates on cancellation
- [ ] Blog page loads
- [ ] 404 page working
- [ ] Responsive on mobile
- [ ] At least 10 git commits
- [ ] README.md updated

---

## 🤝 Need Help?

Check these files:
- `README.md` - Full documentation
- `QUICKSTART.md` - Quick reference
- `IMPLEMENTATION.md` - Technical details
- Backend `server.js` - API setup
- Frontend `App.jsx` - Routing setup

---

**Happy Coding!** 🎉⚖️

Start by running:
```bash
cd backend && npm start
# In another terminal
cd frontend && npm start
```

Then open http://localhost:3000 in your browser!
