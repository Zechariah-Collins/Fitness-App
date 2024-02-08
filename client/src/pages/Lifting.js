import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';

const token = localStorage.getItem('jwtToken')

const workouts = [
  { name: 'Squats', points: 50, category: 'Legs' },
  { name: 'Deadlifts', points: 70, category: 'Legs' },
  { name: 'Bench Press', points: 60, category: 'Upper Body' },
  { name: 'Shoulder Press', points: 55, category: 'Upper Body' },
  { name: 'Pull-ups', points: 65, category: 'Upper Body' },
  { name: 'Barbell Rows', points: 65, category: 'Upper Body' },
  { name: 'Burpees', points: 75, category: 'Full Body' },
  { name: 'Clean and Jerk', points: 80, category: 'Full Body' },
];
const today = new Date();
  const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  // Calculate the difference in days between today and the beginning of the week (Sunday)
  const diff = today.getDate() - dayOfWeek;

  // Create a new date object for the beginning of the week
  const beginningOfWeek = new Date(today.setDate(diff));

  // Set the time to the start of the day (midnight)
  

 
const LiftingPage = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
  };

  const isWorkoutSelected = (workout) => {
    return selectedWorkout === workout;
  };

  const handleSubmit = () => {
    if (selectedWorkout) {
      // Perform action to submit selected workout
      console.log('Submitting workout:', selectedWorkout);
      setSubmitted(true); // Mark as submitted
      const points = selectedWorkout.points;
      fetch('http://localhost:3001/points/lift', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({points})
    },[])
    } else {
      console.log('No workout selected.');
    }
  };

  const handleRemoveWorkout = () => {
    setSelectedWorkout(null);
    setSubmitted(false);
  };

  return (
    <StyledBox>
      <StyledTitle variant="h4">
        Choose Your Workout
      </StyledTitle>
      {workouts.map((workout, index) => (
        <Box key={index} sx={{ marginBottom: '1rem', textAlign: 'center' }}>
          <Button
            variant="contained"
            color={isWorkoutSelected(workout) ? 'primary' : 'secondary'}
            onClick={() => handleWorkoutClick(workout)}
            sx={{
              borderRadius: '999px',
              padding: '1rem 2rem',
              backgroundColor: isWorkoutSelected(workout) ? '#000000' : '#007EA7',
              '&:hover': {
                backgroundColor: isWorkoutSelected(workout) ? '#000000' : '#000000',
              },
            }}
          >
            <Typography variant="subtitle1" sx={{ color: isWorkoutSelected(workout) ? '#ffffff' : '#ffffff' }}>
              {workout.name} ({workout.points} Points)
            </Typography>
          </Button>
        </Box>
      ))}
      {selectedWorkout && (
        <Typography variant="body1" sx={{ color: '#ffffff', marginTop: '2rem' }}>
          You selected: {selectedWorkout.name}
        </Typography>
      )}
      {submitted && (
        <Button variant="contained" color="secondary" onClick={handleRemoveWorkout} sx={{ marginTop: '2rem' }}>
          Remove Workout
        </Button>
      )}
      {!submitted && selectedWorkout && (
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: '2rem' }}>
          Submit Workout
        </Button>
      )}
    </StyledBox>
  );
};

const StyledBox = styled(Box)({
  flex: 6,
  backgroundColor: '#003459',
  padding: '2rem',
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(8px)',
});

const StyledTitle = styled(Typography)({
  color: '#ffffff',
  marginBottom: '2rem',
});

export default LiftingPage;
