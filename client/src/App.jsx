import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Goals from './pages/Goals';
import Tracking from './pages/Tracking';
import Dashboard from './components/Dashboard';
import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const SidebarWithConditionalRendering = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

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
          <Route path='/' element={<Dashboard />} />
          <Route path='/goals' element={<Goals />} />
          <Route path='/tracking' element={<Tracking />} />
          <Route path='/login' element={<Login />} />
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
