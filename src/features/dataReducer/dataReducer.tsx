import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

interface DataState {
  refreshThis: boolean;
}

const initialState: DataState = {
  refreshThis: false,
};

const dataReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    refreshThis: (state, action: PayloadAction<any>) => {
      console.log('REFRESCANDO,',action.payload)
      state.refreshThis = action.payload;
    },
  },
});

export const { refreshThis } = dataReducer.actions;

const selectCounterState = (state: { counter: DataState }) => state.counter;

export const selectCount = createSelector(
  [selectCounterState],
  (counter) => counter.refreshThis
);

export default dataReducer.reducer;
