import { Box, makeStyles, Paper, Typography, Button, CircularProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { ReactElement } from 'react';
import { authAction } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  paper: {
      padding: theme.spacing(3)
  }
}));

export default function LoginPage(): ReactElement {
  const classes = useStyles();
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.logging)

  const handleLogin = () => {
    dispatch(authAction.login({
      username: '',
      password: ''
    }))
  }
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>

        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
            {isLoggedIn && <CircularProgress color="secondary" size={20}/>} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
