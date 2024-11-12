import React from "react";
import TextInput from '../TextInput/TextInput';
import Checkbox from '../Checkbox';
import styles from './Form.module.css';
import MultilineTextInput from "../MultilineTextInput/MultilineTextInput";

const FormField = ({ required, id, text, type, checked, checkboxSize, value, onChange, disabled, maxWidth, placeholder, maxLength }) => {
    const fieldFlex = 1.75
    return (
        <div className={styles.formFieldContainer}>
            <div className={styles.labelDiv}>
                {required && <span className={styles.requiredAsterisk}>*</span>}
                <label>{text}</label>
            </div>
            {type === "checkbox" ? (
                <div className={styles.checkboxContainer}>
                    <Checkbox
                        id={id}
                        checked={checked}
                        onChange={onChange}
                        disabled={disabled}
                        checkboxSize={checkboxSize}
                    />
                </div>
            ) : type === "multilineTextInput" ? (
                <MultilineTextInput
                    maxWidth={maxWidth}
                    id={id}
                    value={value}
                    onChange={onChange} 
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={maxLength}
                    required={required}
                    flex={fieldFlex}
                />
            ) : type === "label" ? (
                <div className={styles.labelField}>
                    <label>{value}</label>
                </div>
            ) : (
                <TextInput
                    maxWidth={maxWidth}
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange} 
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={maxLength}
                    required={required}
                    flex={fieldFlex}
                /> 
            )}
        </div>
    );
};

export default FormField;
