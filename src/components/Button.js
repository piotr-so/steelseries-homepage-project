import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({ history, location, match, staticContext, text, sectionIdToScroll, linkTo, ...rest }) => {
    return (
        <button
            className={styles.button}
            {...rest}
            onClick={sectionIdToScroll ? () => document.getElementById(`${sectionIdToScroll}`).scrollIntoView(false) 
                : 
                () => {history.push(linkTo)}
            }
        >
            {text.toUpperCase()}
        </button>
    )
}

export default withRouter(Button);