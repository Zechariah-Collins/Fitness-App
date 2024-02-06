import React, { useState, useEffect } from 'react';
import {Box, Button, TextField, TextareaAutosize, createTheme} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import '../styles/Goals.css'

const EditableBox = (props) => {
  
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.item.title);
  const [description, setDescription] = useState(props.item.description);
  const [goalId, setGoalId] = useState(props.item.goal_id);
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const updateGoal = async (e) => {
    handleEditClick();
    e.preventDefault();
    const data = { title, description, goalId };

    await fetch(`http://localhost:3001/goals`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };
 
  const deleteGoal = async (e) => {
    await fetch(`http://localhost:3001/goals/${goalId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return (
    <Box className='scroll'
      display='flex'
      sx={{
        backgroundColor: '#D9D9D9',
        width: '35%',
        height: '200px',
        borderRadius: '10px',
        padding:'10px',
        mt: '50px',
        ml: '50px',
        mb: '50px',
      }}>
      
      {editMode ? (
        <Box>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              variant='contained' 
              onClick={updateGoal}
              sx={{
                ":hover" : {cursor: 'pointer'},
                height: '30px',
                width:'60px',
              }}
            >
              Done
            </Button>
          </Box>
          <TextField
            value={title}
            onChange={handleTitleChange}
            label="Title"
            variant="outlined"
            margin="dense"
            sx={{
              width:'auto'
            }}
          />
          <TextareaAutosize
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            rowsMin={3}
            rowsMax={5}
          />
        </Box>
      ) : (
        <Box display='flex' width='100%' flexDirection='column'>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              variant='contained'
              onClick={handleEditClick}
              sx={{
                ":hover" : {cursor: 'pointer'},
                height: '30px',
                width:'60px',
                backgroundColor: '#003459',
                color: '#D9D9D9',
              }}
            >
              Edit
            </Button>
            <DeleteIcon
              onClick={deleteGoal}
              sx={{
                color: 'black',
                ":hover" : {cursor: 'pointer', color: '#C03221'},
                height: '30px',
                width:'40px',
              }}
            >
              Delete
            </DeleteIcon> 
        </Box>
          <h2>{title}</h2>
          {description}
      </Box>
      )}
    </Box>
  );
};
 export default EditableBox;