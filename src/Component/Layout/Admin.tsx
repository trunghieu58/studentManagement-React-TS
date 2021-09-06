import { Box, makeStyles } from '@material-ui/core';
import Student from 'features/Student';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'features/Dashboard';
import Header from 'Component/common/Header';
import Sidebar from 'Component/common/Sidebar';

interface Props {}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '280px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper
  },
  main: {
    gridArea: 'main',
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.background.paper
  },
}));

export const Admin = (props: Props) => {
  const classes = useStyles();

  return (
      <Box className={classes.root}>
        <Box className={classes.header}>
            <Header/>
        </Box>
        <Box className={classes.sidebar}>
            <Sidebar/>
        </Box>
        <Box className={classes.main}>
            <Switch>

                <Route path="/admin/dashboard">
                    <Dashboard />
                </Route>
                
                <Route path="/admin/students">
                    <Student />
                </Route>

            </Switch>
        </Box>
      </Box>
  );
};
