import { createSlice } from "@reduxjs/toolkit";

interface ExcelState {
    excelData: Record<string, any>; // Object to store extracted data
    Stores: Record<string, any>,
    SKUs: Record<string, any>,
    Calender: Record<string, any>,
    Planning: Record<string, any>,
    Calculations: Record<string, any>
    Chart: Record<string, any>
    open: boolean;
}

const initialState: ExcelState = {
    excelData: {},
    Stores: {},
    SKUs: {},
    Calender: {},
    Planning: {},
    Calculations: {},
    Chart: {},
    open: false,
};

const excelSlice = createSlice({
    name: "excel",
    initialState,
    reducers: {
        setExcelData: (state, action) => {
            switch (action.payload.sheetName) {
                case "Stores":
                    state.Stores = action.payload.data;
                    break;
                case "SKUs":
                    state.SKUs = action.payload.data;
                    break;
                case "Calender":
                    state.Calender = action.payload.data;
                    break;
                case "Planning":
                    state.Planning = action.payload.data;
                    break;
                case "Calculations":
                    state.Calculations = action.payload.data;
                    break;
                case "Chart":
                    state.Chart = action.payload.data;
                    break;
                default: state.excelData = action.payload.data;
            }
        },
        clearExcelData: (state) => {
            state.excelData = [];
        },
        setPopupState: (state, action) => {
            state.open = action.payload;
        }
    },
});

export const { setExcelData, clearExcelData,setPopupState } = excelSlice.actions;
export default excelSlice.reducer;
