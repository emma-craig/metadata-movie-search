import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => (
  <Box
    aria-label="component to show while loading"
    sx={{
      left: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    }}>
    <CircularProgress color="secondary" />
  </Box>
);

export default Loading;
