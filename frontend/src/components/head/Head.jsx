import React from 'react';
import { Grid, IconButton } from '@mui/material';
import { Home, Settings } from '@mui/icons-material';

export default function Head() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton>
          <Home />
        </IconButton>
      </Grid>
      <Grid item>Question</Grid>
      <Grid item>
        <IconButton>
          <Settings />
        </IconButton>
      </Grid>
    </Grid>
  );
}
