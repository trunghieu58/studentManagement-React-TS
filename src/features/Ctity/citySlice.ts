import { RootState } from './../../app/store';
import { ListResponse } from './../../models/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { City } from './../../models/city';
import { createSlice } from '@reduxjs/toolkit';

export interface CityState {
  list: City[];
}

const initialState: CityState = {
  list: [],
};

const citySlice = createSlice({
  name: 'City',
  initialState,
  reducers: {
    fetchCity(state) {},
    fetchCitySuccess(state, action: PayloadAction<ListResponse<City>>) {
        state.list = action.payload.data
    },
    fetchCityFailure(state){}
  },
});

const cityReducer = citySlice.reducer;
export default cityReducer;

export const cityActions = citySlice.actions;

export const selectCityList = (state: RootState) => state.city.list
