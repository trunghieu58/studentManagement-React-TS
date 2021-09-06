import { PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, listParams } from './../../models/common';
import { Student } from './../../models/student';
import studentsApi from 'api/studentsApi';
import { call, put, takeLatest, takeEvery, debounce } from 'redux-saga/effects';
import { studentActions } from './studentSlice';

function* fetchStudentData(action: PayloadAction<listParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentsApi.getAll, action.payload);
    yield put(studentActions.fetchDataSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(studentActions.fetchDataFailure())
  }  
}

function* deleteStudent(action: PayloadAction<string>) {
  try {
    yield call(studentsApi.remove, action.payload)
    const response: ListResponse<Student> = yield call(studentsApi.getAll, {_page: 1, _limit: 15});
    yield put(studentActions.fetchDataSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(studentActions.fetchDataFailure())
  }
}

function* handleSearchDebounce (action: PayloadAction<listParams>) {
  yield put(studentActions.setFilter(action.payload))
}

function* setFilterSelect (action: PayloadAction<listParams>) {
  // yield put(studentActions.setFilter(action.payload))
}

function* handleAddStudent(action: PayloadAction<Student>) {}


export default function* studentSaga() {
  yield takeLatest(studentActions.fetchData.type, fetchStudentData);
  yield takeEvery(studentActions.deleteStudent, deleteStudent)
  yield debounce(500, studentActions.setFilterWithDebounce, handleSearchDebounce )
  yield takeEvery(studentActions.setFilterWithSelect, setFilterSelect)

  yield takeEvery(studentActions.addStudent, handleAddStudent)
}
