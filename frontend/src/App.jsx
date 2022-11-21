/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  createTheme, CssBaseline, Grid, ThemeProvider,
} from '@mui/material';
import { Head } from './components/Head';
import { CodeEditor } from './components/CodeEditor';
import { QuestionInfo } from './components/QuestionInfo';

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
  const [lectureList, setLectureList] = useState({});
  const [selectedLectureId, setSelectedLectureId] = useState(0);
  const [questionList, setQuestionList] = useState({});
  const [selectedQuestionId, setSelectedQuestionId] = useState(0);
  const [testcaseList, setTestcaseList] = useState({});
  const [codeSavedList, setCodeSavedList] = useState({});
  const [codeSavedIdList, setCodeSavedIdList] = useState({});

  const toggleLeftWidth = () => {
    setLeftWidth(leftWidth === 3 ? 1 : 3);
  };

  const toggleRightWidth = () => {
    setRightWidth(rightWidth === 3 ? 1 : 3);
  };

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
        />
        <Grid container sx={style.container}>
          <Grid item xs={leftWidth}>
            <QuestionInfo
              question={questionList[selectedQuestionId]}
              testcaseList={testcaseList}
            />
          </Grid>
          <Grid item xs={12 - leftWidth - rightWidth} sx={style.itemCenter}>
            <CodeEditor
              question={questionList[selectedQuestionId]}
              questionid={selectedQuestionId}
              codeSavedList={codeSavedList}
              setCodeSavedList={setCodeSavedList}
              codeSavedIdList={codeSavedIdList}
              setCodeSavedIdList={setCodeSavedIdList}
            />
          </Grid>
          <Grid item xs={rightWidth} />
        </Grid>
      </ThemeProvider>
    </CssBaseline>
  );
}
