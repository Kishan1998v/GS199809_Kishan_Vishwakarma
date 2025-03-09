import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AgTable from "../AgTable/AgTable";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from "../Common/Button";
import { ButtonStandardSize, StoreMap } from "../const";
import { addNewData, deleteStoreData, updateStoreData } from "../UploadExcel/excelSlice";

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
const getNextId = (lastId: string) => {
    debugger
    if(lastId == ""){
        return "ST001"
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
    console.log(rowlastData)
    let id = useRef(useMemo(() => getNextId(rowlastData['ID']), [rowlastData['ID']]))
    const [formData, setFormData] = useState<Record<string, any>>(rowlastData ? {
        Seq: rowlastData['Seq'] + 1,
        ID : id.current
    }:{});
    function handleFormSubmit(e:React.ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        dispatch(addNewData({type:ComponentType,data:formData}))
        setInputSection(false);
        setFormData({})
    }
    function onInputChange(e:React.ChangeEvent<HTMLInputElement>){
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    return(
        <form onSubmit={handleFormSubmit}>
            {colDefs && colDefs.map((val:any)=>{
                if(!(val.field.toLowerCase() === "seq") && !(val.field.toLowerCase() === "id")){
                    return (
                        <div key={val.field}>
                            <input id={val.field} onChange={onInputChange} name={val.field} placeholder={val.field} value={formData[val.field] || ""}/>
                        </div>
                    )
                }
            })}
            <button type="submit">Submit</button>
        </form>
    )
})

function Store(){
    let dispatch = useDispatch();
    //Row Data 
    const rowData = useSelector((state: RootState) => state.excel.Stores);
    // Column Definitions: Defines the columns to be displayed.
    useEffect(()=>{},[rowData])
    console.log(rowData)
    const colDefs = useMemo<Array<{ field: string }>>(() => {
        if (!rowData.length) return StoreMap.column; // Handle empty rowData to avoid errors
        return Object.keys(rowData[0]).map((value) => (
            { 
                field: value ,
                editable : value.toLowerCase() !== "id" && value.toLowerCase() !== 'seq'
            }
        ));
    }, [rowData]); // Add rowData as a dependency
    const defaultColDef = {
      editable: false,
    };
    const [showInputSection , setInputSection] = useState(false)
     // Handle row updates
    const onCellEditingStopped = (event: any) => {
        dispatch(updateStoreData(event.data)); // Dispatch Redux action to update the store
    };

    // Handle row deletion
    const handleDelete = (id: string | number) => {
        dispatch(deleteStoreData(id)); // Dispatch Redux action to delete row
    };

    // Handle row drag and drop
    const onRowDragEnd = (event: any) => {
        const movedRow = event.node.data;
        const newData = [...rowData];
        newData.splice(event.overIndex, 0, newData.splice(event.node.rowIndex, 1)[0]);
        // Assuming you have an action to reorder data in Redux
        dispatch(updateStoreData(newData)); 
    };

    function handleAddNew (){
        setInputSection(true)
    }
    const stopEditing = () => {
        gridRef.current?.api.stopEditing();
      };
    console.log(rowData[rowData.length-1])
    return(
        <>
            {<AgTable 
                rowData={rowData} 
                columnDefs={[ {
                    headerName: "Actions",
                    rowDrag:true,
                    cellRenderer: (params:any) => (
                        <button onClick={() => handleDelete(params.data.id)}>Delete</button>
                    ),
                  },...colDefs]} 
                defaultColDef={defaultColDef} 
                rowDragManaged={true}
                animateRows={true}
                onRowDragEnd={onRowDragEnd}
                onCellEditingStopped={onCellEditingStopped}
                stopEditingWhenCellsLoseFocus={true} // ✅ Ensures blur behavior
                singleClickEdit={true}
            />}
            <div className={`bg-white pl-2 relative`} >
            {showInputSection ? <AddItems colDefs={colDefs} rowlastData={rowData[rowData.length-1]} ComponentType="Stores" setInputSection={setInputSection}/>
                :<Button onClick={handleAddNew} color={`${ButtonStandardSize} bg-orange-300`}>Add Store</Button>
            }
            </div>

        </>
    );
}
export default Store;