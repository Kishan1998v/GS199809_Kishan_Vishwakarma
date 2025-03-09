import React, { useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewData } from "../UploadExcel/excelSlice";
import MakePlanner from "./createPlanner";
import Button from "../Common/Button";
interface ColDef {
    field: string;
}
interface rowData{
    Seq: number;
    ID: string;
    Label: string;
    City: string;
    State: string;
}

interface AddItemsProps {
    colDefs: ColDef[];
    rowlastData: rowData;
    ComponentType:String;
    setInputSection: Function;
}
const getNextId = (lastId: string,ComponentType:String) => {
    debugger
    if(lastId == ""){
        if(ComponentType=="Store") return "ST001"
        if(ComponentType=="SKUs")  return "SK001"
    }
    if(lastId){
        const numericPart = lastId.slice(2); 
        const nextNumber = parseInt(numericPart, 10) + 1; 
        const nextId = `ST${String(nextNumber).padStart(3, "0")}`;
        return nextId;
    }
};
const AddItems: React.FC<AddItemsProps> = React.memo(({colDefs,rowlastData,ComponentType,setInputSection})=>{
    let dispatch = useDispatch();
    let id = useRef(useMemo(() => getNextId(rowlastData['ID'],ComponentType), [rowlastData['ID']]))
    const [formData, setFormData] = useState<Record<string, any>>(rowlastData ? 
        ComponentType == "Stores" ? {
            Seq: rowlastData['Seq'] + 1,
            ID : id.current
        }:{
            ID : id.current
        }
        :{});
    function handleFormSubmit(e:React.ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        dispatch(addNewData({type:ComponentType,data:formData}))
        setInputSection(false);
        MakePlanner(ComponentType,formData.ID)
        setFormData({})
    }
    function onInputChange(e:React.ChangeEvent<HTMLInputElement>){
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return(
        <div className="w-100 h-100 r-0 fixed z-10 left-50 bottom-14 p-6 bg-orange-300 border border-orange-600 rounded-lg">
            <form className="grid grid-cols-3 gap-3 " onSubmit={handleFormSubmit}>
                {colDefs && colDefs.map((val: any) => {
                    if (!(val.field.toLowerCase() === "seq") && !(val.field.toLowerCase() === "id")) {
                        return (
                            <div key={val.field} className="flex flex-col">
                                <label htmlFor={val.field} className="text-sm font-medium text-gray-700">{val.field}</label>
                                <input className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" id={val.field} onChange={onInputChange} name={val.field} placeholder={val.field} value={formData[val.field] || ""} />
                            </div>
                        )
                    }
                })}

            </form>
            <div className="flex gap-10">
               <Button color={"mt-4 w-full bg-orange-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-orange-600 transition-all"} type="submit">Submit</Button>
               <Button color={"mt-4 w-full bg-orange-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-orange-600 transition-all"} onClick={()=>setInputSection(false)}>Cancel</Button>
            </div>
        </div>
    )
})
export default AddItems;