import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Slide, Grid, Paper, TextField, Button, duration } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HotelIcon from '@mui/icons-material/Hotel';

const date =  new Date();
const current_day = date.getDay();
const token = localStorage.getItem('jwtToken')


const Running = () => {
  const [runs, setRuns] = useState([]);
  const [showChallenge, setShowChallenge] = useState(false);
  const [runningData, setRunningData] = useState({
    distance: '',
    duration: '',
  });

  const handleChallengeClick = () => {
    setShowChallenge(true);
    setTimeout(() => {
      setShowChallenge(false);
    }, 3000); // Duration of the challenge message
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRunningData({
      ...runningData,
      [name]: value,
    });
  };
  
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission (e.g., send data to backend)
    console.log('Running data:', runningData);
    // Reset form fields
    setRunningData({
      distance: '',
      duration: '',
    });
    const points = runningData['distance'] * runningData['duration']

    fetch('http://localhost:3001/points/run', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({points})
    },[])
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      borderRadius='1rem'
      width='100%'
      height='100%'
      bgcolor='#003459'
      padding='20px'
      color='#FFFFFF'
      flex={6} // Set flex to 6
    >
      <Typography variant='h3' gutterBottom>
        Let's Go Running!
      </Typography>
      <Typography variant='body1' align='center' gutterBottom>
        Lace up, hit the pavement, and track your runs. Get ready to crush your goals!
      </Typography>
      <IconButton
        size='large'
        style={{
          background: 'linear-gradient(45deg, #00A8E8 30%, #007EA7 90%)',
          borderRadius: '50%',
          padding: '30px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          marginTop: '20px',
        }}
        onClick={handleChallengeClick}
      >
        <DirectionsRunIcon fontSize='large' />
      </IconButton>
      <Slide direction='down' in={showChallenge} mountOnEnter unmountOnExit>
        <Box
          width='100%'
          bgcolor='#007EA7'
          borderRadius='20px'
          padding='20px'
          marginTop='20px'
          boxShadow='0px 4px 10px rgba(0, 0, 0, 0.3)'
        >
          <Typography variant='h6' align='center' gutterBottom>
            New Challenge Unlocked!
          </Typography>
          <Typography variant='body1' align='center'>
            Ready, set, go! Lace up and complete today's challenge.
          </Typography>
        </Box>
      </Slide>
      <Typography variant='h4' gutterBottom style={{ marginTop: '40px' }}>
        Running Tips
      </Typography>
      <Grid container spacing={3} justifyContent='center'>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', background: '#D9D9D9' }}>
            <FitnessCenterIcon fontSize='large' style={{ color: '#003459', marginBottom: '10px', fontSize: '2.5rem' }} />
            <Typography variant='subtitle1' gutterBottom>
              Warm-Up
            </Typography>
            <Typography variant='body2'>
              Proper warm-up can prevent injury and improve performance. Include dynamic stretches and light jogging
              before your run.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', background: '#D9D9D9' }}>
            <LocalDiningIcon fontSize='large' style={{ color: '#003459', marginBottom: '10px', fontSize: '2.5rem' }} />
            <Typography variant='subtitle1' gutterBottom>
              Nutrition
            </Typography>
            <Typography variant='body2'>
              Fuel your run with balanced meals and snacks. Opt for carbohydrates, proteins, and healthy fats to
              sustain energy.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', background: '#D9D9D9' }}>
            <HotelIcon fontSize='large' style={{ color: '#003459', marginBottom: '10px', fontSize: '2.5rem' }} />
            <Typography variant='subtitle1' gutterBottom>
              Recovery
            </Typography>
            <Typography variant='body2'>
              Adequate rest and recovery are essential for muscle repair and growth. Don't forget to hydrate and get
              enough sleep.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant='h4' gutterBottom style={{ marginTop: '40px' }}>
        Track Your Run
      </Typography>
      <Box
        width='60%'
        bgcolor='#D9D9D9'
        borderRadius='20px'
        padding='20px'
        marginTop='20px'
        boxShadow='0px 4px 10px rgba(0, 0, 0, 0.3)'
      >
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label='Distance (miles)'
            variant='outlined'
            name='distance'
            value={runningData.distance}
            onChange={handleInputChange}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            fullWidth
            label='Duration (minutes)'
            variant='outlined'
            name='duration'
            value={runningData.duration}
            onChange={handleInputChange}
            style={{ marginBottom: '20px' }}
          />
          <Button variant='contained' type='submit' style={{ background: '#007EA7', color: '#FFFFFF' }}>
            Save Run
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Running;
