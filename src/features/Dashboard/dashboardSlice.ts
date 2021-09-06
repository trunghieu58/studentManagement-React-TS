import { Student } from './../../models/student';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from 'app/store';


export interface dashboardStatistics {
    maleCount: number;
    femaleCount: number;
    highMarkCount: number;
    lowMarkCount: number;
}
export interface rankingByCity {
    cityId: string;
    cityName: string;
    rankingList: Student[],
}

export interface dashboardState{
    loading: boolean;
    statistics: dashboardStatistics,
    highestStudentsList: Student[],
    lowestStudentsList: Student[],
    rankingByCityList: rankingByCity[]
}

const initialState: dashboardState = {
    loading: false,
    statistics: {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0,
    },
    highestStudentsList: [],
    lowestStudentsList: [],
    rankingByCityList: []
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchData(state){
            state.loading = true;
        },
        fetchDataSuccess(state){
            state.loading = false;
        },
        fetchDataFailure(state){
            state.loading = false;
        },

        setStatistics(state, action: PayloadAction<dashboardStatistics>){
            state.statistics = action.payload
        },
        setHighestStudentList(state, action: PayloadAction<Student[]>){
            state.highestStudentsList = action.payload
        },
        setLowestStudentList(state, action: PayloadAction<Student[]>){
            state.lowestStudentsList = action.payload
        },
        setRankingByCityList(state, action: PayloadAction<rankingByCity[]>){
            state.rankingByCityList = action.payload
        },
    }
})

// Selector
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading
export const selectHighestStudentsList = (state: RootState) => state.dashboard.highestStudentsList
export const selectLowestStudentsList = (state: RootState) => state.dashboard.lowestStudentsList
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList

// Reducer
const dashboardReducer = dashboardSlice.reducer
export default dashboardReducer;

// Action
export const dashboardAction = dashboardSlice.actions
