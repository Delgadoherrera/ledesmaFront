import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

interface DataState {
  refreshThis: boolean;
  openMenu: boolean;
  file: string;
  mainMenuOpt:string;
}

const initialState: DataState = {
  refreshThis: false,
  openMenu: false,
  file: "",
  mainMenuOpt:""
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
    menuSelect: (state, action: PayloadAction<any>) => {
      console.log("menuSeleccionado:", action.payload);
      state.mainMenuOpt = action.payload;
    },
  },
});

export const { refreshThis, openMenu, imageValue , menuSelect} = dataReducer.actions;

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
export const menuSelectOpt = createSelector(
  [selectCounterState],
  (counter) => counter.mainMenuOpt
);

export default dataReducer.reducer;
