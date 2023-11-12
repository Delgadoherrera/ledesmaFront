import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

interface DataState {
  refreshThis: boolean;
  openMenu: boolean;
  file: string;
  mainMenuOpt:string;
  showDialogAdv:boolean;
  dialogText:string;
}

const initialState: DataState = {
  refreshThis: false,
  openMenu: false,
  file: "",
  mainMenuOpt:"",
  showDialogAdv:false,
  dialogText:""
};

const dataReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    refreshThis: (state, action: PayloadAction<any>) => {
      console.log("refreshThis,", action.payload);
      state.refreshThis = action.payload;
    },
    openMenu: (state, action: PayloadAction<any>) => {
      console.log("openMenu,", action.payload);
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
    showDialogAdv: (state, action: PayloadAction<any>) => {
      console.log("showDialogAdv:", action.payload);
      state.showDialogAdv = action.payload;
    },
    dialogText: (state, action: PayloadAction<any>) => {
      console.log("dialogText:", action.payload);
      state.dialogText = action.payload;
    },
  },
});

export const { refreshThis, openMenu, imageValue , menuSelect, showDialogAdv,dialogText} = dataReducer.actions;

const selectCounterState = (state: { counter: DataState }) => state.counter;

export const selectCount = createSelector(
  [selectCounterState],
  (counter) => counter.refreshThis
);
export const dialogAdvText = createSelector(
  [selectCounterState],
  (counter) => counter.dialogText
);
export const imagen = createSelector(
  [selectCounterState],
  (counter) => counter.file
);
export const isOpenMenu = createSelector(
  [selectCounterState],
  (counter) => counter.openMenu
);
export const openAdv = createSelector(
  [selectCounterState],
  (counter) => counter.showDialogAdv
);
export const menuSelectOpt = createSelector(
  [selectCounterState],
  (counter) => counter.mainMenuOpt
);

export default dataReducer.reducer;
