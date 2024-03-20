import React, { CSSProperties } from "react";
import "./Navbar.css";

interface NavBarProps {
    createFunction: () => void
}

const NavBar: React.FC<NavBarProps> = ({createFunction}) => {
    const renderGridSquares = (count: number) => {
        const squares = [];

        for (let i = 0; i < count; i++) {
            squares.push(
                <div 
                    key={i}
                    className="sidebar-grid-item"
                    onClick={createFunction}
                ></div>
            );
        }

        return squares
    }

    return (
        <div className="sidebar">
            <div className="sidebar-grid-container">
                {renderGridSquares(20)}
            </div>
        </div>
    );
}

export default NavBar;