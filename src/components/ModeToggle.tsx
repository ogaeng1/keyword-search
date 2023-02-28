import React, { useState } from "react";
import "../styles/toggle.scss";

const ModeToggle = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    const onToggleState = () => {
        setToggle(!toggle);
        toggle ? document.documentElement.setAttribute("data-theme", "dark")
            : document.documentElement.setAttribute("data-theme", "light");
    }
    return (
        <div className="toggle-wrap">
            {toggle ? 
                <div className={`toggle ${toggle ? "checked" : null}`} onClick={onToggleState}><span>🌜</span></div> :
                <div className={`toggle-on ${toggle ? "checked" : null}`} onClick={onToggleState}><span>🌞</span></div>
            }
        </div>
    );
}

export default ModeToggle;