function Header() {
    return (
        <header className="">
            <img src='src/assets/gsynergy_logo.png' alt="GSynergy Logo" width="20px" />
            <text>Data Viewer</text>
            <section className="header_rightsection">
                <button className="upload_button">Upload</button>
                <button className="login">Login</button>
            </section>
        </header>
    );
}

export default Header;
