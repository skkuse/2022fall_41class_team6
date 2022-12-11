/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import {
  createTheme, CssBaseline, Grid, Stack, ThemeProvider,
} from '@mui/material';
import { useEffect } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import axios from 'axios';
import { Head } from './components/Head';
import { CodeEditor } from './components/CodeEditor';
import { QuestionInfo } from './components/QuestionInfo';
import { SubmitResult } from './components/SubmitResult';
import { CodeExplanation } from './components/CodeExplanation';
import { Reference } from './components/Reference';

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
  itemRight: {
    height: 'calc(100vh - 50px)',
    flexWrap: 'nowrap',
    overflow: 'auto',
  },
};

export default function App() {
  const [lectureList, setLectureList] = useState({});
  const [selectedLectureId, setSelectedLectureId] = useState(0);
  const [questionList, setQuestionList] = useState({});
  const [selectedQuestionId, setSelectedQuestionId] = useState(0);
  const [testcaseList, setTestcaseList] = useState({});
  const [codeSavedList, setCodeSavedList] = useState({});
  const [codeSavedIdList, setCodeSavedIdList] = useState({});
  const [deadlineDate, setDeadlineDate] = useState({});
  const [submittedCodeId, setSubmittedCodeId] = useState({});
  const [errorCode, setErrorCode] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedCode, setSubmittedCode] = useState('');
  const [answerCode, setAnswerCode] = useState('');

  const editorRef = useRef(null);

  useEffect(() => {
    setSubmittedCodeId({});
  }, [selectedQuestionId]);

  useEffect(() => {
    setSubmitSuccess(!!(selectedQuestionId > 0 && submittedCodeId > 0 && errorCode === 0));
  }, [selectedQuestionId, submittedCodeId, errorCode]);

  useEffect(() => {
    if (submitSuccess) {
      axios.get(`code_submitted/${selectedQuestionId}/${submittedCodeId}`).then(({ data }) => {
        setSubmittedCode(data[0].code);
      });
      axios.get(`question/${selectedQuestionId}`).then(({ data }) => {
        setAnswerCode(data[0].answerCode);
      });
    }
  }, [submitSuccess]);

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Head
          lectureList={lectureList}
          setLectureList={setLectureList}
          selectedLectureId={selectedLectureId}
          setSelectedLectureId={setSelectedLectureId}
          questionList={questionList}
          setQuestionList={setQuestionList}
          selectedQuestionId={selectedQuestionId}
          setSelectedQuestionId={setSelectedQuestionId}
          testcaseList={testcaseList}
          setTestcaseList={setTestcaseList}
          deadlineDate={deadlineDate}
          setDeadlineDate={setDeadlineDate}
        />
        <Grid container sx={style.container}>
          <Grid item xs={3}>
            <QuestionInfo
              question={questionList[selectedQuestionId]}
              testcaseList={testcaseList}
              editorRef={editorRef}
            />
          </Grid>
          <Grid item xs={submitSuccess ? 6 : 9} sx={style.itemCenter}>
            {submitSuccess ? (
              <DiffEditor
                height="calc(100vh - 50px)"
                defaultLanguage="python"
                original={submittedCode}
                modified={answerCode}
              />
            ) : (
              <CodeEditor
                question={questionList[selectedQuestionId]}
                questionid={selectedQuestionId}
                codeSavedList={codeSavedList}
                setCodeSavedList={setCodeSavedList}
                codeSavedIdList={codeSavedIdList}
                setCodeSavedIdList={setCodeSavedIdList}
                editorRef={editorRef}
                setSubmittedCodeId={setSubmittedCodeId}
                setErrorCode={setErrorCode}
                errorCode={errorCode}
                submittedCodeId={submittedCodeId}
              />
            )}
          </Grid>
          {submitSuccess && (
            <Grid item xs={3} sx={style.itemRight}>
              <SubmitResult questionId={selectedQuestionId} submittedCodeId={submittedCodeId} />
              <CodeExplanation submittedCodeId={submittedCodeId} />
              <Reference questionId={selectedQuestionId} />
            </Grid>
          )}
        </Grid>
      </ThemeProvider>
    </CssBaseline>
  );
}
