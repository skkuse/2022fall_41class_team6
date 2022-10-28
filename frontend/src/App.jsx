import React, { useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import { Head } from './components/head';

export default function App() {
  const [leftWidth, setLeftWidth] = useState(4);
  const [rightWidth, setRightWidth] = useState(4);

  const toggleLeft = () => {
    setLeftWidth(leftWidth === 4 ? 1 : 4);
  };

  const toggleRight = () => {
    setRightWidth(rightWidth === 4 ? 1 : 4);
  };

  return (
    <CssBaseline>
      <Head />
      <Grid container>
        <Grid item xs={leftWidth}>
          <h1>Left</h1>
        </Grid>
        <Grid item xs={12 - leftWidth - rightWidth}>
          <h1>Center</h1>
        </Grid>
        <Grid item xs={rightWidth}>
          <h1>Right</h1>
        </Grid>
      </Grid>
    </CssBaseline>
  );
}
