import { Stack, Typography } from '@mui/material';
import React from 'react';
import LiveTvIcon from '@mui/icons-material/LiveTv';

const EmptyState = ({ message }: { message: string }) => {
  return (
    <Stack
      alignItems="center"
      flex={1}
      justifyContent="center"
      gap={3}
      marginTop={8}>
      <Typography variant="h6">{message}</Typography>
      <LiveTvIcon />
    </Stack>
  );
};

export default EmptyState;
