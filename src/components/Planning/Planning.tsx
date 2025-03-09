import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useMemo } from "react";
import AgTable from "../AgTable/AgTable";
function Planning(){
    // const {Planning,Calculations} = useSelector((state: RootState) => state.excel);
    const rowData = useSelector((state: RootState) => state.excel.Planning);
        // Column Definitions: Defines the columns to be displayed.
    const colDefs = useMemo<Array<{ field: string }>>(() => {
        if (!rowData.length) return []; // Handle empty rowData to avoid errors
        return Object.keys(rowData[0]).map((value) => ({ field: value }));
    }, [rowData]); // Add rowData as a dependency
    const defaultColDef = {
        editable: false,
        };

    return(
        <AgTable rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} />
    );
}
export default Planning;