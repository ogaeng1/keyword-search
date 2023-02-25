import React from "react";
import "../styles/layout.scss";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children } : LayoutProps) => {
    return (
        <div className="layout">{children}</div>
    )
}

export default Layout;