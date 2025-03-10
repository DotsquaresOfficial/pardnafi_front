import { useState } from "react";

const ConfirmationPopup = ({ isOpen, closePopup,joinGroupHandler }) => {



    return (
        <div>


            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>Are you sure?</h2>
                        <p>Do you really want to proceed?</p>
                        <div className="popup-buttons">
                            <button className="confirm-btn" onClick={()=>joinGroupHandler()}>Yes</button>
                            <button className="cancel-btn" onClick={()=>closePopup()}>No</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ConfirmationPopup;
