import { Grid } from '@mui/material';
import React from 'react';

const style = {
  container: {
    height: 'calc(100vh - 50px)',
    flexWrap: 'nowrap',
    overflow: 'auto',
  },
  header: {
    height: 40,
    pl: 1,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    bgcolor: 'primary.main',
  },
  subheader: {
    height: 30,
    pl: 1,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: 'white',
    bgcolor: 'gray',
  },
  content: {
    px: 1,
    py: 2,
    whiteSpace: 'pre-line',
  },
};

export default function QuestionInfo({ question, testcaseList }) {
  return (
    <Grid container direction="column" sx={style.container}>
      <Grid item sx={style.header}>
        문제 & 참조/제약사항
      </Grid>
      <Grid item sx={style.subheader}>문제</Grid>
      <Grid item sx={style.content}>
        {question?.explanation || '문제를 선택해주세요.'}
      </Grid>
      <Grid item sx={style.subheader}>참조/제약사항</Grid>
      <Grid item sx={style.content}>
        {question?.requirements || '문제를 선택해주세요.'}
      </Grid>
      <Grid item sx={style.header}>
        테스트케이스
      </Grid>
      {Object.entries(testcaseList).map((testcase, index) => (
        <div>
          <Grid item sx={style.subheader}>테스트케이스 {index + 1}</Grid>
          <Grid item container>
            <Grid item xs={6}>
              Input
            </Grid>
            <Grid item xs={6}>
              Output
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
              {testcaseList[index]?.input}
            </Grid>
            <Grid item xs={6}>
              {testcaseList[index]?.output}
            </Grid>
          </Grid>
        </div>
      ))}
    </Grid>
  );
}
