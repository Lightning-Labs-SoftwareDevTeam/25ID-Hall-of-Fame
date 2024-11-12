import React from "react";
import styles from './Form.module.css';

const Form = ({ onSubmit, children }) => {
    return (
        <form onSubmit={onSubmit} className={styles.alignedForm}>
            {children}
        </form>
    );
};

export default Form;
