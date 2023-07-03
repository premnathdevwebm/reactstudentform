import React from 'react';
import ReactDOM from "react-dom";
import styles from "./ModalComp.module.css"
const Modal = ({ children }) => {
    return ReactDOM.createPortal(
      <div className={styles["modal-overlay"]}>
        <div className={styles["modal-content"]}>{children}</div>
      </div>,
      document.getElementById('modlelayout') 
    );
  };
  
  export default Modal;