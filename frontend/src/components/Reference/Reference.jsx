import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Backdrop, Box, CircularProgress, Grid,
} from '@mui/material';

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
  subheader: {
    height: 30,
    pl: 1,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: 'white',
    bgcolor: 'gray',
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

export default function Reference() {
  const [loading, setLoading] = useState(true);
  const [reference, setReference] = useState({});

  useEffect(() => {
    axios.get('/reference/4').then(({ data }) => {
      setReference(data);
      setLoading(false);
    });
  }, []);

  return (
    <Grid container direction="column" sx={style.container}>
      <Grid item sx={style.header}>
        참고 자료
      </Grid>
      <Backdrop open={loading} sx={style.backdrop}>
        <CircularProgress />
      </Backdrop>
      <Grid item sx={style.subheader}>
        영상 추천
      </Grid>
      <Grid item sx={style.content}>
        <a href={reference?.video?.[1]}>{reference?.video?.[0]}</a>
      </Grid>
      <Grid item sx={style.subheader}>
        문제 추천
      </Grid>
      <Grid item sx={style.content}>
        <a href={reference?.question?.[1]}>{reference?.question?.[0]}</a>
      </Grid>
      <Grid item sx={style.subheader}>
        학습 자로 추천
      </Grid>
      <Grid item sx={style.content}>
        {reference?.learning?.map(([title, link]) => (
          <a key={title} href={link}>
            {title}
          </a>
        ))}
      </Grid>
    </Grid>
  );
}
