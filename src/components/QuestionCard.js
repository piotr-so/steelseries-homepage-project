import React, {Component} from 'react';
import styles from './QuestionCard.module.scss';


class QuestionCard extends Component {
    state = {
        gripTypeToShow: 'claw',
        handTypeToShow: 'left',
        showGripType: 0,
        showHandType: 0,
        validatedQuestionCardUpTo: -1,
        greyedClicked: false
    }

    //Function for specific image control in q2 & q3 in Mouse category
    changeTypesToShow = (e) => {

        const elementProperties = e.target.id.split("_");
        const value = e.target.value.toLowerCase()
        const newState = {};

        if (elementProperties[0] === "Mouse") {
            if (elementProperties[1] === "question2") {
                newState.showGripType = 1;
                newState.gripTypeToShow = value;
            }
            else if (elementProperties[1] === "question3") {
                newState.showHandType = 1;
                newState.handTypeToShow = value;
            }
        }

        this.setState({
            ...newState
        })
    }

    // Validation

    validateForNextQuestion = (questionNumber) => {
        if (questionNumber > this.state.validatedQuestionCardUpTo) {
            // -1 from cardIdx
            this.setState({
                validatedQuestionCardUpTo: questionNumber - 1,
                greyedClicked: false
            })
        }
        
    }

    handleGreyedClick = () => {
        this.setState({greyedClicked: true})
    }

    //

    componentDidUpdate(prevProps) {
        if (this.props.productCategory !== prevProps.productCategory) {
            this.setState({
                showGripType: 0,
                showHandType: 0,
                validatedQuestionCardUpTo: -1,
                greyedClicked: false
            })
        }
    }
    
    render() {
        const { surveyData, productCategory, activeStyle, switchQuestion } = this.props;
        const gripTypesSprite = {
            claw: 'left',
            fingertip: 'center',
            palm: 'right'
        }
        const handsTypesSprite = {
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
                            
                                <p
                                    className={cardIdx !== 0 ? styles.previous : `${styles.previous} ${styles.hiddenPrev}`}
                                    onClick={() => switchQuestion('previous')}
                                >Previous</p>
                                <h2>QUESTION <span>#{questionCard.index}</span></h2>
                                <p>{questionCard.question}</p>

                                <div className={styles.questionContent}>
                                    <div className={styles.variantsWrapper}>

                                        {questionCard.answers.map((variant, idx) => (
                                            <label
                                                htmlFor={productCategory + '_question' + (cardIdx+1) + '_variant' + (idx + 1)}
                                                key={`${productCategory}_answer-variant${idx+1}`}
                                                onClick={e => this.validateForNextQuestion(cardIdx+1)}
                                            >
                                                <input
                                                    type='radio'
                                                    name={`question${cardIdx + 1}`}
                                                    id={productCategory + '_question' + (cardIdx+1) + '_variant' + (idx + 1)}
                                                    value={variant.text}
                                                    onChange={e => this.changeTypesToShow(e)}
                                                    required
                                                >
                                                </input>
                                                <span
                                                    className={`${styles.variantImage} ${styles.variantOverlay}`}
                                                    style={
                                                        productCategory === 'Mouse' && cardIdx === 0 ?
                                                        { 'background': `url(${process.env.PUBLIC_URL + variant.url}) center no-repeat #624C3C`, 'backgroundSize': 'cover' }
                                                        :
                                                        { 'background': 'grey'}
                                                    }
                                                >
                                                    <span className={styles.variantText}>{variant.text}</span>
                                                </span>

                                            </label>
                                        ))}

                                    </div>
                                </div>
                                {/* Specific images for q2 & q3 card in Mouse category - render control  */}
                                {productCategory === 'Mouse' ? cardIdx === 1 || cardIdx === 2 ? (
                                <div className={`${styles.gripType} ${cardIdx === 2 && styles.handTypePos}`}
                                    style={{
                                        'opacity' : `${cardIdx === 1 ? this.state.showGripType : this.state.showHandType}`,
                                        'background': `url(${process.env.PUBLIC_URL + questionCard.answers[0].url}) ${cardIdx === 1 ? gripTypesSprite[this.state.gripTypeToShow] : handsTypesSprite[this.state.handTypeToShow]} no-repeat ${cardIdx === 1 ? '/ auto' : '/ cover'}`,                                        
                                    }}
                                >
                                </div>) : undefined : undefined
                                }
                                {/* Next Question button or Sumbit button on last card - render control */}
                                {questionCard.index !== surveyData[productCategory].length ?
                                    <div 
                                        className={`
                                        ${styles.nextButton} 
                                        ${this.state.validatedQuestionCardUpTo < cardIdx ? styles.greyed : undefined}
                                        ${this.state.greyedClicked ? styles.greyedClicked : styles.greyedNotClicked}
                                        `} 
                                        onClick={this.state.validatedQuestionCardUpTo >= cardIdx ? (() => switchQuestion('next')) 
                                        : () => this.handleGreyedClick()}
                                    >
                                        <span>NEXT QUESTION</span>
                                    </div>
                                    :
                                    <button 
                                        className={`
                                        ${styles.submitButton} 
                                        ${this.state.validatedQuestionCardUpTo < cardIdx ? styles.greyed : undefined}
                                        ${this.state.greyedClicked ? styles.greyedClicked : styles.greyedNotClicked}
                                        `} 
                                        type='submit'
                                        onClick={this.state.validatedQuestionCardUpTo < cardIdx ? () => this.handleGreyedClick() : undefined }
                                    >
                                        <span>SEE PRODUCTS</span>
                                    </button>
                                }
                        </div>
                    </div>
                )}
            </form>
        )
    }
}
export default QuestionCard;