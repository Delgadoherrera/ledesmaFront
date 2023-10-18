import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

interface DataState {
  refreshThis: boolean;
  openMenu: boolean;
}

const initialState: DataState = {
  refreshThis: false,
  openMenu: false,
};

const dataReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    refreshThis: (state, action: PayloadAction<any>) => {
      console.log("REFRESCANDO,", action.payload);
      state.refreshThis = action.payload;
    },
    openMenu: (state, action: PayloadAction<any>) => {
      console.log("REFRESCANDO,", action.payload);
      state.openMenu = action.payload;
    },
  },
});

export const { refreshThis } = dataReducer.actions;
export const { openMenu } = dataReducer.actions;

const selectCounterState = (state: { counter: DataState }) => state.counter;

export const selectCount = createSelector(
  [selectCounterState],
  (counter) => counter.refreshThis,
  
);

export const isOpenMenu = createSelector(
  [selectCounterState],
  (counter) => counter.openMenu,
  
);

export default dataReducer.reducer;
