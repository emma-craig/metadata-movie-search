import { Stack, Typography } from '@mui/material';
import React from 'react';

const EmptyState = ({ message }: { message: string }) => {
  return (
    <Stack
    data-testid ='empty-state-container'
      alignItems="center"
      flex={1}
      justifyContent="center"
      gap={3}
      marginTop={8}>
      <Typography variant="h6">{message}</Typography>
    </Stack>
  );
};

export default EmptyState;
