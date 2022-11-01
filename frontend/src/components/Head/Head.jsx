/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import {
  Home,
  NavigateBefore,
  NavigateNext,
  Settings,
} from '@mui/icons-material';

const style = {
  container: {
    alignItems: 'center',
    height: 50,
    bgcolor: 'primary.main',
  },
  itemLeft: {
    pl: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRight: {
    pr: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textField: {
    mx: 0.5,
  },
  iconButton: {
    color: 'primary.contrastText',
  },
  Input: {
    bgcolor: 'primary.contrastText',
  },
  input: {
    p: 0.5,
    fontSize: 14,
    textAlign: 'center',
  },
};

export default function Head() {
  return (
    <Grid container sx={style.container}>
      <Grid item xs={3} sx={style.itemLeft}>
        <IconButton sx={style.iconButton}>
          <Home />
        </IconButton>
      </Grid>
      <Grid item xs={6} sx={style.itemCenter}>
        <TextField
          variant="outlined"
          size="small"
          disabled
          value="과목명"
          InputProps={{ sx: style.Input }}
          inputProps={{ sx: style.input }}
          sx={style.textField}
        />
        <TextField
          variant="outlined"
          size="small"
          disabled
          InputProps={{
            sx: style.Input,
            startAdornment: <NavigateBefore />,
            endAdornment: <NavigateNext />,
          }}
          inputProps={{ sx: style.input }}
          sx={style.textField}
        />
      </Grid>
      <Grid item xs={3} sx={style.itemRight}>
        <TextField
          variant="outlined"
          size="small"
          disabled
          value="남은 시간"
          InputProps={{ sx: style.Input }}
          inputProps={{ sx: style.input }}
          sx={style.textField}
        />
        <IconButton sx={style.iconButton}>
          <Settings />
        </IconButton>
      </Grid>
    </Grid>
  );
}
