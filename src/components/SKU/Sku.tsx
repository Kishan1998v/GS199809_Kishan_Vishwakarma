import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useMemo, useState } from "react";
import AgTable from "../AgTable/AgTable";
import Button from "../Common/Button";
import { ButtonStandardSize } from "../const";
import AddItems from "../AddItem/AddItem";
import { deleteSkuData } from "../UploadExcel/excelSlice";

function Sku(){
    let dispatch = useDispatch()
    const [showInputSection , setInputSection] = useState(false)
    function handleAddNew (){
        setInputSection(true)
    }
    //Row Data 
    const rowData = useSelector((state: RootState) => state.excel.SKUs);
    // Column Definitions: Defines the columns to be displayed.
    const colDefs = useMemo<Array<{ field: string }>>(() => {
        if (!rowData.length) return []; // Handle empty rowData to avoid errors
        return Object.keys(rowData[0]).map((value) => ({ field: value }));
    }, [rowData]); // Add rowData as a dependency
    const defaultColDef = {
        editable: false,
    };
    const handleDelete = (id: string | number) => {
        let newSKUData = rowData.filter((val:any)=> val.ID !== id)
        dispatch(deleteSkuData(newSKUData)); // Dispatch Redux action to delete row
    }
    return(
        <>
            <AgTable 
                rowData={rowData}
                columnDefs={[{
                    headerName: "Actions",
                    cellRenderer: (params: any) => (
                        <Button color={`p-2 bg-blue-600 rounded-lg`} onClick={() => handleDelete(params.data.ID)}>
                            <img width="13" height="13" src="https://img.icons8.com/material-rounded/24/FFFFFF/delete.png" alt="delete"/>
                        </Button>
                    ),
                }, ...colDefs]}
                defaultColDef={defaultColDef} />
            <div className={`bg-white pl-2 relative`} >
                {showInputSection ? <AddItems colDefs={colDefs} rowlastData={rowData[rowData.length-1]} ComponentType="SKUs" setInputSection={setInputSection}/>
                  :<Button onClick={handleAddNew} color={`${ButtonStandardSize} bg-orange-300`}>Add Store</Button>
                }
            </div>
        </>
    );
}
export default Sku;