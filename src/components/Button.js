import React from 'react';
import styles from './Button.module.scss';

const Button = ({ text, sectionIdToScroll }) => {
    return (
        <button
            className={styles.button}
            onClick={sectionIdToScroll ? () => document.getElementById(`${sectionIdToScroll}`).scrollIntoView(false) : undefined}
        >
            {text.toUpperCase()}
        </button>
    )
}

export default Button;