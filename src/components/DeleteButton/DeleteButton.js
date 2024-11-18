import React from "react";
import styles from './DeleteButton.module.css';

function DeleteButton({ onClick, text, disabled=false, type='button', fullWidth=false }) {
    const buttonElement = (
        <button
            className={styles.deleteButton}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {text}
        </button>
    );

    return fullWidth ? buttonElement : <div>{buttonElement}</div>;
}

export default DeleteButton;
