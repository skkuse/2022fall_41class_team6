import React, { useState } from 'react';
import {
  Box, Grid, IconButton, Popover,
} from '@mui/material';
import { Grading } from '@mui/icons-material';

const style = {
  container: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
  },
  key: {
    width: 90,
  },
  score: {
    width: 40,
  },
};

export default function VisibilityScore({ score }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState('');

  const handlePopoverOpen = (event, key) => {
    setAnchorEl(event.currentTarget);
    setOpen(key);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpen('');
  };

  return (
    <Grid container direction="column">
      {Object.keys(score).map((key) => (
        <Grid key={key} item container sx={style.container}>
          <Grid item sx={style.key}>
            {key}
          </Grid>
          <Grid item sx={style.score}>
            {score[key][0]}
            점
          </Grid>
          <Grid item>
            <IconButton
              size="small"
              disabled={score[key].length === 1}
              onClick={(event) => handlePopoverOpen(event, key)}
            >
              <Grading />
            </IconButton>
            {score[key].length > 1 && (
              <Popover
                anchorEl={anchorEl}
                open={open === key}
                onClose={handlePopoverClose}
                anchorOrigin={{ vertical: 'bottom' }}
              >
                <Box sx={{ p: 1 }}>
                  {score[key].slice(1).map((item) => (
                    <Box key={item}>{item}</Box>
                  ))}
                </Box>
              </Popover>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
