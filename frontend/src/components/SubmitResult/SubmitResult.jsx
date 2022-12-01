import React from 'react';
import { Grid } from '@mui/material';

const style = {
  container: {
    height: 'calc(100vh - 50px)',
    flexWrap: 'nowrap',
    overflow: 'auto',
  },
  header: {
    height: 40,
    pl: 1,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    bgcolor: 'primary.main',
  },
};

export default function SubmitResult() {
  return (
    <Grid container direction="column" sx={style.container}>
      <Grid item sx={style.header}>
        제출 결과
      </Grid>
    </Grid>
  );
}
