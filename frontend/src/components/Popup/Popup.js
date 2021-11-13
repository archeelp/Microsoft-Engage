import React from "react";
import PopupReact from "reactjs-popup";
import "./Popup.scoped.css";

const contentStyle = { background: "rgba(255,255,255,0)", borderStyle: "none" };
const overlayStyle = { background: "rgba(0,0,0,0.5)" };

const Popup = ({ Button, Modal, ...props }) => {
  return (
    <PopupReact
      {...{ contentStyle, overlayStyle }}
      trigger={Button}
      modal
      closeOnDocumentClick
    >
      {(close) => (
        <div className="mx-4 my-2">
          <button className="close" onClick={close}>
            &times;
          </button>
          <Modal close={close} {...props} />
        </div>
      )}
    </PopupReact>
  );
};

export default Popup;
