import React from 'react'
import { CircularProgress, Box } from '@mui/material'


const Loading = () => (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
)

export { Loading }