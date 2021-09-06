import { ListResponse } from './../../models/common';
import cityApi from 'api/cityApi';
import { City } from './../../models/city';
import { takeEvery, put, call } from 'redux-saga/effects';
import { cityActions } from './citySlice';

function* fetchListCity() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCitySuccess(response));
  } catch (error) {
      yield put(cityActions.fetchCityFailure)
  }
}

export default function* citySaga() {
  yield takeEvery(cityActions.fetchCity, fetchListCity);
}
