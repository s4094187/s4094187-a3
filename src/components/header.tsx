import React from "react";
import { useTotalTracker } from "../components/totaltracker";

const Header = () => {
    const { totalPremium } = useTotalTracker();
    return (
        <div className="header">
            <p>
                Total Premium: {totalPremium !== null ? `$${totalPremium.toFixed(2)}` : "N/A"}
            </p>
        </div>
    );
};

export default Header;