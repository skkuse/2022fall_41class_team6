import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { Grid, IconButton, Button, Input} from '@mui/material';
import {
  Folder,
  Refresh,
  ContentCopy,
  FileDownload,
  Save,
} from '@mui/icons-material';
import { saveAs } from 'file-saver';

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

    // 저장된 코드 불러오기 기능
    // (code saved Id를 array에 넣고 버튼 누르면 해당 칸에서 id값 빼와서 접근하는 방식)

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

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }

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

  // 코드 불러오기 기능
  const fileInput = useRef();

  const handleClickButton = () => {
    fileInput.current.click();
  }

  const handleChange = e => {
    const fileObj = e.target.files[0];
    if(fileObj){
      
    }
    const reader = new FileReader();
    reader.onload = () => {
      editorRef.current.setValue(String(reader.result));
    }
    reader.readAsText(e.target.files[0], 'utf-8');
  };

  // 코드 초기화 기능
  function codeRefresh() {
    editorRef.current.setValue(String(question?.skeletonCode));
  }

  // 코드 복사 기능
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
  
  // 코드 다운로드 기능
  function downloadAsFile(){
    var text = String(editorRef.current.getValue());
    console.log(text);
    var blob = new Blob([text], {type:"text/plain;charset=utf-8"});
    saveAs(blob, 'temp.py');
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
          onClick={() => codeSavedBtn(1)}  
          disabled = {codeSavedIdList[0] ? false : true} >
            1
          </Button>
          <Button 
          variant="contained" 
          size="small" 
          sx={style.saveButton}
          onClick={() => codeSavedBtn(2)}
          disabled = {codeSavedIdList[1] ? false : true} >
            2
          </Button>
          <Button 
          variant="contained" 
          size="small" 
          sx={style.saveButton}
          onClick={() => codeSavedBtn(3)}
          disabled = {codeSavedIdList[2] ? false : true} >
            3
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Editor
          height="calc(100vh - 151px)"
          defaultLanguage="python"
          value={question?.skeletonCode || ''}
          onMount={handleEditorDidMount}
        />
      </Grid>
      <Grid item sx={style.itemBottom}>
        <Grid container sx={style.container}>
          <Grid item>
            <IconButton sx={style.iconButton} onClick={handleClickButton}>
              <Folder />
            </IconButton>
            <Input 
              type='file' 
              style={{display:'none'}}
              onChange={handleChange} 
              inputRef={fileInput}
            />
            <IconButton sx={style.iconButton} onClick={codeRefresh}>
              <Refresh />
            </IconButton>
            <IconButton sx={style.iconButton} onClick={codeCopy}>
              <ContentCopy />
            </IconButton>
            <IconButton sx={style.iconButton} onClick={downloadAsFile}>
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
