import React from 'react';
import { Grid } from '@mui/material';

const style = {
  container: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
  },
  key: {
    width: 100,
  },
  score: {
    width: 40,
    fontWeight: 'bold',
  },
};

export default function FunctionalityScore({ score }) {
  return (
    <Grid container direction="column">
      {score.map((result, index) => (
        <Grid key={index} item container sx={style.container}>
          <Grid item sx={style.key}>
            테스트케이스
            {' '}
            {index + 1}
          </Grid>
          <Grid item sx={{ ...style.score, color: result === '.' ? 'green' : 'red' }}>
            {result === '.' ? '통과' : '실패'}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
