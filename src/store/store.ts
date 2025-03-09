// src/store/store.ts
import { configureStore, createSlice } from "@reduxjs/toolkit";
import excelReducer from "../components/UploadExcel/excelSlice";

// Initial state with a single variable
const initialState = {
  excelFileData: {},
};

// Create a simple slice with one action to update the value
const simpleSlice = createSlice({
  name: "excelData",
  initialState,
  reducers: {
    setExcelFileData: (state, action) => {
      state.excelFileData = action.payload;
    },
  },
});

export const { setExcelFileData } = simpleSlice.actions;

// Create the Redux store
export const store = configureStore({
  reducer: {
    simple: simpleSlice.reducer,
    excel: excelReducer, // Make it available globally
  },
});

// TypeScript types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
