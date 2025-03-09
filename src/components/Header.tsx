import Upload from "./UploadExcel/UploadExcel";
import { useDispatch,useSelector } from "react-redux";
import { setPopupState} from "./UploadExcel/excelSlice";
import { RootState } from "../store/store";
import Button from "./Common/Button";
import logo from '../assets/gsynergy_logo.svg'
import { ButtonStandardSize } from "./const";

function Header() {
    const dispatch = useDispatch();
    const open = useSelector((state: RootState) => state.excel.open);
    const handlePopup = () => {
        dispatch(setPopupState(true));
    }
    return (
        <>
        <header className="bg-white">
            <link rel="icon" type="image/svg+xml" href="" />
            <img src={logo} alt="GSynergy Logo" height="40px" />
            <text>Data Viewer</text>
            <section className="header_rightsection">
                <Button color={`bg-stone-200 ${ButtonStandardSize} hover:bg-stone-400 transition `} onClick={handlePopup} >Upload file</Button>
                <Button color={`bg-blue-200  ${ButtonStandardSize} hover:bg-blue-400 transition`} >login</Button>
            </section>
        </header>
        {open && <Upload />}
        </>
    );
}

export default Header;
