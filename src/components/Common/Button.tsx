import { ButtonStyle } from "../const";

interface ButtonProps{
    onClick?: () => void;
    disabled?: boolean;
    children?:React.ReactNode;
    color?:string;
}
export default function Button({color ,onClick,disabled,children}:ButtonProps){
    let twStyle = `${color??ButtonStyle}` 
    return(
        <button onClick={onClick} disabled={disabled} type="button" className={twStyle}>
           {children}
        </button>
    )
}