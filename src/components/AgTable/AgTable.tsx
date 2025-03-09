import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions, themeBalham } from 'ag-grid-community';
import { themeQuartz } from 'ag-grid-community';

// to use myTheme in an application, pass it to the theme grid option
const myTheme = themeBalham
// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);
// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy"});

export default function AgTable({rowData ,columnDefs,defaultColDef,...props} :any){
    return(
        <div className="ag-theme-quartz" style={{ height: 400 }}>
            <AgGridReact rowData={rowData}  columnDefs={columnDefs} defaultColDef={defaultColDef} 
             {...props}
            />
        </div>
    )
}