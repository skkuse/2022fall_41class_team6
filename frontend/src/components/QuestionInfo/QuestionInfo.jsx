import { Grid, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

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
  testButton: {
    ml: '40%',
    color: 'white',
  }
};

export default function QuestionInfo({ question, testcaseList, editorRef}) {
  const [testResult, setTestResult] = useState({});
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const newArray = {};
    setTestResult(newArray);
    setClicked(false);
  }, [testcaseList])

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
        <div key={index}>
          <Grid item sx={style.subheader}>테스트케이스 {index + 1}
            <Button variant="text" size="small" sx={style.testButton} onClick={() => {
              const newClicked = {};
              const newTestResult = {};

              let userCode = editorRef.current.getValue();

              newClicked[index] = true;
              setClicked(newClicked);

              axios.post(`/unittest/${testcaseList[index]?.testcaseId}/`, {
                "code": userCode,
              },
              { headers: {
                "Content-Type":"application/json", 
                'Accept':'application/json'
              }})
              .then(function (response) {
                console.log(response);
                newTestResult[index] = response.data;
                setTestResult(newTestResult);
              })
              .catch(function (error) {
                console.log(error);
              })
            }}>검증</Button>
            {clicked[index] && <Grid>{testResult[index]?.pass == 1? 'PASS' : 'FAIL'}</Grid>}
          </Grid>
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
          {testResult[index]?.pass == 0 && <div>
            <Grid item container>
              <Grid item xs={6}/>
              <Grid item xs={6}>
                Your Output
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}/>
              <Grid item xs={6}>
                {testResult[index]?.youroutput}
              </Grid>
            </Grid>  
          </div>}
        </div>
      ))}
    </Grid>
  );
}
