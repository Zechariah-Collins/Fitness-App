import React, {useState, useEffect} from 'react'
import { Box, TextField, Button, TextareaAutosize } from '@mui/material'
import EditableBox from '../components/EditableBox'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BedtimeIcon from '@mui/icons-material/Bedtime';

const Goals = () => {

  const [goals, setGoals] = useState([])
  const [title, setTitle] = useState('My goal is...')
  const [description, setDescription] = useState('Default Description');
  const token = localStorage.getItem('jwtToken')

  useEffect(() => {
    fetch('http://localhost:3001/goals/id', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
  })
    .then(res => res.json())
    .then(goals => setGoals(goals))
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {title, description};
    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
      body: JSON.stringify(newGoal)
    }).then(console.log('New goal added'))
    
  };
  
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async (e) => {
    try {
      const response = await fetch('/goals');
      if (response.ok) {
        const data = await response.json();
        setGoals(data);
      } else {
        console.error('Failed to fetch goals');
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const userGoals = goals.map(item => {
    return (
      <EditableBox item={item}/>
    )
  })
  return ( 
      <Box flex={6} bgcolor='#003459' display='flex' flexWrap='wrap' alignItems='center' justifyContent='space-evenly'>
        <Box width='65%' display='flex' flexWrap='wrap'>
          {userGoals}
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          width='275px' 
          height='75%'
          sx={{
            backgroundColor: '#D9D9D9',
            borderRadius: '10px',
            }}>
          <Box marginTop='5px' marginLeft='5px'>
            <h1 style={{margin:'5px'}}>Add a goal</h1>
          </Box>
          <Box
            display='flex'
            alignSelf='center' 
            width='90%'
            flexDirection='column'
            >
              <Box display='flex' justifyContent='space-evenly' marginTop='20%' marginBottom='20%'>
                <Box width='60px' height='60px' backgroundColor='black' display='flex' justifyContent='center' alignItems='center' borderRadius='2em'
                  sx={{':hover': {backgroundColor: '#007EA7', cursor:'pointer'}}}>
                  <DirectionsRunIcon sx={{color:'white'}} />
                </Box>
                <Box width='60px' height='60px' backgroundColor='black' display='flex' justifyContent='center' alignItems='center' borderRadius='2em'
                  sx={{':hover': {backgroundColor: '#007EA7', cursor:'pointer'}}}>
                  <RestaurantIcon sx={{color:'white'}}/>
                </Box>
                <Box width='60px' height='60px' backgroundColor='black' display='flex' justifyContent='center' alignItems='center' borderRadius='2em'
                  sx={{':hover': {backgroundColor: '#007EA7', cursor:'pointer'}}}> 
                  <BedtimeIcon sx={{color:'white'}}/>
                </Box>
              </Box>
              <TextField 
                id="outlined-basic" 
                label="Goal" 
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  marginTop: '2em',
                  marginBottom: '2em',
                }}
              />
              <TextareaAutosize 
                id="outlined-basic" 
                label="Description" 
                variant="outlined"
                value={description}
                minRows={3}
                onChange={(e) => setDescription(e.target.value)}
                
              />
              <Button onClick={handleSubmit} variant="contained" 
                sx={{
                  width:'100px',
                  marginTop: '2em',
                  }}>
                Submit 
              </Button>
          </Box>
        </Box>

      </Box>
    )
}

export default Goals