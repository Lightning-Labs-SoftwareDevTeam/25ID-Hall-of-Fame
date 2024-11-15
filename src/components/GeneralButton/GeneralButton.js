import React from "react";
import styles from './GeneralButton.module.css';

function GeneralButton({ onClick, text, disabled=false, type='button', fullWidth=false }) {
    const buttonElement = (
        <button
            className={styles.generalButton}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {text}
        </button>
    );

    return fullWidth ? buttonElement : <div>{buttonElement}</div>;
}

export default GeneralButton;
