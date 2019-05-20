import React, {Component} from 'react';
import styles from './QuestionCard.module.scss';


class QuestionCard extends Component {
    state = {
        gripTypeToShow: 'claw',
        showInitialGripType: 0
    }
    changeGripType = (e) => {
        this.state.showInitialGripType === 0 &&
        this.setState({
            showInitialGripType: 1
        })
        this.setState({
            gripTypeToShow: e.target.value.toLowerCase(),
        })
    }
    render() {
        const { surveyData, productCategory, activeStyle, variantsBackground, switchQuestion } = this.props;
        const gripTypesSprite = {
            claw: 'left',
            fingertip: 'center',
            palm: 'right'
        }
        return (
            <form>
                {surveyData[productCategory].map((questionCard, cardIdx) =>

                    <div className={`
                        ${styles.card} 
                        ${activeStyle[cardIdx]}
                    `}
                        key={`cardId-${cardIdx}`}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.questionContent}>
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
                                                onChange={e => this.changeGripType(e)}
                                                checked={this.props.productCategory && false}
                                                required
                                            >
                                            </input>
                                            <span
                                                className={`${styles.variantImage} ${styles.variantOverlay}`}
                                                style={productCategory === 'Mouse' && cardIdx === 1 ?
                                                    { 'backgroundColor': 'grey' }
                                                    : productCategory === 'Mouse' ?
                                                        { 'background': `url(${Object.values(variantsBackground(productCategory, cardIdx))[idx]}) center no-repeat #624C3C`, 'backgroundSize': 'cover' }
                                                        :
                                                        { 'backgroundColor': 'grey' }
                                                }
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
                            {cardIdx === 1 &&
                                <div className={styles.gripType}
                                    style={{
                                        'opacity' : `${this.state.showInitialGripType}`,
                                        'background': `url(${Object.values(variantsBackground(productCategory, cardIdx))}) ${gripTypesSprite[this.state.gripTypeToShow]} no-repeat`,
                                        'backgroundSize': 'auto'
                                    }
                                    }
                                >
                                </div>
                            }
                        </div>
                    </div>
                )}
            </form>
        )
    }
}
export default QuestionCard;