import authSaga from "features/Auth/authSaga"
import citySaga from "features/Ctity/citySaga";
import dashboardSaga from "features/Dashboard/dashboardSaga";
import studentSaga from "features/Student/studentSaga";
import {all} from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([authSaga(), dashboardSaga(), studentSaga(), citySaga()]);
}