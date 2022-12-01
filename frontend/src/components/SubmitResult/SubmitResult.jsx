import React from 'react';
import { Grid, Tab, Tabs } from '@mui/material';

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
  tabs: {
    minHeight: 0,
  },
  tab: {
    minWidth: 0,
    minHeight: 0,
    p: 1,
  },
};

export default function SubmitResult() {
  return (
    <Grid container direction="column" sx={style.container}>
      <Grid item sx={style.header}>
        제출 결과
      </Grid>
      <Grid item>
        종합 점수
      </Grid>
      <Grid item>
        <Tabs variant="fullWidth" sx={style.tabs}>
          <Tab wrapped sx={style.tab} label="기능" />
          <Tab wrapped sx={style.tab} label="효율" />
          <Tab wrapped sx={style.tab} label="가독성" />
        </Tabs>
      </Grid>
      <Grid item>
        점수
      </Grid>
    </Grid>
  );
}
