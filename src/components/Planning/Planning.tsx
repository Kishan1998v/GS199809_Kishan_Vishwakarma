import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useMemo, useRef, useState } from "react";
import AgTable from "../AgTable/AgTable";
import { AgGridReact } from "ag-grid-react";
import { updateCalculation, updatePlanner } from "../UploadExcel/excelSlice";

interface colDefs {
    field?: string;
    headerName: string;
    pinned?: string;
    children?: any
}
interface rowDefs {
    Store: String;
    SKU: String;
}
interface PlanningData {
    [key: string]: {
        Store: string;
        SKU: string;
        Week: string;
        "Sales Units"?: number | null;
    };
}
interface RowData {
    Store: string;
    SKU: string;
    [key: string]: string | number; // Dynamic keys for week data
}


function prepareRowData(
    storeData: any,
    skuData: any,
    planningData: PlanningData,
    calculationData: any,
    calendarData: any,
    page: number = 1,
    pageSize: number = 100
): RowData[] {
    const storeMap: Record<string, string> = Object.fromEntries(storeData.map((s: any) => [s.ID, s.Label]));
    const skuMap: Record<string, string> = Object.fromEntries(skuData.map((s: any) => [s.ID, s.Label]));

    const uniqueWeeks = calendarData.map((c: any) => c.Week); // Extract all weeks

    const rowDataMap = new Map<string, RowData>(); // Use Map for efficient lookups

    const keys = Object.keys(planningData);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]; // Example: "ST035_SK00158_W01"
        const [storeID, skuID, week] = key.split('_');

        const rowKey = `${storeID}_${skuID}`;
        if (!rowDataMap.has(rowKey)) {
            rowDataMap.set(rowKey, {
                Store: storeMap[storeID] || storeID,
                SKU: skuMap[skuID] || skuID,
            });
        }

        const row = rowDataMap.get(rowKey)!;
        const planning = planningData[key] || {};
        const calculation = calculationData?.[key] || {};

        const salesUnits = planning["Sales Units"] ?? 0;
        const salesDollars = calculation["Sales Dollars"];
        const costDOllars = calculation["Cost Dollars"];
        const GM = salesDollars - costDOllars
        const profitPct = GM / salesDollars

        row[`${week}_unit`] = salesUnits;
        row[`${week}_grossPrice`] = salesDollars;
        row[`${week}_costPrice`] = GM;
        row[`${week}_profitPct`] = profitPct;
    }

    // Ensure all weeks exist for each row
    for (const row of rowDataMap.values()) {
        for (const week of uniqueWeeks) {
            if (!(week + "_unit" in row)) row[`${week}_unit`] = 0;
            if (!(week + "_grossPrice" in row)) row[`${week}_grossPrice`] = 0;
            if (!(week + "_costPrice" in row)) row[`${week}_costPrice`] = 0;
            if (!(week + "_profitPct" in row)) row[`${week}_profitPct`] = 0;
        }
    }

    // Implement pagination
    const allRows = Array.from(rowDataMap.values());
    const startIdx = (page - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, allRows.length);

    return allRows.slice(startIdx, endIdx);
}



const generateColumnDefs = (calendarMap: any) => {
    const monthGroups: any = {};

    // Group weeks under respective months
    calendarMap.forEach(({ Week, "Month Label": monthLabel, "Week Label": weekLabel, }: any) => {
        if (!monthGroups[monthLabel]) {
            monthGroups[monthLabel] = [];
        }
        monthGroups[monthLabel].push({
            headerName: weekLabel,
            children: [
                { field: `${Week}_unit`, headerName: "Sales Units", editable: true },
                {
                    field: `${Week}_grossPrice`,
                    headerName: "Sales Dollars",
                    editable: false,
                    valueFormatter: (params: any) => params.value ? `$${Number(params.value).toFixed(2)}` : "$0.00"
                },
                {
                    field: `${Week}_costPrice`,
                    headerName: "GM Dollars",
                    editable: false,
                    valueFormatter: (params: any) => params.value ? `$${Number(params.value).toFixed(2)}` : "$0.00"
                },
                {
                    field: `${Week}_profitPct`,
                    headerName: "GM Percent",
                    editable: false,
                    valueFormatter: (params: any) => params.value ? `${(params.value * 100).toFixed(2)}%` : "0%",
                    cellStyle: (params: any) => {
                        const value = params.value * 100;
                        if (value >= 40) return { backgroundColor: "green", color: "white" };
                        if (value >= 10) return { backgroundColor: "yellow", color: "black" };
                        if (value > 5) return { backgroundColor: "orange", color: "white" };
                        return { backgroundColor: "red", color: "white" };
                    },
                },
            ],
        });
    });

    // Construct columnDefs
    return [
        { field: "Store", headerName: "Store", pinned: "left" },
        { field: "SKU", headerName: "SKU", pinned: "left" },
        ...Object.entries(monthGroups).map(([monthLabel, weeks]) => ({
            headerName: monthLabel,
            children: weeks,
        })),
    ];
};
const onCellValueChanged = (params: any, SKUs: any, Stores: any, dispatch: any) => {
    const { data, colDef, newValue } = params;

    if (colDef.field.includes("_unit")) {
        const week = colDef.field.split("_")[0];
        const units = Number(newValue) || 0;
        // Assuming you have some way to get sales dollars
        const skuMap: any = SKUs.find((val: any) => val.Label === data.SKU) || null;
        const StoreMap: any = Stores.find((val: any) => val.Label === data.Store) || null;
        if (skuMap) {
            let costPriceofNunit = units * skuMap.Cost;
            let sellPriceOfNunit = units * skuMap.Price;
            data[`${week}_grossPrice`] = sellPriceOfNunit;
            data[`${week}_costPrice`] = sellPriceOfNunit - costPriceofNunit;
            data[`${week}_profitPct`] = (sellPriceOfNunit - costPriceofNunit) / sellPriceOfNunit // Store as decimal for styling
            params.api.applyTransaction({ update: [data] });
            if (StoreMap) {
                let planId = `${StoreMap.ID}_${skuMap.ID}_${week}`;
                dispatch(updatePlanner({
                    id: planId, value: {
                        Store: StoreMap.ID,
                        SKU: skuMap.ID,
                        Week: week,
                        "Sales Units": units
                    }
                }))
                dispatch(updateCalculation({
                    id: planId, value: {
                        Store: StoreMap.ID,
                        SKU: skuMap.ID,
                        Week: week,
                        'Sales Units': units,
                        'Sales Dollars': sellPriceOfNunit,
                        'Cost Dollars': costPriceofNunit,
                        'GM Dollars': sellPriceOfNunit - costPriceofNunit,
                        'GM %': (sellPriceOfNunit - costPriceofNunit) / sellPriceOfNunit,
                    }
                }))

            }
        }


    }
};

function Planning() {
    const dispatch = useDispatch()
    // const {Planning,Calculations} = useSelector((state: RootState) => state.excel);
    const { Calender, Planning, SKUs, Stores, Calculations } = useSelector((state: RootState) => state.excel);



    const [colDefs, setColDefs] = useState<Array<colDefs>>([])
    const [rowDefs, setRowDefs] = useState<Array<rowDefs>>([])
    const [page, setPage] = useState<number>(1);
    const pageSize = 100; // Adjustable

    const rowData = useMemo(() => {
        return prepareRowData(Stores, SKUs, Planning, Calculations, Calender, page, pageSize);
    }, [Stores, SKUs, Planning, Calculations, page]);
    useEffect(() => {
        setRowDefs(rowData)
        setColDefs(generateColumnDefs(Calender))
    }, [page])

    const defaultColDef = {
        editable: false,
    };
    const gridRef = useRef<AgGridReact>(null);
    const onPageChange = () => {
        if (gridRef.current) {
            const currentPage = gridRef.current.api;
            console.log("Current Page:", currentPage);
            setPage(1)
        }
    };

    return (
        <AgTable rowData={rowDefs} columnDefs={colDefs} defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={pageSize}
            onPaginationChanged={onPageChange}
            onCellValueChanged={(e: any) => { onCellValueChanged(e, SKUs, Stores, dispatch) }}
            ref={gridRef}
        />
    );
}
export default Planning;