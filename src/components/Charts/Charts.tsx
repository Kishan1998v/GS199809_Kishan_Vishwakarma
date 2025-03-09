import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const prePareChartData = (store:any,storeData:any)=>{
    const weekWiseData: any = {};
    console.log(storeData)
    let plann = Object.entries(storeData.Calculations).filter(([_, value]: any) => value.Store === store)
    let weeklist = storeData.Calender.map((c: any) => c.Week);
    console.log(weeklist)
    weeklist.forEach((week:any) => {
        weekWiseData[week] = {
            Week: week,
            "Sales Dollars": 0,
            "GM Dollars": 0,
            "GM %": 0
        };
    });
    Object.values(plann).forEach((record: any) => {
        const { Week, "Sales Dollars": salesDollars, "GM Dollars": gmDollars} = record[1]
        console.log(weekWiseData[Week]["Sales Dollars"] , salesDollars)
        weekWiseData[Week]["Sales Dollars"] += salesDollars;
        weekWiseData[Week]["GM Dollars"] += gmDollars;
    });

    Object.keys(weekWiseData).forEach((week) => {
        weekWiseData[week]["GM %"] = 
            weekWiseData[week]["Sales Dollars"] !== 0 
                ? parseFloat(((weekWiseData[week]["GM Dollars"] / weekWiseData[week]["Sales Dollars"]) * 100).toFixed(6)) 
                : 0;
    });
    console.log(weekWiseData)
    return Object.values(weekWiseData);
}

const SelectStore = React.memo(({store,data,setStore}:any)=>{
    return(
        <div className="flex flex-col space-y-2 mb-5 mt-3">
            <label className="text-sm font-medium text-gray-700">Select Store</label>
            <select
                className="w-[12rem] text-sm p-1 border border-blue-200 rounded-md focus:outline-none"
                value={store}
                onChange={(e) => setStore(e.target.value)}
            >
                <option className="text-sm" value="" disabled>Select an option</option>
                {data.map((option:any) => {
                    return (<option className="text-sm" key={option.Seq} value={option.ID}>
                        {option.Label}
                    </option>)
                })}
            </select>
        </div>
    )
})

const Charts = () => {
  const Data = useSelector((state: RootState) => state.excel);
  const [store, setStore] = useState(Data.Stores[0].ID)  
  const [options, setOptions] = useState<any>({
    height:399,
    series: [
        { type: "bar", xKey: "Week", yKey: "GM Dollars" },
        { type: "line", xKey: "Week", yKey: "GM %", yName: "GM Percentage", marker: { enabled: true }}
    ],
    axes:[
        { position: "bottom", type: "category" }, // X-Axis (Week)
        { position: "left", type: "number", keys: ["GM Dollars"], title: { text: "GM Dollars" } }, // Left Y-Axis
        { position: "right", type: "number", keys: ["GM %"], title: { text: "GM %" }, label: { format: ".0%" } } // Right Y-Axis
    ]
  });
  useEffect(()=>{
       let weekData = prePareChartData(store,Data)
        setOptions((val:any)=> ({...val ,data:weekData}))
  },[store])
  return( 
        <div className="border border-l-1 border-zinc-300 pl-3">
            <SelectStore store={store} data={Data.Stores} setStore={setStore} />
            <AgCharts options={options} />
        </div>)
};
export default Charts;