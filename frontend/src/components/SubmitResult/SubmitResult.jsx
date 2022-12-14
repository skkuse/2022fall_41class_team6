import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Backdrop, CircularProgress, Grid, Tab, Tabs,
} from '@mui/material';
import FunctionalityScore from './FunctionalityScore';
import EfficiencyScore from './EfficiencyScore';
import VisibilityScore from './VisibilityScore';

const style = {
  container: {
    position: 'relative',
    height: 237,
    flexWrap: 'nowrap',
    overflow: 'auto',
  },
  header: {
    height: 40,
    px: 1,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    bgcolor: 'primary.main',
  },
  plagiarismRate: {
    fontSize: 14,
  },
  tabs: {
    minHeight: 0,
  },
  tab: {
    minWidth: 0,
    minHeight: 0,
    p: 1,
  },
  content: {
    py: 1,
  },
  backdrop: {
    position: 'absolute',
    top: 40,
    height: 197,
    zIndex: 1,
  },
};

export default function SubmitResult({ questionId, submittedCodeId }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [plagiarismRate, setPlagiarismRate] = useState(0);
  const [testcaseList, setTestcaseList] = useState([]);
  const [functionalityScore, setFunctionalityScore] = useState([]);
  const [efficiencyScore, setEfficiencyScore] = useState({});
  const [visibilityScore, setVisibilityScore] = useState({});

  useEffect(() => {
    if (questionId > 0 && submittedCodeId > 0) {
      Promise.all([
        axios.get(`/testcase/${questionId}/`),
        axios.get(`/code_submitted/${questionId}/${submittedCodeId}/plagiarism`),
        axios.get(`/code_submitted/${questionId}/${submittedCodeId}/efficiency`),
        axios.get(`/code_submitted/${questionId}/${submittedCodeId}/visibility`),
      ]).then(
        ([
          { data: testcases },
          { data: plagiarism },
          { data: efficiency },
          { data: visibility },
        ]) => {
          setTestcaseList(testcases.map(({ testcaseId }) => testcaseId));
          setPlagiarismRate(plagiarism);
          setEfficiencyScore(efficiency);
          setVisibilityScore(visibility);
        },
      );
    }
  }, [questionId, submittedCodeId]);

  useEffect(() => {
    if (testcaseList.length) {
      const unittestResult = testcaseList.reduce(async (prev, testcaseId) => {
        const prevResult = await prev;
        const { data } = await axios.get(`/code_submitted/${testcaseId}/${submittedCodeId}/unittest`);
        return [...prevResult, data];
      }, Promise.resolve([]));
      unittestResult.then((result) => {
        setFunctionalityScore(result);
        setLoading(false);
      });
    }
  }, [testcaseList]);

  const handleTabChange = (_, newSelectedTab) => {
    setSelectedTab(newSelectedTab);
  };

  return (
    <Grid container direction="column" sx={style.container}>
      <Grid item container sx={style.header}>
        <Grid item xs>
          ?????? ??????
        </Grid>
        <Grid item sx={{ ...style.plagiarismRate, color: plagiarismRate > 10 ? 'red' : 'green' }}>
          ?????????
          {' '}
          {plagiarismRate.toFixed(2)}
          %
        </Grid>
      </Grid>
      <Backdrop open={loading} sx={style.backdrop}>
        <CircularProgress />
      </Backdrop>
      <Grid item>
        <Tabs variant="fullWidth" sx={style.tabs} value={selectedTab} onChange={handleTabChange}>
          <Tab wrapped sx={style.tab} label="??????" />
          <Tab wrapped sx={style.tab} label="??????" />
          <Tab wrapped sx={style.tab} label="?????????" />
        </Tabs>
      </Grid>
      <Grid item sx={style.content}>
        {selectedTab === 0 && <FunctionalityScore score={functionalityScore} />}
        {selectedTab === 1 && <EfficiencyScore score={efficiencyScore} />}
        {selectedTab === 2 && <VisibilityScore score={visibilityScore} />}
      </Grid>
    </Grid>
  );
}
