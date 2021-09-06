// import { useEffect } from 'react';
// import cityApi from './api/cityApi';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './features/Auth/page/LoginPage';
import { Admin } from 'Component/Layout';
import { NotFound, Private } from 'Component/common';

function App() {
  // useEffect(() => {
  //   cityApi.getAll().then((res) => console.log(res));

  //   // const param: listParams = {
  //   //   _page: 1,
  //   //   _limit: 51
  //   // }
  //   // studentsApi.getAll(param).then((res) => {
  //   //   console.log(res);
  //   //   res.data.map((student) => {
  //   //     console.log(student.name);
  //   //   });
  //   // });
  // }, []);

  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>

      <Private path="/admin">
        <Admin />
      </Private>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
