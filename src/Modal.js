import React from "react";

function Modal({ closeModal, children, show }) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <div className="modal-content">
        <button className="close" onClick={closeModal}>
          &times;
        </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
