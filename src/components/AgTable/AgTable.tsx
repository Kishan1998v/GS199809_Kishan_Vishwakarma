import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';

// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);
// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy"});

export default function AgTable({rowData ,columnDefs,defaultColDef,...props} :any){
    // const gridRef = useRef<any>(null);
    // const [currentPage, setCurrentPage] = useState(0);
    // const [pageSize, setPageSize] = useState(10);

    // const onPaginationChanged = () => {
    //     if (gridRef.current && gridRef.current.api) {
    //         const api = gridRef.current.api;
    //         if (api.paginationIsLastPageFound()) {
    //             setCurrentPage(api.paginationGetCurrentPage() + 1);
    //         }
    //     }
    // };

    // useEffect(() => {
    //     if (gridRef.current && gridRef.current.api) {
    //         gridRef.current.api.paginationSetPageSize(pageSize);
    //     }
    // }, [pageSize]);
    return(
        <div className="ag-theme-quartz" style={{ height: 510 }}>
            <AgGridReact rowData={rowData}  columnDefs={columnDefs} defaultColDef={defaultColDef} 
             {...props}
            />
        </div>
    )
}