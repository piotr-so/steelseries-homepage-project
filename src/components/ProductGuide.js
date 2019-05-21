import React, { Component } from 'react';
import styles from './ProductGuide.module.scss';
import surveyData from '../assets/data/survey-data.json';
import QuestionCard from './QuestionCard';

class ProductGuide extends Component {
    state = {
        styles: [styles.card1, styles.card2, styles.card3, styles.hidden, styles.hidden],
    }


    handleCardChange = (direction) => {
        const arrayToChange = this.state.styles;
        const lastElem = this.state.styles.length - 1;

        if (direction === 'next' && this.state.styles[lastElem] !== styles.card3) {
            arrayToChange.unshift(styles.hidden);
            arrayToChange.pop();
            
            this.setState({
                styles: arrayToChange,
            })
        }
        if (direction === 'previous' && this.state.styles[0] !== styles.card1)  {
            arrayToChange.shift();
            arrayToChange.push(styles.behind);
           
            this.setState({
                styles: arrayToChange,
            })
        }
    }

    initialVisibilityOfCards = () => {
        const arr1 = [];
        for (let i=0; i < (2 * surveyData[this.props.productCategory].length) - 1; i++) {
            if (i <= 2) {
                arr1.push(styles[`card${i+1}`]);
            }
            else {
                arr1.push(styles.behind);
            }
        }
        return arr1;
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.productCategory !== prevProps.productCategory) {
            const stylesFromNewProps = this.initialVisibilityOfCards();
            this.setState({
                styles: stylesFromNewProps
            })
        }
    }

    render() {
        // This props tells which product category survey is loaded
        const { productCategory } = this.props;

        return (
            <div className={styles.wrapper}>

                <h1>FIND THE PERFECT<br />GAMING {productCategory.toUpperCase()} FOR YOU</h1>

                <div className={styles.cardWrapper}>

                    <QuestionCard
                        surveyData={surveyData}
                        productCategory={productCategory}
                        activeStyle={this.state.styles}
                        switchQuestion={this.handleCardChange}
                    />

                </div>

            </div>
        );
    }
}



export default ProductGuide;