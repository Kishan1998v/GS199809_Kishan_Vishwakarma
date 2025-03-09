import { ButtonStyle } from "../const";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    color?: string;
}
export default function Button({ color, onClick, disabled, children, ...props }: ButtonProps){
    let twStyle = `${color??ButtonStyle}` 
    return(
        <button onClick={onClick} disabled={disabled} type="button" className={twStyle} {...props}>
           {children}
        </button>
    )
}