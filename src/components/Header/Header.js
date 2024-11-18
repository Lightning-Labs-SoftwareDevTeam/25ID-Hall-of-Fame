import React from "react";
import styles from './Header.module.css';

function Header({ text }) {
    return (
        <header className={styles.header}>
            {text}
        </header>
    )
}

export default Header;