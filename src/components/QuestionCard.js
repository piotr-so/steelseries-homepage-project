import React, {Component} from 'react';
import styles from './QuestionCard.module.scss';


class QuestionCard extends Component {
    state = {
        gripTypeToShow: 'claw',
        handTypeToShow: 'left',
        showGripType: 0,
        showHandType: 0,
    }
    changeTypesToShow = (e) => {
        this.state.showGripType === 0 &&
        this.setState({
            showGripType: 1
        })
        this.setState({
            gripTypeToShow: e.target.value.toLowerCase(),
        })

        if (e.target.value === "Left" || e.target.value === "Right") {
            this.state.showHandType === 0 &&
            this.setState({
                showHandType: 1
            })
            this.setState({
                handTypeToShow: e.target.value.toLowerCase(),
            })
        }
    }
    
    render() {
        const { surveyData, productCategory, activeStyle, variantsBackground, switchQuestion } = this.props;
        const gripTypesSprite = {
            claw: 'left',
            fingertip: 'center',
            palm: 'right'
        }
        const handsTypes = {
            left: '0px',
            right: '-105px'
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
                                                onChange={e => this.changeTypesToShow(e)}
                                                required
                                            >
                                            </input>
                                            <span
                                                className={`${styles.variantImage} ${styles.variantOverlay}`}
                                                style={productCategory === 'Mouse' && cardIdx === 1 ?
                                                    { 'backgroundColor': 'grey' } 
                                                    :
                                                    productCategory === 'Mouse' && cardIdx === 2 ?
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
                            {productCategory === 'Mouse' ? cardIdx === 1 || cardIdx === 2 ? (
                                <div className={`${styles.gripType} ${cardIdx === 2 && styles.handTypePos}`}
                                    style={{
                                        'opacity' : `${cardIdx === 1 ? this.state.showGripType : this.state.showHandType}`,
                                        'background': `url(${Object.values(variantsBackground(productCategory, cardIdx))}) ${cardIdx === 1 ? gripTypesSprite[this.state.gripTypeToShow] : handsTypes[this.state.handTypeToShow]} no-repeat ${cardIdx === 1 ? '/ auto' : '/ cover'}`,                                        
                                    }}
                                >
                                </div>) : undefined : undefined
                            }
                        </div>
                    </div>
                )}
            </form>
        )
    }
}
export default QuestionCard;