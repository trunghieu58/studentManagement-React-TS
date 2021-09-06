import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { fork, take, call, put, delay } from 'redux-saga/effects';
import { authAction, loginPayload } from './authSlice';

function* handleLogin(payload: loginPayload) {
  try {
    yield delay(2000);
    yield console.log('handle Login: ', payload);
    localStorage.setItem('access_token', '123');
    yield put(
      authAction.loginSuccess({
        id: 1,
        name: 'Hieu',
      })
    );
    yield put(push('/admin/dashboard'));
  } catch (error) {
    console.log(error);
    yield put(authAction.loginFail('Login fail'));
  }
}

function* handleLogout() {
  try {
    yield console.log('handle Log out');
    localStorage.removeItem('access_token');
    yield put(push('/login'));
  } catch (error) {
    console.log(error);
  }
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<loginPayload> = yield take(authAction.login.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(authAction.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
