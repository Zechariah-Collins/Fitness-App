import React from 'react'
import { Box } from '@mui/material'
import HikingIcon from '@mui/icons-material/Hiking';

const Dashboard = () => {
  return (
    <Box flex={6} bgcolor='#003459' sx={{display: 'flex', flexWrap: 'wrap'}}>
        <Box sx={{color:'white', margin:'10px'}}>Dashboard</Box>
        <Box marginTop ="100px">
            
                <Box sx={{
                    width: 580,
                    height: 200,
                    borderRadius: 5,

                    marginBottom:10,
                    bgcolor:'white'
                }}
                >
                    <Box sx={{ml:5, paddingTop:1}}>
                        Planned Workouts For Today
                    </Box>
                    <Box sx=
                        {{
                        paddingTop:2, 
                        display:"flex", 
                        justifyContent:"space-around", 
                        alignItems:"center",
                        }}>
                        <Box  sx={{width:'200px', display:"flex", 
                        justifyContent:"space-around", 
                        alignItems:"center",}} display='flex'>
                            <HikingIcon style={{fontSize:'50px'}}/>
                            <Box >
                                <h2>Hike</h2>
                                <h5>1.5 miles</h5>
                            </Box>
                        </Box>
                        <Box width='280px' height="150px" 
                            sx={{backgroundColor:'black', borderRadius:5}}>

                        </Box>
                    </Box>
                </Box>
            
            <Box display='flex' flexDirection='row'>
                <Box sx={{
                    width: 250,
                    height: 200,
                    borderRadius: 5,
                    backgroundColor: "black",
                    marginRight: 5,
                    bgcolor:'#D9D9D9'
                }}
                >
                </Box>
                <Box sx={{
                    width: 250,
                    height: 200,
                    borderRadius: 5,
                    backgroundColor: "black",
                    marginLeft: 5,
                    bgcolor:'#D9D9D9'
                }}
                >
                </Box>
            </Box>
        </Box>
        <Box sx={{
                    width: 200,
                    height: 480,
                    borderRadius: 5,
                    backgroundColor: "black",
                    marginLeft: 5,
                    bgcolor:'#D9D9D9',
                    ml: '150px',
                    marginTop:'100px'
                }}
                >
                </Box>
    </Box>
  )
}

export default Dashboard