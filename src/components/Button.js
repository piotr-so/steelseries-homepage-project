import React from 'react';
import styles from './Button.module.scss';

const Button = ({ text }) => {
    return (
        <button className={styles.button}>{text.toUpperCase()}</button>
    )
}

export default Button;