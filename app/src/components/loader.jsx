import React from "react";

import '../styles/common/loader.css';

const Loader = ({ width, borderWidth, color }) => {
    return (
        <div className="loader" style={{ width: width, height: width, borderWidth: borderWidth, borderLeftColor: color }}></div>
    );
};

export default Loader;