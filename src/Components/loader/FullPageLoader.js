import React from "react";
import "./loader.css";
function FullPageLoader() {
  return (
    <>
      <div className="loaded">
        <div id="loader-wrapper" style={{visibility: "visible"}}>
          <div id="loader"></div>
          <div className="loader-section section-left"></div>
          <div className="loader-section section-right"></div>
        </div>
      </div>
    </>
  );
}

export default FullPageLoader;
