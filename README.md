# Lawyer Appointment Booking Web App

A comprehensive MERN stack web application for booking lawyer appointments. This application allows users to browse lawyer profiles, schedule appointments, and manage their bookings with a responsive and intuitive user interface.

## Project Features

### Core Features
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Lawyer Browse & Search** - Browse and view detailed profiles of 12+ lawyers
- ✅ **Appointment Booking** - Easy appointment booking with availability checking
- ✅ **Booking Management** - View, and cancel appointments
- ✅ **Blog Section** - Educational articles about React hooks and best practices
- ✅ **Appointment Analytics** - Recharts visualization of appointment fees
- ✅ **Toast Notifications** - User-friendly feedback with react-hot-toast
- ✅ **Data Persistence** - Appointments persist using localStorage and MongoDB

### Advanced Features
- **Counting Animation** - React-countup for stats animation on homepage
- **Dynamic Routing** - React Router for seamless page navigation
- **Error Handling** - Custom 404 error page with proper navigation
- **Responsive Grid Layouts** - Auto-adapting grid for lawyer cards
- **Chart Visualization** - Recharts for appointment fee visualization

## Project Structure

```
Lower-Appointment-Booking/
├── frontend/                    # React Frontend Application
│   ├── public/
│   │   └── index.html          # Main HTML file
│   ├── src/
│   │   ├── components/         # Reusable Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LawyerCard.jsx
│   │   │   ├── AppointmentCard.jsx
│   │   │   └── SuccessSection.jsx
│   │   ├── pages/              # Page Components
│   │   │   ├── Homepage.jsx
│   │   │   ├── LawyerDetails.jsx
│   │   │   ├── Bookings.jsx
│   │   │   ├── Blogs.jsx
│   │   │   └── ErrorPage.jsx
│   │   ├── styles/             # CSS Stylesheets
│   │   ├── App.jsx             # Main App Component
│   │   ├── index.jsx           # React Entry Point
│   │   └── index.css           # Global Styles
│   ├── package.json
│   └── .env
├── backend/                    # Express Backend Application
│   ├── models/                 # MongoDB Schemas
│   │   ├── Lawyer.js
│   │   ├── Appointment.js
│   │   └── Blog.js
│   ├── controllers/            # Business Logic
│   │   ├── lawyerController.js
│   │   ├── appointmentController.js
│   │   └── blogController.js
│   ├── routes/                 # API Routes
│   │   ├── lawyerRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── blogRoutes.js
│   ├── server.js               # Express Server
│   ├── package.json
│   └── .env
└── README.md
```

## Technology Stack

### Frontend
- **React 18** - UI Library
- **React Router DOM 6** - Client-side routing
- **Recharts** - Data visualization charts
- **React Countup** - Number animation
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library
- **CSS3** - Styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL Database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-Origin Resource Sharing

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start development server:**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```
   MONGODB_URI=mongodb://localhost:27017/lawyer-appointment
   PORT=5000
   NODE_ENV=development
   ```

4. **Start server:**
   ```bash
   npm start
   ```
   Server runs at `http://localhost:5000`

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Lawyers
- `GET /api/lawyers` - Get all lawyers
- `GET /api/lawyers/:id` - Get lawyer by ID

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog

## Pages & Features

### Homepage
- **Banner Section** - Hero banner with call-to-action
- **Lawyers Grid** - Display 6 lawyers with "Show All" button
- **Success Stats** - 4 cards with counting animations
- **Responsive Layout** - Adapts to all screen sizes

### Lawyer Details Page
- **Profile Card** - Lawyer information and image
- **Availability** - Show available days
- **Appointment Card** - Book appointment button
- **Dynamic Routing** - Loads specific lawyer data

### Bookings Page
- **Appointment List** - All booked appointments
- **Fee Chart** - Recharts visualization
- **Cancel Option** - Remove appointments
- **No Bookings State** - Empty state with action button

### Blogs Page
- **5 Blog Articles**:
  1. What is useState and how does it work in React?
  2. What is the purpose of useEffect in React?
  3. What is a custom hook in React and when should you use one?
  4. Difference between controlled and uncontrolled components
  5. Tell us something about useFormStatus() in React

### Error Page (404)
- Custom error page design
- Navbar visible, Footer hidden
- Button to return to homepage

## Key Components

### Navbar
- Logo and site name
- 4 navigation menu items
- "My Bookings" button
- Mobile-responsive hamburger menu

### Footer
- Center-aligned logo
- Navigation links
- 3 Social media icons
- Responsive grid layout

### LawyerCard
- Lawyer image
- Name, specialty, experience
- License number
- View Details button
- Hover animations

### AppointmentCard
- Availability badge
- Book Now button
- Lawyer information
- Loading states

## Styling Highlights

- **Gradient Colors**: Modern gradients using primary (#1e40af) and secondary (#7c3aed) colors
- **Responsive Grid**: Auto-fit grid layouts
- **Shadow Effects**: Subtle shadows for depth
- **Hover Animations**: Smooth transitions and transforms
- **Mobile First**: Optimized for all screen sizes

## Features Implemented

✅ Navbar visible on all pages (including error page)
✅ Footer on all pages except error page
✅ Lawyer profile browsing with grid layout
✅ Show All button for loading additional lawyers
✅ Success section with counting animations
✅ Lawyer details page with profile information
✅ Appointment booking functionality
✅ Bookings page with appointment management
✅ Cancel appointment with chart update
✅ Blog page with 5 educational articles
✅ Appointment fee visualization with Recharts
✅ Toast notifications for user feedback
✅ localStorage persistence for appointments
✅ Custom 404 error page
✅ Dynamic routing with error handling
✅ Responsive design for all devices
✅ Loading states and error boundaries

## Development

### Making Changes

1. Create a new git branch
2. Make your changes
3. Commit with meaningful messages
4. Push and create a pull request

### Git Workflow

```bash
git add .
git commit -m "Add feature description"
git push origin branch-name
```

## Performance Tips

- Images are lazy-loaded
- CSS is modular and scoped
- Components are optimized with React.memo where needed
- Smooth animations use CSS transforms

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or cloud connection string is correct
- Check .env file in backend folder

### API Not Connecting
- Verify both frontend and backend servers are running
- Check CORS settings in backend
- Ensure API_URL in frontend .env matches backend URL

### Port Already in Use
- Change PORT in backend .env
- Change port in frontend package.json scripts

## Future Enhancements

- User authentication and profiles
- Payment integration
- Email notifications
- Lawyer ratings and reviews
- Real-time appointment scheduling
- Admin dashboard

## License

This project is open source and available under the MIT License.

## Contributors

Built with passion for legal tech innovation! 🚀

---

**Happy Coding!** ⚖️
