import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useMemo, useState } from "react";
import AgTable from "../AgTable/AgTable";
import Button from "../Common/Button";
import { ButtonStandardSize } from "../const";
import AddItems from "../AddItem/AddItem";

function Sku(){
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
    return(
        <>
            <AgTable rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} />
            <div className={`bg-white pl-2 relative`} >
                {showInputSection ? <AddItems colDefs={colDefs} rowlastData={rowData[rowData.length-1]} ComponentType="SKUs" setInputSection={setInputSection}/>
                  :<Button onClick={handleAddNew} color={`${ButtonStandardSize} bg-orange-300`}>Add Store</Button>
                }
            </div>
        </>
    );
}
export default Sku;