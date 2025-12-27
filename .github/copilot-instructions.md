# MERN Lawyer Appointment Booking - Custom Instructions

## Project Context
This is a complete MERN stack (MongoDB, Express, React, Node.js) web application for lawyer appointment booking with:
- React frontend with routing and components
- Express backend with MongoDB
- Responsive design for all devices
- Full appointment booking functionality
- Data visualization with Recharts
- Animation with react-countup

## Development Guidelines

### Code Organization
- Components in `/frontend/src/components/`
- Pages in `/frontend/src/pages/`
- Styles in `/frontend/src/styles/`
- Backend routes in `/backend/routes/`
- Controllers in `/backend/controllers/`
- Models in `/backend/models/`

### Frontend Standards
- Use functional components with React Hooks
- Import CSS files in components
- Use react-router-dom for navigation
- Use react-hot-toast for notifications
- Keep components under 300 lines

### Backend Standards
- Follow RESTful API conventions
- Use async/await for database operations
- Implement error handling with try-catch
- Validate data before database operations
- Use CORS middleware for frontend access

### Styling Approach
- Use CSS files (no CSS-in-JS)
- Follow mobile-first responsive design
- Use CSS Grid for layouts
- Use Flexbox for alignment
- Color scheme: Primary #1e40af, Secondary #7c3aed

### Database Operations
- Use Mongoose schemas with proper types
- Implement error handling in controllers
- Use appropriate HTTP methods (GET, POST, DELETE)
- Add timestamps to models
- Create indexes for frequently queried fields

## Common Tasks

### Adding a New Page
1. Create component in `/frontend/src/pages/PageName.jsx`
2. Create CSS file in `/frontend/src/styles/PageName.css`
3. Add route in `/frontend/src/App.jsx`
4. Add navigation link in Navbar

### Adding a New API Endpoint
1. Define route in `/backend/routes/resourceRoutes.js`
2. Create controller method in `/backend/controllers/resourceController.js`
3. Import and use route in `/backend/server.js`
4. Test with curl or Postman

### Debugging
- Check browser console (F12)
- Check terminal for backend errors
- Use Network tab for API issues
- Verify MongoDB connection
- Check .env variables

## Testing Checklist
- [ ] Page loads without errors
- [ ] Responsive on mobile (< 768px)
- [ ] API endpoints return correct data
- [ ] Form submissions work
- [ ] Notifications appear
- [ ] Charts display correctly
- [ ] Navigation works
- [ ] Error pages show

## Git Workflow
1. Create feature branch: `git checkout -b feature/name`
2. Make changes and commit: `git commit -m "Description"`
3. Push: `git push origin feature/name`
4. Keep at least 10 commits minimum

## Performance Tips
- Minimize re-renders with proper state management
- Use lazy loading for images
- Optimize API calls
- Minify CSS and JavaScript for production
- Use CDN for external resources

## Security Notes
- Keep .env files out of git (.gitignore)
- Validate data on both frontend and backend
- Use HTTPS in production
- Sanitize user inputs
- Never commit API keys or passwords

## Useful Commands
```bash
# Install dependencies
npm run install-all

# Seed database
cd backend && npm run seed

# Start development
cd backend && npm start    # Terminal 1
cd frontend && npm start   # Terminal 2

# Build for production
cd frontend && npm run build

# Git workflow
git add .
git commit -m "message"
git push
```

## File Naming Conventions
- Components: PascalCase (HomePage.jsx)
- CSS files: match component name (HomePage.css)
- Files in models/controllers/routes: camelCase (lawyerController.js)
- Environment variables: UPPER_CASE (MONGODB_URI)

## Documentation
- Keep README.md updated
- Add comments for complex logic
- Document API changes
- Update IMPLEMENTATION.md when making major changes

## When Stuck
1. Check relevant documentation files
2. Review similar implementations in codebase
3. Check console/terminal errors
4. Verify configuration in .env
5. Test with sample data

---

For full documentation, see:
- README.md - Project overview and features
- SETUP.md - Detailed setup instructions
- IMPLEMENTATION.md - Technical details
- QUICKSTART.md - Quick reference guide
