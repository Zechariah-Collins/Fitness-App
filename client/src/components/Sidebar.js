import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const Sidebar = () => {
  return (
    <Box 
        flex={1} 
        bgcolor='white' 
        sx={{ display: { xs: "none", sm: "block" } }}
        height='100vh'
    >
        <List>
            <ListItem disablePadding>
            <ListItemButton component='a' href='/'>
                <ListItemIcon>
                    <HomeIcon style={{color: 'black'}}/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component='a' href='goals'>
                <ListItemIcon>
                    <TrackChangesIcon style={{color: 'black'}}/>
                </ListItemIcon>
                <ListItemText primary="Goals" />
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component='a' href='/tracking'>
                <ListItemIcon>
                    <AutoGraphIcon style={{color: 'black'}}/>
                </ListItemIcon>
                <ListItemText primary="Tracking" />
            </ListItemButton>
            </ListItem>
        </List>
        <ListItem 
            style={{position:'absolute', bottom:5, fontSize:18}}> 
            <LogoutIcon sx={{mr:3}}/>
            Log Out
        </ListItem>
    </Box>
    
  )
}

export default Sidebar