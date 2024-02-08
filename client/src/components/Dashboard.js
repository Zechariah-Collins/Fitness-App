import React, {useState, useEffect} from 'react'
import { Box, Button } from '@mui/material'
import HikingIcon from '@mui/icons-material/Hiking';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import GroupsIcon from '@mui/icons-material/Groups';
import {ActivityRings} from "@jonasdoesthings/react-activity-rings";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import WeeklyChart from './Chart';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import '../styles/Dashboard.css'

const Dashboard = () => {

  const [ringData, setRingData] = useState([])
  const [dailyChallenge, setDailyChallenge] = useState(false)
  const token = localStorage.getItem('jwtToken')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/ring_data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const ringData = await response.json();
        console.log(ringData)
        if (ringData && ringData.length > 0) {
          setRingData(ringData[0]);
        } else {
          throw new Error('No data received');
        }
      } catch (error) {
        console.error('Error fetching ring data:', error);
        // Handle error, show error message, etc.
      }
    };
  
    fetchData();
  }, []);

  const [points, setPoints] = useState([])
  useEffect(() => {
    fetch('http://localhost:3001/points', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(points => setPoints(points))
  }, [])

  const [user, setUser] = useState([])
  
  useEffect(() => {
    fetch(`http://localhost:3001/points/id`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(user => setUser(user))
  }, [])

  const ringsArray = ringData.length > 0 ? [
    { filledPercentage: ringData.sleep, color: '#00A8E8' },
    { filledPercentage: ringData.diet, color: '#007EA7' },
    { filledPercentage: ringData.exercise, color: '#003459' },
  ] : [
    { filledPercentage: .9, color: '#00A8E8' },
    { filledPercentage: .8, color: '#007EA7' },
    { filledPercentage: .7, color: '#003459' }]
  ;

  const columnColors = [
    '#8ADFFF',
    '#00A8E8',
    '#007EA7',
    '#003459',
    
]

const sortedData = points.sort((a, b) => b.weekly_points - a.weekly_points);
console.log(sortedData)
  return (
    <Box flex={6} bgcolor='#003459' sx={{display: 'flex', flexWrap: 'wrap'}}>
        <Box sx={{color:'white', margin:'10px'}}>Dashboard</Box>
        <Box marginTop ="100px">
            
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                    width: '100%',
                    justifyContent:'center',
                    borderRadius: 5,
                    marginBottom:10,
                    bgcolor:'white',
                }}
                >
                    <Box sx=
                        {{
                        display:"flex", 
                        justifyContent:"space-around", 
                        alignItems:"center",
                        margin:"20px 0px 20px 0px",
                        }}>
                        <Box  
                            sx={{
                            width:'220px', display:"flex", 
                            justifyContent:'flex-start',
                            alignItems:'center',
                            
                            }} 
                        >
                            <Box sx={{display:'flex', alignItems:'center'}}>
                                
                                <ActivityRings 
                                    rings={ringsArray}
                                    options={{ containerWidth: 150, backgroundOpacity: 0.3 }}
                                />
                                    
                                
                                <Box sx={{display:'flex', flexDirection: 'column', marginTop:'10px', marginBottom:'10px'}}>
                                    <FitnessCenterIcon sx={{bgcolor: '#003459', color: 'white', margin:.5, borderRadius:'10%'}}/>
                                    {ringData.exercise || .7 * 100}%
                                    <RestaurantIcon sx={{bgcolor: '#007EA7', color: 'white', margin:.5, borderRadius:'10%'}}/>
                                    {ringData.diet || .8 * 100}%
                                    <HotelIcon sx={{bgcolor: '#00A8E8', color: 'white', margin:.5, borderRadius:'10%'}}/>
                                    {ringData.sleep || .9 * 100}%
                                </Box>
                                
                            </Box>
                        
                        </Box>
                <Box display='flex' alignItems='center' flexDirection='column'>
                    <h3> Weekly Score </h3>
                    <Box 
                        width='200px' 
                        backgroundColor='black' 
                        height='55px' 
                        display='flex' 
                        justifyContent='space-around' 
                        alignItems='center'
                        borderRadius='5px'
                        
                        >
                        <GroupsIcon style={{color:'white', fontSize:'35px'}}/>
                        {user.length > 0 ?
                            <Box style={{color:'white', display:'flex'}}> {user.map((item) => (
                                <div display='flex' key={item.user_id}>
                                    {`${item.weekly_points}  points `}
                                </div>
                                ))}
                            </Box>
                        : 
                            <Box style={{color:'white', display:'flex'}}> 
                                No Points
                            </Box>
                        }
                    </Box>
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
                    <Button
                        onClick={() => setDailyChallenge(prevState => !prevState)}
                        className={`custom-button ${dailyChallenge ? 'active' : ''}`}
                        sx={{
                            backgroundColor: 'black',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '3px solid white', // Add border to avoid flickering during transitions
                            cursor: 'pointer',
                            transition: 'all 0.2s',

                            "&:active": {
                            backgroundColor: '#007EA7',
                            borderRadius:'0px',
                            width: '200px',
                            height: '100px',
                            },

                            "&.active": {
                            backgroundColor: '#007EA7',
                            borderRadius:'0px',
                            width: '200px',
                            height: '100px',
                            },
                            "&.active:hover": {
                            backgroundColor: '#003459',
                            width: '200px',
                            }
                        }}
                    >
                        {dailyChallenge === false ? (
                            <DirectionsRunIcon 
                                style={{
                                    color: 'white', 
                                    fontSize: '35px' 
                                }} 
                            />
                        ) : (
                            <div>
                                <p style={{ color: 'white', textTransform: 'none' }}>Complete a 20-minute brisk walk or jog.</p>
                            </div>
                        )}
                    </Button>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <h3> +100 points </h3>
                    </Box>
                </Box>
                <Box sx={{
                    width: 250,
                    height: 200,
                    borderRadius: 5,
                    marginLeft: 5,
                    bgcolor:'#D9D9D9'
                }}
                >
                </Box>
            </Box>
        </Box>
        <Box sx={{
                    width: 250,
                    height: 480,
                    borderRadius: 5,
                    marginLeft: 5,
                    bgcolor:'#D9D9D9',
                    ml: '150px',
                    marginTop:'100px',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center'
                    
                }}
                >
                <WeeklyChart/>
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                    width: "75%", 
                    height:'200px', 
                    backgroundColor:'black', 
                    borderRadius:'10px',
                    marginTop:'30px',
                    justifyContent:'space-between',
                    color:'white'
                    }}>
                    {sortedData.map((item, index) => (
                        <div display='flex' 
                            style={{
                                display:'flex', 
                                justifyContent:'space-between', 
                                alignItems:'center', margin:'5px'
                                }} 
                                key={item.user_id}
                        >
                            <Box 
                                display='flex' 
                                width='30px' 
                                height='30px' 
                                margin='5px' 
                                justifyContent='center' 
                                alignItems='center' 
                                borderRadius="5px" 
                                color='black' 
                                backgroundColor={columnColors[index]}
                            >
                                <PersonIcon/>
                            </Box>
                            <Box display='flex' width='120px'>
                                <span style={{color:`${columnColors[index]}`}}>{item.first_name} - {item.weekly_points} </span>
                            </Box>
                        </div>
                    ))}
                </Box>
                </Box>
    </Box>
  )
}

export default Dashboard