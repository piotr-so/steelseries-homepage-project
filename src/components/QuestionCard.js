import React, { Component } from 'react';
import styles from './QuestionCard.module.scss';

class QuestionCard extends Component {

    render() {
        const { surveyData, productCategory, activeStyle, variantsBackground, switchQuestion, transformIt } = this.props;
        return (
            <>
                {surveyData[productCategory].map((questionCard, idx) =>

                    <div className={`
                    ${styles.card} 
                    ${styles[`card${idx+1}`]}
                    ${activeStyle[idx]}
                    ${idx === 1 ? transformIt[1] :
                        idx === 2 && transformIt[2]}
                    `}
                    // style={{'transform': `translateY(${(idx+transformIt)*20}px)`}}
                    >
                        <div className={styles.cardContent}>
                            <h2 onClick={() => switchQuestion('previous')} >QUESTION <span>#{questionCard.index}</span></h2>
                            <p>{questionCard.question}</p>

                            <div className={styles.variantsWrapper}>
                                {questionCard.answers.map((variants, idx) => (
                                    <div
                                        className={`${styles.variantImage} ${styles.disabled}`}
                                        style={{ 'background': `url(${Object.values(variantsBackground)[idx]}) center no-repeat #624C3C`, 'backgroundSize': 'cover' }}
                                    >
                                        <span>{variants}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.nextButton} onClick={() => switchQuestion('next')}>NEXT QUESTION</div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

export default QuestionCard;