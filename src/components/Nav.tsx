import React, { useState } from "react";
import { navigation } from "./const";

interface NavProps {
    onNavClick: (component: React.ComponentType) => void;
}

const Nav: React.FC<NavProps> = ({ onNavClick }) => {
    const[handleActive,setActive] = useState(navigation[0].id)
    return (
        <nav className="">
            {navigation.map((navItem) => (
                <div className={`${navItem.id == handleActive ? `font-bold text-stone-600`:`text-stone-500`} transition flex justify-left gap-5 mb-3 `} key={navItem.id} onClick={() => {
                    setActive(navItem.id)
                    onNavClick(navItem.component)
                    }}>
                    <img src={navItem.image} alt={navItem.alt} width={23} height={5}/>
                    <span>{navItem.name}</span>
                </div>
            ))}
        </nav>
    );
};

export default Nav;
