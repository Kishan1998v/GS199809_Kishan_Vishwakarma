import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
function Store(){
    const Store = useSelector((state: RootState) => state.excel.Stores);
    return(
        <div>
            <h1>Store</h1>
        </div>
    );
}
export default Store;