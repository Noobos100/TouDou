import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
function Modal({ closeModal, children, show }) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <div className="modal-content">
        <button className="cancel-button" onClick={closeModal}>
            <CancelIcon />
        </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
