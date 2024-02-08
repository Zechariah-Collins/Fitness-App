import React, {useState} from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';

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
            <ListItemButton component='a' href='/dashboard'>
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
            <ListItemButton component='a' href='/running'>
                <ListItemIcon>
                    <AutoGraphIcon style={{color: 'black'}}/>
                </ListItemIcon>
                <ListItemText primary="Running" />
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component='a' href='/lifting'>
                <ListItemIcon>
                    <FitnessCenterIcon style={{color: 'black'}}/>
                </ListItemIcon>
                <ListItemText primary="Lifting" />
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component='a' href='/diet'>
                <ListItemIcon>
                    <RestaurantIcon style={{color: 'black'}}/>
                </ListItemIcon>
                <ListItemText primary="Diet" />
            </ListItemButton>
            </ListItem>
        </List>
        <ListItem 
            style={{position:'absolute', bottom:5, fontSize:18}}> 
            <LogoutIcon sx={{mr:3}}/>
            Log Out
        </ListItem>
    </Box>) 
}

export default Sidebar