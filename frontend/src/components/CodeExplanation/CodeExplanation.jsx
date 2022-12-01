import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Backdrop, CircularProgress, Grid } from '@mui/material';

const style = {
  container: {
    position: 'relative',
    height: 341,
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
  content: {
    p: 1,
    fontSize: 14,
    whiteSpace: 'pre-wrap',
  },
  backdrop: {
    position: 'absolute',
    top: 40,
    height: 301,
    zIndex: 1,
  },
};

export default function CodeExplanation() {
  const [loading, setLoading] = useState(true);
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    axios.get('/code_submitted/1/1/explain').then(({ data }) => {
      setExplanation(data);
      setLoading(false);
    });
  }, []);

  return (
    <Grid container direction="column" sx={style.container}>
      <Grid item sx={style.header}>
        코드 설명
      </Grid>
      <Backdrop open={loading} sx={style.backdrop}>
        <CircularProgress />
      </Backdrop>
      <Grid item sx={style.content}>{explanation}</Grid>
    </Grid>
  );
}
