import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
function Planning(){
    const {Planning,Calculations} = useSelector((state: RootState) => state.excel);
    console.log(Planning,'store')
    console.log(Calculations,'store')
    return(
        <div>
            <h1>Planning</h1>
        </div>
    );
}
export default Planning;