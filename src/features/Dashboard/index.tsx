import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import BlockSharpIcon from '@material-ui/icons/BlockSharp';
import OfflinePinSharpIcon from '@material-ui/icons/OfflinePinSharp';
import SupervisorAccountSharpIcon from '@material-ui/icons/SupervisorAccountSharp';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import StatisticItem from './components/StatisticsItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import {
  dashboardAction,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentsList,
  selectLowestStudentsList,
  selectRankingByCityList
} from './dashboardSlice';

export interface IAppProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function Dashboard(props: IAppProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentsList = useAppSelector(selectHighestStudentsList);
  const lowestStudentsList = useAppSelector(selectLowestStudentsList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  React.useEffect(() => {
    dispatch(dashboardAction.fetchData());
  }, [dispatch]);

  // console.log({ loading, statistics, highestStudentsList, lowestStudentsList, rankingByCityList });

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* Statistic Sections */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem
            icon={<SupervisorAccountSharpIcon fontSize="large" color="primary" />}
            label="Male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem
            icon={<SupervisorAccountSharpIcon fontSize="large" color="primary" />}
            label="Female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem
            icon={<OfflinePinSharpIcon fontSize="large" color="primary" />}
            label="High Mark"
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem
            icon={<BlockSharpIcon fontSize="large" color="primary" />}
            label="Low Mark"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* All Student Ranking */}
      <Box mt={4}>
        <Typography variant="h4">All Students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Widget title="top Học sinh giỏi">
                <StudentRankingList studentList={highestStudentsList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Widget title="top Học sinh ngu">
                <StudentRankingList studentList={lowestStudentsList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* All Ranking City*/}
      <Box mt={4}>
        <Typography variant="h4">Ranking students by City</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((listByCity, index) => {
              return (
                <Grid key={index} item xs={12} md={6} lg={3} xl={3}>
                  <Widget title={`${listByCity.cityName} Ranking`}>
                    <StudentRankingList studentList={listByCity.rankingList} />
                  </Widget>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
