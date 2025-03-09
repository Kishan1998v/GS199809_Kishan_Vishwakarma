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
                editable : value.toLowerCase() !== "id" && value.toLowerCase() !== 'seq',
                rowDrag:value.toLowerCase() == 'seq' ,
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
        let newStoreData = rowData.filter((val:any)=> val.ID !== id)
        dispatch(deleteStoreData(newStoreData)); // Dispatch Redux action to delete row
    };

    // Handle row drag and drop
    const onRowDragEnd = (event: any) => {
        const movedRow = event.node.data;
        const fromIndex = event.node.rowIndex;
        const toIndex = event.overIndex;
    
        if (fromIndex === toIndex || toIndex == null) return; // Prevent unnecessary updates
    
        // a new array with updated positions
        const newData = [...rowData];
        const [removed] = newData.splice(fromIndex, 1);
        newData.splice(toIndex, 0, removed);
    
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
                    cellRenderer: (params:any) => (
                        <Button color={`p-2 bg-blue-600 rounded-lg`} onClick={() => handleDelete(params.data.ID)}>
                            <img width="13" height="13" src="https://img.icons8.com/material-rounded/24/FFFFFF/delete.png" alt="delete"/>
                        </Button>
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