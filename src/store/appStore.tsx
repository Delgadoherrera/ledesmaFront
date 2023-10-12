import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/dataReducer/dataReducer";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});