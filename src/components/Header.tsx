import Upload from "./UploadExcel/UploadExcel";
import { useDispatch,useSelector } from "react-redux";
import { setPopupState} from "./UploadExcel/excelSlice";
import { RootState } from "../../store/store";

function Header() {
    const dispatch = useDispatch();
    const open = useSelector((state: RootState) => state.excel.open);
    const handlePopup = () => {
        dispatch(setPopupState(true));
    }
    return (
        <>
        <header className="">
            <img src='src/assets/gsynergy_logo.png' alt="GSynergy Logo" width="20px" />
            <text>Data Viewer</text>
            <section className="header_rightsection">
                <button onClick={handlePopup} className="upload_button">Upload</button>
                <button className="login">Login</button>
            </section>
        </header>
        {open && <Upload />}
        </>
    );
}

export default Header;
