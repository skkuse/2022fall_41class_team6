/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  createTheme, CssBaseline, Grid, ThemeProvider,
} from '@mui/material';
import { Head } from './components/Head';
import { CodeEditor } from './components/CodeEditor';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f151a',
    },
  },
});

const style = {
  container: {
    height: 'calc(100vh - 50px)',
  },
  itemCenter: {
    borderLeft: '1px solid #0f151a',
    borderRight: '1px solid #0f151a',
  },
};

export default function App() {
  const [leftWidth, setLeftWidth] = useState(3);
  const [rightWidth, setRightWidth] = useState(3);

  const toggleLeftWidth = () => {
    setLeftWidth(leftWidth === 3 ? 1 : 3);
  };

  const toggleRightWidth = () => {
    setRightWidth(rightWidth === 3 ? 1 : 3);
  };

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Head />
        <Grid container sx={style.container}>
          <Grid item xs={leftWidth}>
            <h1>Left</h1>
          </Grid>
          <Grid item xs={12 - leftWidth - rightWidth} sx={style.itemCenter}>
            <CodeEditor />
          </Grid>
          <Grid item xs={rightWidth}>
            <h1>Right</h1>
          </Grid>
        </Grid>
      </ThemeProvider>
    </CssBaseline>
  );
}
