# Lawyer Appointment Booking - MERN Stack

## Quick Start Guide

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Installation Steps

#### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend:
```
MONGODB_URI=mongodb://localhost:27017/lawyer-appointment
PORT=5000
NODE_ENV=development
```

Seed the database with sample lawyers:
```bash
node seed.js
```

Start the backend server:
```bash
npm start
```

Server will run on: http://localhost:5000

#### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React app:
```bash
npm start
```

App will open at: http://localhost:3000

### Features

✅ Browse 12+ lawyer profiles
✅ Book appointments with lawyers
✅ Manage your bookings
✅ View appointment fees chart
✅ Read educational blog posts
✅ Responsive design for all devices
✅ Toast notifications
✅ Error handling with custom 404 page

### Project Structure

```
Lower-Appointment-Booking/
├── frontend/          (React App)
├── backend/           (Express Server)
└── README.md
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lawyers` | Get all lawyers |
| GET | `/api/lawyers/:id` | Get lawyer details |
| GET | `/api/appointments` | Get all appointments |
| POST | `/api/appointments` | Book appointment |
| DELETE | `/api/appointments/:id` | Cancel appointment |

### Technologies Used

- React 18 with Hooks
- Express.js
- MongoDB & Mongoose
- Recharts for data visualization
- React Router for navigation
- React Hot Toast for notifications
- React Countup for animations

### Pages

- **Home** - Browse lawyers and view stats
- **Lawyer Details** - View full profile and book appointment
- **Bookings** - Manage appointments with chart visualization
- **Blogs** - Read articles about React
- **404** - Custom error page

### Commit & GitHub

Make sure to make at least 10 commits:

```bash
git add .
git commit -m "Initial project setup"
git push origin main
```

### Troubleshooting

**Port already in use?**
```bash
# Change PORT in backend .env
PORT=5001
```

**MongoDB not connecting?**
```bash
# Check connection string in .env
# Ensure MongoDB service is running
```

**Frontend can't reach API?**
```bash
# Check REACT_APP_API_URL in frontend .env
# Ensure backend server is running on port 5000
```

### Next Steps

1. ✅ Setup both frontend and backend
2. ✅ Run seed.js to populate lawyers
3. ✅ Start both servers
4. ✅ Test appointment booking
5. ✅ Make git commits
6. ✅ Deploy!

Happy coding! 🚀⚖️
