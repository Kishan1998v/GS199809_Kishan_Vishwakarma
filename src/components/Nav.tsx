import React from "react";
import { navigation } from "./const";

interface NavProps {
    onNavClick: (component: React.ComponentType) => void;
}

const Nav: React.FC<NavProps> = ({ onNavClick }) => {
    return (
        <nav>
            {navigation.map((navItem) => (
                <div key={navItem.id} onClick={() => onNavClick(navItem.component)}>
                    {navItem.name}
                </div>
            ))}
        </nav>
    );
};

export default Nav;
