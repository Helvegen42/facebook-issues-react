import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});
