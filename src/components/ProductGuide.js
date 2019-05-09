import React, { Component } from 'react';
import styles from './ProductGuide.module.scss';
import surveyData from '../assets/data/survey-data.json';

class ProductGuide extends Component {
    render() {
        const { textToRender } = this.props;
        return (
            <div className={styles.wrapper}>
                <h1>FIND THE PERFECT<br />GAMING {textToRender.toUpperCase()} FOR YOU</h1>
                <div className={styles.cardWrapper}>
                    <div className={`${styles.card} ${styles.card1}`}>
                        <div className={styles.content}>
                            <h2>QUESTION <span>#1</span></h2>
                            <p>{surveyData['Mouse'].card1.question}</p>
                            <div className={styles.variantsWrapper}>
                                {surveyData['Mouse'].card1.answers.map(variants => (
                                    <div>{variants}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.card} ${styles.card2}`}></div>
                    <div className={`${styles.card} ${styles.card3}`}></div>
                </div>

            </div>
        );
    }
}

export default ProductGuide;