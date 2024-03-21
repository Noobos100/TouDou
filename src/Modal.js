import React from "react";

function Modal({ closeModal, children }) {
    return (
        <div className="modal">
            <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
                {children}
            </div>
        </div>
    );
}

export default Modal;
