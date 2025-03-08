import React, { useState } from "react";
import "./Home.css";
import Nav from "./Nav";
import Upload from "./UploadExcel/UploadExcel";
import Store from "./Store/Store";

function Home() {
    const [Component, setComponent] = useState<JSX.Element >(<Store/>);
    function onNavClick(Component: React.ComponentType) {
        setComponent(<Component />);
    }
    return (
        <section className="mainSection">
            <Nav onNavClick={onNavClick} />
            <main>
                {Component} {/* Render the selected component */}
                <Upload />
            </main>
        </section>
    );
}

export default Home;
