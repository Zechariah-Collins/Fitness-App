import React, { useState, useEffect } from 'react';
import {Box, Button, TextField, TextareaAutosize, createTheme} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@emotion/react';
import '../styles/Goals.css'

const EditableBox = (props) => {
  
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.item.title);
  const [description, setDescription] = useState(props.item.description);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

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
              onClick={handleEditClick}
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
        </Box>
          <h2>{title}</h2>
          {description}
      </Box>
      )}
    </Box>
  );
};
 export default EditableBox;