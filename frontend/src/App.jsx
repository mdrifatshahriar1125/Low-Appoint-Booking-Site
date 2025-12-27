import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chat from './components/Chat';
import Homepage from './pages/Homepage';
import LawyerDetails from './pages/LawyerDetails';
import Bookings from './pages/Bookings';
import Blogs from './pages/Blogs';
import ErrorPage from './pages/ErrorPage';
import './App.css';
import './styles/theme.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/lawyer/:id" element={<LawyerDetails />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/404" element={<ErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
            <Footer />
            <Chat lawyerId="1" lawyerName="Our Support Team" />
            <Toaster position="top-center" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
