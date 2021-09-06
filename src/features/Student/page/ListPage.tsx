import { Button, Box, Typography, makeStyles, LinearProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { cityActions, selectCityList } from 'features/Ctity/citySlice';
import { listParams, Student } from 'models';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPaginations,
  studentActions,
} from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  header: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}));
export interface IListStudentProps {}

export default function ListStudent(props: IListStudentProps) {
  const studentList = useAppSelector(selectStudentList);
  const loading = useAppSelector(selectStudentLoading);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const match = useRouteMatch();
  const pagination = useAppSelector(selectStudentPaginations);
  const filter = useAppSelector(selectStudentFilter);
  const cityList = useAppSelector(selectCityList);

  React.useEffect(() => {
    dispatch(studentActions.fetchData(filter));
    dispatch(cityActions.fetchCity());
  }, [dispatch, filter]);

  const handleEdit = (student: Student) => {
    // console.log(student);
  };
  const handleDelete = (id: string) => {
    // console.log(id);
  };

  const handlePageChange = (e: any, page: number) => {
    // console.log({ ...filter, _page: page });
    dispatch(studentActions.setFilter({ ...filter, _page: page }));
  };

  const handleOnSearchChange = (filter: listParams) => {
    console.log(filter);
    dispatch(studentActions.setFilterWithDebounce(filter));
  };
  const handleCityChange = (filter: listParams) => {
    // console.log(filter);
    dispatch(studentActions.setFilter(filter));
  };
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.header}>
        <Typography variant="h4">Student Management</Typography>
        <Link to={`${match.path}/add`}>
          <Button variant="contained" color="primary">
            New Student
          </Button>
        </Link>
      </Box>

      <Box mt={2}>
        <StudentFilters
          onSearchChange={handleOnSearchChange}
          filter={filter}
          cityList={cityList}
          onCityChange={handleCityChange}
        />
      </Box>

      <Box mt={2}>
        <StudentTable studentList={studentList} onEdit={handleEdit} onDelete={handleDelete} />
      </Box>

      <Box className={classes.pagination}>
        <Pagination
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          color="primary"
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
