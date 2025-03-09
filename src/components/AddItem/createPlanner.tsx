import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addPlanner } from "../UploadExcel/excelSlice";

function MakePlanner(type:String,id:any){
    let dispatch = useDispatch()
    const projectData = useSelector((state: RootState) => state.excel);
    function CreateDataStore(FinalData:any){
        projectData.SKUs.forEach((val:any)=>{
            let d = {
                'Store': id,
                'SKU'  : val.ID,
                'Week' : '',
                'Sales Units' : 0
            }
            projectData.Calender.forEach(({Week}:any)=>{
                d['Week'] = Week
                FinalData[`${id}_${val.ID}_${Week}`].append(d)
            })
        })
        return true;
    }
    function CreateDataSKUs(FinalData:any){
        projectData.Stores.forEach((val:any)=>{
            let d = {
                'Store': val.ID,
                'SKU'  : id,
                'Week' : '',
                'Sales Units' : 0
            }
            projectData.Calender.forEach(({Week}:any)=>{
                d['Week'] = Week
                FinalData[`${val.ID}_${id}_${Week}`].append(d)
            })
        })
        return true;
    }
    let FinalData:any = {}
    let Operation = new Promise<boolean>((resolve, reject)=>{
        if(type =="Stores"){
            if(CreateDataStore(FinalData)){
                dispatch(addPlanner({...projectData.Planning , ...FinalData}))
                resolve(true);
            }
        }
        else if(type=="SKUs"){
            if(CreateDataSKUs(FinalData)){
                dispatch(addPlanner({...projectData.Planning , ...FinalData}))
                resolve(true);
            }
        }
        else{
            reject(false);
        }
    })
    Operation.then((val) => {
        console.log("Operation completed successfully:", val);
    }).catch((err) => {
        console.error("Operation failed:", err);
    });
    

}
export default MakePlanner;