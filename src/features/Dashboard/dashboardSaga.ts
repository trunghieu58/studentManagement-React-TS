import { Student } from './../../models/student';
import { ListResponse } from './../../models/common';
import studentApi from 'api/studentsApi';
import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { dashboardAction, rankingByCity } from './dashboardSlice';
import cityApi from 'api/cityApi';
import { City } from 'models';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);
  const statisticsList = responseList.map((res) => res.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;
  yield put(dashboardAction.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }));
}

function* fetchhighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(dashboardAction.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(dashboardAction.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
  //fetch city list
  const { data }: ListResponse<City> = yield call(cityApi.getAll);

  //fetch ranking by city
  const rankingByCity = data.map((city) =>
    call(studentApi.getAll, { _page: 1, _limit: 5, _sort: 'mark', _order: 'desc', city: city.code })
  );

  const listResponse: Array<ListResponse<Student>> = yield all(rankingByCity);
  const rankingByCityList: Array<rankingByCity> = listResponse.map((x, xid) => ({
    cityId: data[xid].code,
    cityName: data[xid].name,
    rankingList: x.data,
  }));

  //Update state
  yield put(dashboardAction.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  yield delay(3000);
  try {
    yield all([
      call(fetchStatistics),
      call(fetchhighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);
    yield put(dashboardAction.fetchDataSuccess());
  } catch (error) {
    console.log('Fetch data failure', error);
    yield put(dashboardAction.fetchDataFailure());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardAction.fetchData.type, fetchDashboardData);
}
