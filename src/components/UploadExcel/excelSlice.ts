import { createSlice } from "@reduxjs/toolkit";
import { StoreMap } from "../const";

interface ExcelState {
    excelData: Record<string, any>; // Object to store extracted data
    Stores: Record<string, any>,
    SKUs: Record<string, any>,
    Calender: Record<string, any>,
    Planning: Record<string, any>,
    Calculations: Record<string, any>
    Chart: Record<string, any>
    open: boolean;
    [key: string]: any;
}

const initialState: ExcelState = {
    excelData: {},
    Stores: [StoreMap.row],
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
        },
        addNewData:(state,action)=>{
            state[action.payload.type] = [...state[action.payload.type] ,action.payload.data]
        },
        updateStoreData: (state, action) => {
            state.Stores = state.Stores.map((item : any) =>
              item.id === action.payload.id ? action.payload : item
            );
        },
        deleteStoreData: (state, action) => {
            state.Stores = state.Stores.filter((item : any) => item.id !== action.payload);
        },
      
    },
});

export const { setExcelData, clearExcelData,setPopupState,addNewData,updateStoreData,deleteStoreData } = excelSlice.actions;
export default excelSlice.reducer;
