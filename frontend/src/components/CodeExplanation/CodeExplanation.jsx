import React, { useState } from 'react';
import { Backdrop, CircularProgress, Grid } from '@mui/material';

const style = {
  container: {
    position: 'relative',
    height: 221,
    flexWrap: 'nowrap',
    overflow: 'auto',
  },
  header: {
    height: 40,
    px: 1,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    bgcolor: 'primary.main',
  },
  backdrop: {
    position: 'absolute',
    top: 40,
    height: 181,
    zIndex: 1,
  },
};

export default function CodeExplanation() {
  const [loading, setLoading] = useState(false);

  return (
    <Grid container direction="column" sx={style.container}>
      <Grid item sx={style.header}>
        코드 설명
      </Grid>
      <Backdrop open={loading} sx={style.backdrop}>
        <CircularProgress />
      </Backdrop>
      <Grid item>
        코드 설명
      </Grid>
    </Grid>
  );
}
