import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { Grid, IconButton, Button} from '@mui/material';
import {
  Folder,
  Refresh,
  ContentCopy,
  FileDownload,
  Save,
} from '@mui/icons-material';
import { useCallback } from 'react';

const style = {
  container: {
    height: 50,
    px: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTopLeft: {
    pl: 1,
    color: 'primary.main',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemTopRight: {
    display: 'flex',
    alignItems: 'center',
  },
  saveIcon: {
    mr: 1,
    color: 'primary.main',
  },
  saveButton: {
    mx: 0.5,
    minWidth: 30,
    height: 30,
  },
  itemBottom: {
    borderTop: '1px solid #0f151a',
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
  modalPopup: {
    width: 300,
    height : 50,
    padding: 20,
    backgroundColor: '#61dafb',
    textAlign: 'left',
  },
};

export default function CodeEditor({ 
  question,
  questionid,
  setCodeSavedList,
  codeSavedList,
  codesaved,
  codeSavedIdList,
  setCodeSavedIdList,
}) {
  useEffect(() => {
    const newCodeSavedList = {};
    const newCodeSavedIdList = {};
    let i = 0;
    axios.get('/code_saved').then(({ data }) => {
      data.forEach(({ code_savedId, questionId, code}) => {
        if(Number(questionid) === questionId){
          newCodeSavedList[code_savedId]=code;
          newCodeSavedIdList[i++]=code_savedId;
        }
      });
      setCodeSavedList(newCodeSavedList);
      setCodeSavedIdList(newCodeSavedIdList);
    });
  },[questionid]);

  //code saved Id를 array에 넣고 버튼 누르면 해당 칸에서 id값 빼와서 접근

  const editorRef = useRef(null);

  function codeSavedBtn(num){
    let id = Number(codeSavedIdList[num-1]);
    if (codeSavedList[id]){
      editorRef.current.setValue(String(codeSavedList[id]));
    }
    else {
      alert("저장된 코드가 없습니다.");
    }
  }

  function handleSaveCode(){
    let val = String(editorRef.current.getValue());
    axios.post('/code_saved/', {
      questionid,
      val,
    },
    { headers : {
      "Content-Type":"application/json", 
      'Accept':'application/json'
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });

  }

  function codeRefresh() {
    editorRef.current.setValue(String(question?.skeletonCode));
  }

  function codeCopy() {
    let text = String(editorRef.current.getValue());
    if (navigator.clipboard){
      navigator.clipboard.writeText(text).then(()=>{
        alert("클립보드에 복사되었습니다.");
      })
      .catch(() => {
        alert("복사를 다시 시도해주세요.");
      });
    }
  }

  function codeLoad() {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[i]);
  }

  return (
    <Grid container direction="column">
      <Grid container sx={style.container}>
        <Grid item sx={style.itemTopLeft}>
          코드 입력
        </Grid>
        <Grid item sx={style.itemTopRight}>
          <Save sx={style.saveIcon} />
          <Button 
          variant="contained" 
          size="small" 
          sx={style.saveButton}
          onClick={() => codeSavedBtn(1)}  >
            1
          </Button>
          <Button 
          variant="contained" 
          size="small" 
          sx={style.saveButton}
          onClick={() => codeSavedBtn(2)}>
            2
          </Button>
          <Button 
          variant="contained" 
          size="small" 
          sx={style.saveButton}
          onClick={() => codeSavedBtn(3)}>
            3
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Editor
          height="calc(100vh - 151px)"
          defaultLanguage="python"
          value={question?.skeletonCode || ''}
          
        />
      </Grid>
      <Grid item sx={style.itemBottom}>
        <Grid container sx={style.container}>
          <Grid item>
            <IconButton sx={style.iconButton} onClick={codeLoad}>
              <Folder />
            </IconButton>
            <IconButton sx={style.iconButton} onClick={codeRefresh}>
              <Refresh />
            </IconButton>
            <IconButton sx={style.iconButton} onClick={codeCopy}>
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
            <Button variant="outlined" size="small" sx={style.button} onClick={handleSaveCode}>
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
