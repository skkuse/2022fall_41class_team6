import React from 'react';
import { Grid } from '@mui/material';

export default function Head() {
  return (
    <Grid container>
      <Grid item xs={3}>Home</Grid>
      <Grid item xs={6}>Question</Grid>
      <Grid item xs={3}>Setting</Grid>
    </Grid>
  );
}
