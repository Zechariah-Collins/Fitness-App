import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Goals from './pages/Goals';
import Tracking from './pages/Running';
import Dashboard from './components/Dashboard';
import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Lifting from './pages/Lifting';
import Running from './pages/Running';
import Diet from './pages/Diet';

const SidebarWithConditionalRendering = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/signup';
  
  if (isLoginPage) {
    return null;
  }
  
  return <Sidebar />;
};

const Layout = () => {
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between'>
        <SidebarWithConditionalRendering />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/goals' element={<Goals />} />
          <Route path='/running' element={<Running />} />
          <Route path='/lifting' element={<Lifting />} />
          <Route path='/diet' element={<Diet />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Stack>
    </Box>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
