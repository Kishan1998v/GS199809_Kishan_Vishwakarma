import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useMemo } from "react";
import AgTable from "../AgTable/AgTable";
import Button from "../Common/Button";
import { ButtonStandardSize } from "../const";
function Sku(){
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
        </>
    );
}
export default Sku;