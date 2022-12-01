import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Grid, IconButton, Popover,
} from '@mui/material';
import { Grading } from '@mui/icons-material';

const SCORE_HEADER = {
  line_of_codes: 'Line of Codes',
  halstead_difficulty: 'Halstead Difficulty',
  dataflow_complexity: 'Dataflow Complexity',
  controlflow_complexity: 'Controlflow Complexity',
};

const style = {
  container: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
  },
  key: {
    width: 160,
  },
  score: {
    width: 40,
  },
};

export default function EfficiencyScore() {
  const [score, setScore] = useState({});
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

  useEffect(() => {
    axios.get('/code_submitted/1/1/efficiency').then(({ data }) => {
      setScore(data);
    });
  }, []);

  return (
    <Grid container direction="column">
      {Object.keys(score).map((key) => (
        <Grid key={key} item container sx={style.container}>
          <Grid item sx={style.key}>
            {SCORE_HEADER[key]}
          </Grid>
          <Grid item sx={style.score}>
            {score[key][0]}
            점
          </Grid>
          <Grid item>
            <IconButton
              size="small"
              onClick={(event) => handlePopoverOpen(event, key)}
            >
              <Grading />
            </IconButton>
            <Popover
              anchorEl={anchorEl}
              open={open === key}
              onClose={handlePopoverClose}
              anchorOrigin={{ vertical: 'bottom' }}
            >
              <Box sx={{ p: 1 }}>
                <Box>
                  내가 제출한 코드 -
                  {' '}
                  {score[key][2]}
                </Box>
                <Box>
                  정답 코드 -
                  {' '}
                  {score[key][1]}
                </Box>
              </Box>
            </Popover>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
