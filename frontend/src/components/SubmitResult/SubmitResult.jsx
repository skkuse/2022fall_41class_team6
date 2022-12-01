import React, { useState } from 'react';
import { Grid, Tab, Tabs } from '@mui/material';
import EfficiencyScore from './EfficiencyScore';

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
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_, newSelectedTab) => {
    setSelectedTab(newSelectedTab);
  };

  return (
    <Grid container direction="column" sx={style.container}>
      <Grid item sx={style.header}>
        제출 결과
      </Grid>
      <Grid item>종합 점수</Grid>
      <Grid item>
        <Tabs
          variant="fullWidth"
          sx={style.tabs}
          value={selectedTab}
          onChange={handleTabChange}
        >
          <Tab wrapped sx={style.tab} label="기능" />
          <Tab wrapped sx={style.tab} label="효율" />
          <Tab wrapped sx={style.tab} label="가독성" />
        </Tabs>
      </Grid>
      <Grid item>
        {selectedTab === 0 && <div>기능</div>}
        {selectedTab === 1 && <EfficiencyScore />}
        {selectedTab === 2 && <div>가독성</div>}
      </Grid>
    </Grid>
  );
}
