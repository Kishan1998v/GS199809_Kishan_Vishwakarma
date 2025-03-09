import { createSlice } from "@reduxjs/toolkit";
import { SKUMap, StoreMap } from "../const";
import { CalenderMap } from "../../store/sampleConst";

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
    SKUs: [SKUMap.row],
    Calender: CalenderMap,
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
        addPlanner:(state,action)=>{
            state.Planning = action.payload
        },
        addCalculation:(state,action)=>{
            state.Calculations = action.payload
        },
        updatePlanner:(state,action)=>{
            state.Planning = {...state.Planning , [action.payload.id]:action.payload.value}
        },
        updateCalculation:(state,action)=>{
            state.Planning = {...state.Calculations , [action.payload.id]:action.payload.value}
        }
      
    },
});

export const {updatePlanner,addCalculation,updateCalculation, setExcelData, clearExcelData,setPopupState,addNewData,updateStoreData,deleteStoreData,addPlanner } = excelSlice.actions;
export default excelSlice.reducer;
