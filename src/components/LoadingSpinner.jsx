import React from "react";
import "../../src/styles/LoadingSpinner.css";

const LoadingSpinner = ({ 
  size = "medium", 
  fullScreen = true, 
  text = "", 
  overlay = false,
  color
}) => {
  return (
    <div className={`loading-spinner ${fullScreen ? "fullscreen" : ""} ${overlay ? "with-overlay" : ""}`}>
      <div className={`spinner-container ${size}`}>
        <div 
          className="loading-spinner__circle" 
          style={color ? { borderTopColor: color, borderBottomColor: color } : {}}
        ></div>
        {text && <p className="loading-spinner__text">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;