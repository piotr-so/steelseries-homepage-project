import React from 'react';
import styles from './QuestionCard.module.scss';

const QuestionCard = ({ surveyData, productCategory, activeStyle, variantsBackground, switchQuestion }) =>
    (
        <form>
            {surveyData[productCategory].map((questionCard, cardIdx) =>

                <div className={`
                        ${styles.card} 
                        ${activeStyle[cardIdx]}
                    `}
                    key={`cardId-${cardIdx}`}
                >
                    <div className={styles.cardContent}>
                        <p
                            className={cardIdx !== 0 ? styles.previous : `${styles.previous} ${styles.hiddenPrev}`}
                            onClick={() => switchQuestion('previous')}
                        >Previous</p>
                        <h2>QUESTION <span>#{questionCard.index}</span></h2>
                        <p>{questionCard.question}</p>

                        <div className={styles.variantsWrapper}>

                            {questionCard.answers.map((variants, idx) => (
                                <label
                                    htmlFor={`variant_button${cardIdx + '_' + (idx + 1)}`}
                                    key={`variant${idx + 1}`}
                                >
                                    <input
                                        type='radio'
                                        name={`question${cardIdx + 1}`}
                                        id={`variant_button${cardIdx + '_' + (idx + 1)}`}
                                        value={variants}
                                        required
                                    >
                                    </input>
                                    <span
                                        className={`${styles.variantImage} ${styles.variantOverlay}`}
                                        style={{ 'background': `url(${Object.values(variantsBackground)[idx]}) center no-repeat #624C3C`, 'backgroundSize': 'cover' }}
                                    >
                                        <span className={styles.variantText}>{variants}</span>
                                    </span>

                                </label>
                            ))}
                        </div>
                        {questionCard.index !== surveyData[productCategory].length ?
                            <div className={styles.nextButton} onClick={() => switchQuestion('next')}>NEXT QUESTION</div>
                            :
                            <button className={styles.submitButton} type='submit'>Submit</button>
                        }

                    </div>
                </div>
            )}
        </form>
    )

export default QuestionCard;