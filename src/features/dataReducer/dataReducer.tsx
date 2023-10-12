import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

interface DataState {
  component: string;
}

const initialState: DataState = {
  component: "",
};

const dataReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    component: (state, action: PayloadAction<any>) => {
      state.component = action.payload;
    },
  },
});

export const { component } = dataReducer.actions;

const selectCounterState = (state: { counter: DataState }) => state.counter;

export const selectCount = createSelector(
  [selectCounterState],
  (counter) => counter.component
);

export default dataReducer.reducer;
