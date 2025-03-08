import React, { useState } from "react";
import * as XLSX from "xlsx";
import Loader from "../Common/Loading";
import {useDispatch} from "react-redux";
import {setExcelData} from "./excelSlice";


const Upload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

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
                            rowObject[header] = row[index] || null;
                        });
                        return rowObject;
                    });
                    console.log(sheetName)
                    dispatch(setExcelData({ sheetName:sheetName , data: formattedData }));
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

    return (
        <div>
            <input type="file" accept=".xls,.xlsx" onChange={handleFileSelection} />
            <button
                className="bg-indigo-500 ..." 
                onClick={handleProcessData}
                disabled={!selectedFile || isLoading}
                style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
            >
                {isLoading ? <Loader size={4} thickness={2}/> : "Process File"}
            </button>
        </div>
    );
};

export default Upload;
