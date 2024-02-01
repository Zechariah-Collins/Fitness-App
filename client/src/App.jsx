import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Goals from './pages/Goals'
import Tracking from './pages/Tracking'
import Dashboard from './components/Dashboard'
import { Box } from '@mui/material'
import { Stack } from '@mui/system'

const App = () => {
  return (
    <BrowserRouter>
      <Box>
        <Stack direction='row' justifyContent='space-between'>
          <Sidebar/>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/goals' element={<Goals/>}/>
            <Route path='/tracking' element={<Tracking/>}/>
          </Routes>
        </Stack>
      </Box>
    </BrowserRouter>
  )
}

export default App