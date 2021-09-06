import { configureStore, ThunkAction, Action, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from 'utils';
import dashboardReducer from 'features/Dashboard/dashboardSlice';
import studentReducer from 'features/Student/studentSlice';
import cityReducer from 'features/Ctity/citySlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
})

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware, routerMiddleware(history)];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
