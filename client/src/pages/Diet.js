import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';

const token = localStorage.getItem('jwtToken')

const DietPage = () => {
  const [caloricGoal, setCaloricGoal] = useState('');
  const [proteinGoal, setProteinGoal] = useState('');
  const [carbsGoal, setCarbsGoal] = useState('');
  const [fatGoal, setFatGoal] = useState('');

  const [dailyCalories, setDailyCalories] = useState('');
  const [dailyProtein, setDailyProtein] = useState('');
  const [dailyCarbs, setDailyCarbs] = useState('');
  const [dailyFat, setDailyFat] = useState('');

  const handleSubmitGoals = (e) => {
    e.preventDefault();
  
    // Check if any of the fields are empty
    if (!caloricGoal || !proteinGoal || !carbsGoal || !fatGoal) {
      alert('Please fill in all fields');
      return;
    }
  
    // Handle form submission, e.g., send data to backend
    console.log('Goals Form submitted:', { caloricGoal, proteinGoal, carbsGoal, fatGoal });
  };
  
  const handleSubmitIntake = (e) => {
    e.preventDefault();
  
    // Check if any of the fields are empty
    if (!dailyCalories || !dailyProtein || !dailyCarbs || !dailyFat) {
      alert('Please fill in all fields');
      return;
    }
  
    // Handle form submission, e.g., send data to backend
    calculateDailyIntake();
    console.log('Intake Form submitted:', { dailyCalories, dailyProtein, dailyCarbs, dailyFat });
  };
  

  const calculateDailyIntake = () => {
    const healthData = [
        [dailyCalories, caloricGoal],
        [dailyProtein, proteinGoal],
        [dailyCarbs, carbsGoal],
        [dailyFat, fatGoal],
    ]
    for (let i = 0; i < healthData.length; i++) {
        if (healthData[i][0] > healthData[i][1]) {
            const difference = (healthData[i][0] - healthData[i][1]) * 2 ;
            healthData[i] = (healthData[i][1] - difference) / healthData[i][1]
        }
        else {
            healthData[i] = healthData[i][0] / healthData[i][1]
        }
        
    }
    const percentage = (healthData.reduce((acc, curr) => acc + curr, 0) / 4).toFixed(2);
    const points = percentage * 100;
    console.log(points)
    fetch('http://localhost:3001/points/diet', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({points})
    },[])

    
  }
  return (
    <StyledBox>
      <SectionTitle variant="h4">
        Diet Goals
      </SectionTitle>
      <StyledSection>
        <StyledSubBox>
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
            Set Your Goals
          </Typography>
          <StyledForm onSubmit={handleSubmitGoals}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Daily Caloric Goal (kcal)"
                  variant="outlined"
                  fullWidth
                  value={caloricGoal}
                  onChange={(e) => setCaloricGoal(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Protein Goal (g)"
                  variant="outlined"
                  fullWidth
                  value={proteinGoal}
                  onChange={(e) => setProteinGoal(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Carbs Goal (g)"
                  variant="outlined"
                  fullWidth
                  value={carbsGoal}
                  onChange={(e) => setCarbsGoal(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fat Goal (g)"
                  variant="outlined"
                  fullWidth
                  value={fatGoal}
                  onChange={(e) => setFatGoal(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit Goals
                </Button>
              </Grid>
            </Grid>
          </StyledForm>
        </StyledSubBox>
      </StyledSection>
      <Divider sx={{ margin: '2rem 0' }} />
      <SectionTitle variant="h4">
        Input Your Daily Intake
      </SectionTitle>
      <StyledInputBox>
        <StyledForm onSubmit={handleSubmitIntake}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Daily Calories (kcal)"
                variant="outlined"
                fullWidth
                value={dailyCalories}
                onChange={(e) => setDailyCalories(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Daily Protein (g)"
                variant="outlined"
                fullWidth
                value={dailyProtein}
                onChange={(e) => setDailyProtein(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Daily Carbs (g)"
                variant="outlined"
                fullWidth
                value={dailyCarbs}
                onChange={(e) => setDailyCarbs(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Daily Fat (g)"
                variant="outlined"
                fullWidth
                value={dailyFat}
                onChange={(e) => setDailyFat(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit Intake
              </Button>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledInputBox>
    </StyledBox>
  );
};

const StyledBox = styled(Box)({
  flex: 6,
  backgroundColor: '#003459',
  padding: '2rem',
  borderRadius: '1rem',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '2rem',
});

const SectionTitle = styled(Typography)({
  color: '#ffffff',
  marginBottom: '1rem',
});

const StyledSection = styled(Box)({
  backgroundColor: '#D9D9D9',
  padding: '1rem',
  borderRadius: '1rem',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  marginBottom: '2rem',
});

const StyledSubBox = styled(Box)({
  backgroundColor: '#D9D9D9',
  padding: '1rem',
  borderRadius: '1rem',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  marginBottom: '2rem',
});

const StyledInputBox = styled(Box)({
  backgroundColor: '#D9D9D9',
  padding: '2rem',
  borderRadius: '1rem',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const StyledForm = styled('form')({
  width: '100%',
});

export default DietPage;
