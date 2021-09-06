import { Box } from '@material-ui/core';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import AddEditStudent from './page/AddEditStudent';
import ListStudent from './page/ListPage';

export interface IAppProps {
}

export default function Student (props: IAppProps) {
  const match = useRouteMatch()

  
  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListStudent/>
        </Route>
        <Route path={`${match.path}/add`}>
          <AddEditStudent/>
        </Route>
        <Route path={`${match.path}/:studentId`}>
          <AddEditStudent/>
        </Route>
      </Switch>
    </Box>
  );
}
