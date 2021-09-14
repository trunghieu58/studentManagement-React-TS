import { PaginationParams, listParams, ListResponse } from './../../models/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'models';
import { RootState } from 'app/store';

export interface studentState {
  loading: boolean;
  studentList: Student[];
  filter: listParams;
  pagination: PaginationParams;
}

const initialState: studentState = {
  loading: false,
  studentList: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};

const studentSlice = createSlice({
  name: 'Student',
  initialState,
  reducers: {
    fetchData(state, action: PayloadAction<listParams>) {
      state.loading = true;
    },
    fetchDataSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.loading = false;
      state.studentList = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchDataFailure(state) {
      state.loading = false;
    },

    addStudent(state, action: PayloadAction<Student>) {},

    UpdateStudent(state, action: PayloadAction<Student>) {},

    setFilter(state, action: PayloadAction<listParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<listParams>) {},
    setFilterWithSelect(state, action: PayloadAction<listParams>) {},
  },
});

const studentReducer = studentSlice.reducer;
export default studentReducer;

//Action
export const studentActions = studentSlice.actions;

//Selecttor
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentList = (state: RootState) => state.student.studentList;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPaginations = (state: RootState) => state.student.pagination;
