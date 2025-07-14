import React from "react";
import {NavLink} from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <header className="w-[100%] h-[56px] bg-gray-800 text-white">
            <div className="flex ml-8 gap-6 h-[100%]">
                <NavLink to="/" className="leading-[56px]">
                    Movies
                </NavLink>
                <NavLink to="/favorites" className="leading-[56px]">
                    Favorite Movies
                </NavLink>
            </div>
        </header>
    )
}
export default NavBar