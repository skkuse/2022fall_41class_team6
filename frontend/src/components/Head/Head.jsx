/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect } from 'react';
import axios from 'axios';
import {
  Grid, IconButton, MenuItem, TextField,
} from '@mui/material';
import { Home } from '@mui/icons-material';
import moment from 'moment';

const style = {
  container: {
    alignItems: 'center',
    height: 50,
    bgcolor: 'primary.main',
  },
  itemLeft: {
    pl: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRight: {
    pr: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textField: {
    width: 150,
    mx: 0.5,
  },
  iconButton: {
    color: 'primary.contrastText',
  },
  Input: {
    bgcolor: 'primary.contrastText',
  },
  input: {
    p: 0.5,
    fontSize: 14,
    textAlign: 'center',
  },
};

export default function Head({
  lectureList,
  setLectureList,
  selectedLectureId,
  setSelectedLectureId,
  questionList,
  setQuestionList,
  selectedQuestionId,
  setSelectedQuestionId,
  testcaseList,
  setTestcaseList,
  deadlineDate,
  setDeadlineDate,
}) {
  useEffect(() => {
    axios.get('/lecture').then(({ data }) => {
      data.forEach(({ lectureId, lectureName }) => {
        setLectureList((prev) => ({
          ...prev,
          [lectureId]: lectureName,
        }));
      });
    });
  }, []);

  useEffect(() => {
    const newQuestionList = {};
    axios.get('/question').then(({ data }) => {
      data.forEach(({ lectureId, questionId, ...rest }) => {
        if (lectureId === Number(selectedLectureId)) {
          newQuestionList[questionId] = rest;
        }
      });
      setQuestionList(newQuestionList);
    });
    setSelectedQuestionId(0);
  }, [selectedLectureId]);

  useEffect(() => {
    let i = 0;
    const newTestcaseList = {};
    axios.get(`/testcase/${selectedQuestionId}`).then(({ data }) => {
      data.forEach(({ questionId, isHidden, ...rest }) => {
        if (!isHidden) {
          newTestcaseList[i] = rest;
          i++;
        }
      });
      setTestcaseList(newTestcaseList);
    });
  }, [selectedQuestionId]);

  useEffect(() => {
    const newTimeLeft = {};
    const setTime = questionList[selectedQuestionId]?.deadline;

    const deadline = moment(setTime, 'YYYY-MM-DD');
    const nowTime = moment();

    const late = nowTime.isAfter(deadline);
    const dLeft = deadline.diff(nowTime, 'days');
    const hLeft = 23 - new Date().getHours();
    const mLeft = 59 - new Date().getMinutes();

    if (late) {
      newTimeLeft[0] = '????????????';
    } else {
      newTimeLeft[0] = `${dLeft}??? ${hLeft}?????? ${mLeft}??? ???????????????.`;
    }

    setDeadlineDate(newTimeLeft);
  }, [selectedQuestionId]);

  function clickHomeButton() {
    location.href = 'http://127.0.0.1:3000';
  }

  return (
    <Grid container sx={style.container}>
      <Grid item xs={3} sx={style.itemLeft}>
        <IconButton sx={style.iconButton} onClick={clickHomeButton}>
          <Home />
        </IconButton>
      </Grid>
      <Grid item xs={6} sx={style.itemCenter}>
        <TextField
          select
          variant="outlined"
          size="small"
          value={selectedLectureId}
          onChange={(e) => setSelectedLectureId(e.target.value)}
          InputProps={{ sx: style.Input }}
          inputProps={{ sx: style.input }}
          sx={style.textField}
        >
          <MenuItem value={0}>?????? ??????</MenuItem>
          {Object.entries(lectureList).map(([lectureId, lectureName]) => (
            <MenuItem key={lectureId} value={lectureId}>
              {lectureName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          variant="outlined"
          size="small"
          value={selectedQuestionId}
          onChange={(e) => setSelectedQuestionId(e.target.value)}
          InputProps={{ sx: style.Input }}
          inputProps={{ sx: style.input }}
          sx={style.textField}
        >
          <MenuItem value={0}>?????? ??????</MenuItem>
          {Object.entries(questionList).map(([questionId, { questionName }]) => (
            <MenuItem key={questionId} value={questionId}>
              {questionName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3} sx={style.itemRight}>
        <TextField
          variant="outlined"
          size="small"
          disabled
          value={selectedQuestionId ? `${deadlineDate[0]}` : '????????????'}
          InputProps={{ sx: style.Input }}
          inputProps={{ sx: style.input }}
          sx={{ ...style.textField, width: 600 }}
        />
      </Grid>
    </Grid>
  );
}
