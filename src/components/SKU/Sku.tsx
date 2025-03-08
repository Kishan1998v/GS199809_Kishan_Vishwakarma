import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
function Sku(){
    const SKUs = useSelector((state: RootState) => state.excel.SKUs);
    console.log(SKUs,'store')
    return(
        <div>
            <h1>Sku</h1>
        </div>
    );
}
export default Sku;