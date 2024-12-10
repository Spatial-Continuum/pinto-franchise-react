import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout' // Import the AdminLayout
import Dashboard from './pages/Dashboard'; // Sample page (Dashboard)
import NotFound from './pages/NotFound'; // 404 Page
import '../src/App.css';


const App = () => {
  return (
   <>
    <Router>
      <Routes>
        {/* Wrap pages with AdminLayout */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} /> {/* Default Route */}
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        
        {/* 404 Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
   </> 
  );
};

export default App;
