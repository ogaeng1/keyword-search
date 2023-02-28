import React, { useState, useEffect } from "react";
import "../styles/toggle.scss";

const ModeToggle = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    const onToggleState = () => {
        toggle ? document.documentElement.setAttribute("data-theme", "dark")
            : document.documentElement.setAttribute("data-theme", "light");
        setToggle(!toggle);
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", "light");
        setToggle(true);
      }, [])

    return (
        <div className="toggle-wrap">
            {toggle ? 
                <div className="toggle" onClick={onToggleState}><span>🌞</span></div> :
                <div className="toggle" onClick={onToggleState}><span>🌜</span></div>
            }
        </div>
    );
}

export default ModeToggle;