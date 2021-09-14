import { PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, listParams } from './../../models/common';
import { Student } from './../../models/student';
import studentsApi from 'api/studentsApi';
import { call, put, takeLatest, takeEvery, debounce } from 'redux-saga/effects';
import { studentActions } from './studentSlice';
import { push } from 'connected-react-router';

function* fetchStudentData(action: PayloadAction<listParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentsApi.getAll, action.payload);
    yield put(studentActions.fetchDataSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(studentActions.fetchDataFailure())
  }
}

function* handleSearchDebounce (action: PayloadAction<listParams>) {
  yield put(studentActions.setFilter(action.payload))
}

function* handleAddStudent(action: PayloadAction<Student>) {
  try {
    yield call(studentsApi.add, action.payload)
    yield put(push('/admin/students'))
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateStudent (action: PayloadAction<Student>) {
  try {
    yield call(studentsApi.update, action.payload.id, action.payload)
    // console.log(action.payload);
    yield put(push('/admin/students'))
  } catch (error) {
    
  }
}


export default function* studentSaga() {
  yield takeLatest(studentActions.fetchData.type, fetchStudentData);
  yield debounce(500, studentActions.setFilterWithDebounce, handleSearchDebounce )
  yield takeEvery(studentActions.addStudent, handleAddStudent)
  yield takeEvery(studentActions.UpdateStudent, handleUpdateStudent)
}
