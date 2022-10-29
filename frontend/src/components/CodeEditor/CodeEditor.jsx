import React from 'react';
import Editor from '@monaco-editor/react';
import { Grid, IconButton, Button } from '@mui/material';
import {
  Folder,
  Refresh,
  ContentCopy,
  FileDownload,
  Save,
} from '@mui/icons-material';

const style = {
  container: {
    height: 50,
    px: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  saveIcon: {
    mr: 1,
    color: 'primary.main',
  },
  saveButton: {
    m: 0.5,
    minWidth: 30,
    height: 30,
  },
  iconButton: {
    color: 'primary.main',
  },
  button: {
    mx: 0.5,
  },
  submitButton: {
    ml: 1,
  },
};

export default function CodeEditor() {
  return (
    <Grid container direction="column" justifyContent="center">
      <Grid container sx={style.container}>
        <Grid item>코드 입력</Grid>
        <Grid item sx={style.item}>
          <Save sx={style.saveIcon} />
          <Button variant="contained" size="small" sx={style.saveButton}>
            1
          </Button>
          <Button variant="contained" size="small" sx={style.saveButton}>
            2
          </Button>
          <Button variant="contained" size="small" sx={style.saveButton}>
            3
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Editor
          height="calc(100vh - 150px)"
          defaultLanguage="javascript"
          defaultValue="// some comment"
        />
      </Grid>
      <Grid item>
        <Grid container sx={style.container}>
          <Grid item>
            <IconButton sx={style.iconButton}>
              <Folder />
            </IconButton>
            <IconButton sx={style.iconButton}>
              <Refresh />
            </IconButton>
            <IconButton sx={style.iconButton}>
              <ContentCopy />
            </IconButton>
            <IconButton sx={style.iconButton}>
              <FileDownload />
            </IconButton>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="small" sx={style.button}>
              실행
            </Button>
            <Button variant="outlined" size="small" sx={style.button}>
              저장
            </Button>
            <Button variant="contained" size="small" sx={style.submitButton}>
              제출
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
