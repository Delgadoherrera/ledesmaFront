import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

interface DataState {
  refreshThis: boolean;
  openMenu: boolean;
  file: string;
}

const initialState: DataState = {
  refreshThis: false,
  openMenu: false,
  file: "",
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
    imageValue: (state, action: PayloadAction<any>) => {
      console.log("IMAGEVALUE", state.file);
      state.file = action.payload.base64String;
    },
  },
});

export const { refreshThis, openMenu, imageValue } = dataReducer.actions;

const selectCounterState = (state: { counter: DataState }) => state.counter;

export const selectCount = createSelector(
  [selectCounterState],
  (counter) => counter.refreshThis
);
export const imagen = createSelector(
  [selectCounterState],
  (counter) => counter.file
);
export const isOpenMenu = createSelector(
  [selectCounterState],
  (counter) => counter.openMenu
);

export default dataReducer.reducer;
