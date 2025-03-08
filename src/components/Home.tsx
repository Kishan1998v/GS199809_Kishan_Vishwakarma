import React, { useState } from "react";
import "./Home.css";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Store from "./Store/Store";


function Home() {
    const [Component, setComponent] = useState<JSX.Element >(<Store/>);
    
    const excelData = useSelector((state: RootState) => state.excel.excelData);
    console.log(excelData,'excel')
    function onNavClick(Component: React.ComponentType) {
        setComponent(<Component />);
    }
    return (
        <section className="mainSection">
            <Nav onNavClick={onNavClick} />
            <main>
                {Component} {/* Render the selected component */}
            </main>
        </section>
    );
}

export default Home;
