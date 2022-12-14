import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import {
  Grid, IconButton, Button, Input, Modal, Box, Typography,
} from '@mui/material';
import {
  Folder, Refresh, ContentCopy, FileDownload, Save,
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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
};

export default function CodeEditor({
  question,
  questionid,
  setCodeSavedList,
  codeSavedList,
  // codesaved,
  codeSavedIdList,
  setCodeSavedIdList,
  editorRef,
  setSubmittedCodeId,
  setErrorCode,
  errorCode,
  submittedCodeId,
}) {
  let [cnt, letCnt] = useState(0);
  let [change, letChange] = useState(0);

  // const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    console.log(JSON.parse(localStorage.getItem('currentCode')));
  }

  // 코드 초기화
  function handleEditorChange() {
    const cur = editorRef.current.getValue();
    localStorage.setItem('currentCode', JSON.stringify(cur));
  }

  // 저장된 코드 불러오기 기능
  useEffect(() => {
    const newCodeSavedList = {};
    const newCodeSavedIdList = {};
    let i = 0;

    axios.get('/code_saved').then(({ data }) => {
      data.forEach(({ code_savedId, questionId, code }) => {
        if (Number(questionid) === questionId) {
          newCodeSavedList[code_savedId] = code;
          newCodeSavedIdList[i++] = code_savedId;
        }
      });
      setCodeSavedList(newCodeSavedList);
      setCodeSavedIdList(newCodeSavedIdList);
    });
  }, [question, cnt, change]);

  // 코드 저장 기능
  useEffect(() => {
    axios.get('/code_saved').then(({ data }) => {
      letCnt(data.length);
    });
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function codeSavedBtn(num) {
    const id = Number(codeSavedIdList[num - 1]);
    editorRef.current.setValue(String(codeSavedList[id]));
  }

  function handleSaveCode(num) {
    const val = String(editorRef.current.getValue());
    if (!val) {
      alert('작성된 코드가 없습니다. ');
    }
    const key = Number(codeSavedIdList[num - 1]);
    if (key) {
      axios
        .put(
          '/code_saved/',
          {
            code_savedId: key,
            questionId: questionid,
            code: val,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        )
        .then((response) => {
          console.log(response);
          letChange(++change);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      letCnt(++cnt);
      axios
        .post(
          `/code_saved/${String(questionid)}/`,
          {
            code: val,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        )
        .then((response) => {
          console.log(response.data.code_savedId);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }

  // 코드 불러오기 기능
  const fileInput = useRef();

  const handleClickButton = () => {
    fileInput.current.click();
  };

  const handleChange = (e) => {
    const fileObj = e.target.files[0];
    if (fileObj) {
    }
    const reader = new FileReader();
    reader.onload = () => {
      editorRef.current.setValue(String(reader.result));
    };
    reader.readAsText(e.target.files[0], 'utf-8');
  };

  // 코드 초기화 기능
  function codeRefresh() {
    editorRef.current.setValue(String(question?.skeletonCode));
  }

  // 코드 복사 기능
  function codeCopy() {
    const text = String(editorRef.current.getValue());
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert('클립보드에 복사되었습니다.');
        })
        .catch(() => {
          alert('복사를 다시 시도해주세요.');
        });
    }
  }

  // 코드 다운로드 기능
  function downloadAsFile() {
    const text = String(editorRef.current.getValue());
    console.log(text);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'temp.py');
  }

  // 코드 제출 버튼
  function handleSubmitCode() {
    const val = String(editorRef.current.getValue());
    if (!val) {
      alert('작성된 코드가 없습니다. ');
    }
    axios
      .post(
        `/code_submitted/${String(questionid)}/`,
        {
          code: val,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      .then((response) => {
        setSubmittedCodeId(response.data.code_submittedId);
        setErrorCode(response.data.error);
        if (response.data.error) {
          alert('제출 횟수를 초과했습니다.');
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            disabled={!codeSavedIdList[0]}
          >
            1
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={style.saveButton}
            onClick={() => codeSavedBtn(2)}
            disabled={!codeSavedIdList[1]}
          >
            2
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={style.saveButton}
            onClick={() => codeSavedBtn(3)}
            disabled={!codeSavedIdList[2]}
          >
            3
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Editor
          height="calc(100vh - 151px)"
          defaultLanguage="python"
          value={question?.skeletonCode || JSON.parse(localStorage.getItem('currentCode')) || ''}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
        />
      </Grid>
      <Grid item sx={style.itemBottom}>
        <Grid container sx={style.container}>
          <Grid item>
            <IconButton sx={style.iconButton} onClick={handleClickButton}>
              <Folder />
            </IconButton>
            <Input
              type="file"
              style={{ display: 'none' }}
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
            <Button
              variant="outlined"
              size="small"
              sx={style.button}
              onClick={handleOpen}
              disabled={!question}
            >
              저장
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style.modalPopup}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  코드 저장 슬롯 선택
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={style.button}
                  onClick={() => handleSaveCode(1)}
                >
                  1번
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={style.button}
                  onClick={() => handleSaveCode(2)}
                  disabled={!codeSavedIdList[0]}
                >
                  2번
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={style.button}
                  onClick={() => handleSaveCode(3)}
                  disabled={!codeSavedIdList[1]}
                >
                  3번
                </Button>
              </Box>
            </Modal>
            <Button
              variant="contained"
              size="small"
              sx={style.submitButton}
              onClick={() => handleSubmitCode()}
              disabled={!question}
            >
              제출
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

// 실시간 코드 저장 기능 구현
