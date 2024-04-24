import React from 'react';

import { Stack, Typography } from '@mui/material';

const EmptyState = ({ message }: { message: string }) => {
  return (
    <Stack
      alignItems="center"
      aria-label='empty state page when no results are found in the search'
      flex={1}
      justifyContent="center"
      gap={3}
      marginTop={8}>
      <Typography variant="h6">{message}</Typography>
    </Stack>
  );
};

export default EmptyState;
