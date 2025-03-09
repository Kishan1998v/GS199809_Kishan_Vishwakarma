import React, { useState } from "react";
import * as XLSX from "xlsx";
import Loader from "../Common/Loading";
import { useDispatch } from "react-redux";
import { setExcelData,setPopupState} from "./excelSlice";

import Button from "../Common/Button";



const Upload: React.FC = () => {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
            alert("Please upload a valid Excel file (.xls or .xlsx)");
            return;
        }

        setSelectedFile(file);
    };

    const handleProcessData = () => {
        console.log(selectedFile)
        if (!selectedFile) {
            alert("No file selected! Please choose an Excel file first.");
            return;
        }

        setIsLoading(true);

        const reader = new FileReader();
        reader.readAsBinaryString(selectedFile);

        reader.onload = (e) => {
            if (!e.target?.result) {
                setIsLoading(false);
                alert("Error reading the file. Please try again.");
                return;
            }

            const binaryData = e.target.result;
            const workbook = XLSX.read(binaryData, { type: "binary" });

            workbook.SheetNames.forEach((sheetName) => {
                const worksheet = workbook.Sheets[sheetName];
                const sheetArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (sheetArray.length > 1) {
                    const headers = sheetArray[0];
                    const dataRows = sheetArray.slice(1);

                    const formattedData = dataRows.map((row) => {
                        let rowObject: Record<string, any> = {};
                        headers.forEach((header: string, index: number) => {
                            if(index==0 && header=="Seq No."){
                                rowObject['Seq'] = row[index] || null
                            }
                            else{
                                rowObject[header] = row[index] || null;
                            }
                        });
                        return rowObject;
                    });
                    console.log(sheetName)
                    dispatch(setExcelData({ sheetName: sheetName, data: formattedData }));
                }
            });
            setIsLoading(false);
            alert("File processed successfully!");
        };

        reader.onerror = () => {
            setIsLoading(false);
            alert("Error reading the file. Please try again.");
        };
    };

    function handlePopupClose() {
        dispatch(setPopupState(false))
    }

    return (

        <div className=" w-100 h-100 r-0 fixed z-10 right-1 top-14 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="absolute right-3 top-3 cursor-pointer" onClick={handlePopupClose}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Upload Excel</h5>
            <input
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                        file:rounded-lg file:border-0 file:text-xm file:font-medium cursor-pointer 
                        file:bg-stone-600 file:text-white hover:file:bg-stone-700 mb-2"
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileSelection} />
            <Button
                onClick={() => handleProcessData()}
                disabled={!selectedFile || isLoading}
            >
                {isLoading ? <Loader size={4} thickness={2} /> : "Process File"}
            </Button>
        </div>

    );
};

export default Upload;
