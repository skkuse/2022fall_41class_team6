import React from 'react';
import Editor from '@monaco-editor/react';
import {
  Grid, IconButton, Button, Box,
} from '@mui/material';
import {
  Folder,
  Refresh,
  ContentCopy,
  FileDownload,
  Save,
} from '@mui/icons-material';

export default function CodeEditor() {
  return (
    <Grid container direction="column" justifyContent="center">
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={4.5}>
          <p>코드 입력</p>
        </Grid>
        <Grid item>
          <IconButton>
            <Save />
          </IconButton>
        </Grid>
        <Grid item>
          <Button variant="contained" size="small">
            1
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" size="small">
            2
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" size="small">
            3
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Editor
          height="70vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
        />
      </Grid>
      <Grid item>
        <Box
          sx={{
            maxwidth: '100%',
            border: '1px solid black',
          }}
        >
          <Grid container alignItems="center">
            <Grid item>
              <IconButton>
                <Folder />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <Refresh />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <ContentCopy />
              </IconButton>
            </Grid>
            <Grid item xs={2.5}>
              <IconButton>
                <FileDownload />
              </IconButton>
            </Grid>
            <Grid item>
              <Button variant="contained" size="small">
                실행
              </Button>
            </Grid>
            <Grid item xs={2.2}>
              <Button variant="contained" size="small">
                저장
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" size="small">
                제출
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
