import React from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import {
  Home,
  NavigateBefore,
  NavigateNext,
  Settings,
} from '@mui/icons-material';

export default function Head() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton>
          <Home />
        </IconButton>
      </Grid>
      <Grid item>
        <TextField variant="outlined" size="small" disabled value="과목명" />
        <TextField
          variant="outlined"
          size="small"
          disabled
          InputProps={{
            startAdornment: <NavigateBefore />,
            endAdornment: <NavigateNext />,
          }}
        />
      </Grid>
      <Grid item>
        <TextField variant="outlined" size="small" disabled value="남은 시간" />
        <IconButton>
          <Settings />
        </IconButton>
      </Grid>
    </Grid>
  );
}
