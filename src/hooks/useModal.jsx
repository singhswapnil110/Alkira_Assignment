import React, { useState } from "react";

export const useModal = (component, callBack = () => {}) => {
  const [modalState, setModalState] = useState(false);
  const closeModal = () => {
    setModalState(false);
    callBack();
  };
  return {
    setModalState: setModalState,
    modalComponent: (
      <div
        className="modal-container"
        onClick={closeModal}
        visible={modalState.toString()}
      >
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          visible={modalState.toString()}
        >
          <div className="close-button" onClick={closeModal}>
            X
          </div>
          {component}
        </div>
      </div>
    ),
  };
};
