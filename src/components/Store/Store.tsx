import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AgTable from "../AgTable/AgTable";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from "../Common/Button";
import { ButtonStandardSize, StoreMap } from "../const";
import { deleteStoreData, updateStoreData } from "../UploadExcel/excelSlice";
import AddItems from "../AddItem/AddItem";

function Store(){
    let dispatch = useDispatch();
    //Row Data 
    const rowData:any = useSelector((state: RootState) => state.excel.Stores);
    // Column Definitions: Defines the columns to be displayed.
    useEffect(()=>{},[rowData])
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