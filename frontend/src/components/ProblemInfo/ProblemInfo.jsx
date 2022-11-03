import { Grid } from '@mui/material';
import React from 'react';

const style = {
  container: {
    height: 'calc(100vh - 50px)',
    flexWrap: 'nowrap',
    overflow: 'auto',
  },
  header: {
    height: 50,
    pl: 1,
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
    px: 1,
    py: 2,
  },
};

export default function ProblemInfo() {
  return (
    <Grid container direction="column" sx={style.container}>
      <Grid item sx={style.header}>
        문제 & 참조/제약사항
      </Grid>
      <Grid item sx={style.subheader}>문제</Grid>
      <Grid item sx={style.content}>
        문제
      </Grid>
      <Grid item sx={style.subheader}>참조/제약사항</Grid>
      <Grid item sx={style.content}>
        참조/제약사항
      </Grid>
      <Grid item sx={style.header}>
        테스트케이스
      </Grid>
      <Grid item sx={style.subheader}>테스트케이스 1</Grid>
      <Grid item container>
        <Grid item xs={6}>
          Input
        </Grid>
        <Grid item xs={6}>
          Output
        </Grid>
      </Grid>
    </Grid>
  );
}
