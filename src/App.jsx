import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import MarketingTemplate from './pages/MarketingTemplate';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import AdminDashboard from './pages/AdminDashboard';
import CreateEvent from './pages/CreateEvent';
import PrivateRoute from './components/PrivateRoute';

// Simple Layout component to include Navbar on all pages (except specialized ones if needed)
const Layout = ({ mode, toggleTheme }) => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar mode={mode} toggleTheme={toggleTheme} />
    <Box sx={{ mt: 8, flex: 1 }}> {/* mt: 8 to offset fixed navbar */}
      <Outlet />
    </Box>
  </Box>
);

function App() {
  // State for theme mode
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Landing Page (Has its own Navbar logic or we use Layout?) 
              LandingPage currently renders Navbar inside it. We might want to keep it as is 
              or make it use the Layout. For now, keeping as is to avoid breaking scroll logic.
          */}
          <Route path="/" element={<LandingPage mode={mode} toggleTheme={toggleTheme} />} />
          <Route path="/template" element={<MarketingTemplate mode={mode} toggleTheme={toggleTheme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected/App Routes wrapped in Layout */}
          <Route element={<Layout mode={mode} toggleTheme={toggleTheme} />}>
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetails />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute roles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create-event" element={<CreateEvent />} />
              <Route path="/admin/edit-event/:id" element={<CreateEvent />} />
            </Route>
          </Route>

          {/* Redirect any unknown route to home for now */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
