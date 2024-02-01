import React, {useState, useEffect} from 'react'
import { Box } from '@mui/material'
import HikingIcon from '@mui/icons-material/Hiking';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import GroupsIcon from '@mui/icons-material/Groups';
import {ActivityRings} from "@jonasdoesthings/react-activity-rings";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';

const Dashboard = () => {
 
  const [ringData, setRingData] = useState([])
  useEffect(() => {
    fetch('http://localhost:3001/ring_data')
    .then(res => res.json())
    .then(ringData => setRingData(ringData[0]))
    console.log(ringData.sleep)
  }, [])

  const [points, setPoints] = useState([])
  useEffect(() => {
    fetch('http://localhost:3001/points')
    .then(res => res.json())
    .then(points => setPoints(points[0]))
  }, [])

  const ringsArray = ringData ? [
    { filledPercentage: ringData.sleep, color: '#00A8E8' },
    { filledPercentage: ringData.diet, color: '#007EA7' },
    { filledPercentage: ringData.exercise, color: '#003459' },
  ] : null;
  
  
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
                    <h3 style={{marginLeft:'10px'}}> Daily Challenge </h3>
                    <Box display='flex' justifyContent='center' flexDirection='row'>
                        <Box
                            sx={{
                                ":hover": {
                                backgroundColor: 'gray',
                                }, 
                                ":active": {   
                                backgroundColor: 'green',
                                cursor: 'pointer',
                                }
                                
                            }}
                            width='75px' 
                            backgroundColor='black' 
                            height='75px' 
                            borderRadius='50%' 
                            display='flex' 
                            justifyContent='center' 
                            alignItems='center'
                            >
                            <DirectionsRunIcon 
                                style={{color:'white', fontSize:'35px'}}
                            />
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <h3> +100 points </h3>
                    </Box>
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
                <h3 style={{marginLeft:'10px'}}> Weekly Score </h3>
                <Box display='flex' justifyContent='center' flexDirection='row'>
                    <Box 
                        width='150px' 
                        backgroundColor='black' 
                        height='55px' 
                        display='flex' 
                        justifyContent='space-around' 
                        alignItems='center'
                        marginTop='40px'
                        borderRadius='5px'
                        >
                        <GroupsIcon style={{color:'white', fontSize:'35px'}}/>
                        <h4 style={{color:'white'}}> {points.weekly_points} points </h4>
                    </Box>
                </Box>
                </Box>
            </Box>
        </Box>
        <Box sx={{
                    width: 250,
                    height: 480,
                    borderRadius: 5,
                    backgroundColor: "black",
                    marginLeft: 5,
                    bgcolor:'#D9D9D9',
                    ml: '150px',
                    marginTop:'100px',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center'
                    
                }}
                >
                <Box sx={{display:'flex'}}>
                    <ActivityRings 
                        rings={ringsArray}
                        options={{ containerWidth: 150, backgroundOpacity: 0.3 }}
                    />
                    <Box sx={{display:'flex', flexDirection: 'column', marginTop:3}}>
                        <FitnessCenterIcon sx={{bgcolor: '#003459', color: 'white', margin:.5, borderRadius:'10%'}}/>
                        {ringData.exercise * 100}%
                        <RestaurantIcon sx={{bgcolor: '#007EA7', color: 'white', margin:.5, borderRadius:'10%'}}/>
                        {ringData.diet * 100}%
                        <HotelIcon sx={{bgcolor: '#00A8E8', color: 'white', margin:.5, borderRadius:'10%'}}/>
                        {ringData.sleep * 100}%
                    </Box>
                </Box>
                <Box sx={{
                    width: "75%", 
                    height:'160px', 
                    backgroundColor:'black', 
                    borderRadius:'10px',
                    marginTop:'30px',
                    }}>

                </Box>   
                </Box>
    </Box>
  )
}

export default Dashboard