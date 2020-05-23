import React from "react";
import { Link } from "react-router-dom";


let Social = () => {
    return (
        <div className="social-links">
            <Link to="/" className="icon-instagram social-item"></Link>
            <Link to="/" className="icon-twitter social-item"></Link>
            <Link to="/" className="icon-facebook social-item"></Link>
            <Link to="/" className="icon-youtube social-item"></Link>
        </div>
    );
};

export default Social;
