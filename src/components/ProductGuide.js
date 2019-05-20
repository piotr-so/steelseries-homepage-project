import React, { Component } from 'react';
import styles from './ProductGuide.module.scss';
import surveyData from '../assets/data/survey-data.json';
import QuestionCard from './QuestionCard';

class ProductGuide extends Component {
    state = {
        styles: [styles.card1, styles.card2, styles.card3, styles.hidden, styles.hidden],
    }

    importKeysAndValues = (obj) => {
        const images = {};
        obj.keys().map(item => { images[item.replace('./', '')] = obj(item); });
        return images;
    }

    getImages = (productCategory, qIdx) => {
        if (productCategory === 'Mouse') {
            const img = 
            qIdx === 0 ? this.importKeysAndValues(require.context('../assets/images/ProductGuide/Mouse/q1', false, /\.(png|jpe?g|svg)$/)) :
            qIdx === 1 ? this.importKeysAndValues(require.context('../assets/images/ProductGuide/Mouse/q2', false, /\.(png|jpe?g|svg)$/)) :
            qIdx === 2 ? this.importKeysAndValues(require.context('../assets/images/ProductGuide/Mouse/q3', false, /\.(png|jpe?g|svg)$/)) : undefined
            return img
        }
        else {
            const img = this.importKeysAndValues(require.context('../assets/images/ProductGuide/Mouse/q1', false, /\.(png|jpe?g|svg)$/));
            return img
        }
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
        for (let i=0; i < (2 * surveyData[this.props.textToRender].length) - 1; i++) {
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
        if (this.props.textToRender !== prevProps.textToRender) {
            const stylesFromNewProps = this.initialVisibilityOfCards();
            this.setState({
                styles: stylesFromNewProps
            })
        }
    }

    render() {
        const { textToRender } = this.props;

        // This props tells which product category survey is loaded
        const productCategory = textToRender;

        return (
            <div className={styles.wrapper}>

                <h1>FIND THE PERFECT<br />GAMING {textToRender.toUpperCase()} FOR YOU</h1>

                <div className={styles.cardWrapper}>

                    <QuestionCard
                        surveyData={surveyData}
                        productCategory={productCategory}
                        activeStyle={this.state.styles}
                        variantsBackground={this.getImages}
                        switchQuestion={this.handleCardChange}
                    />

                </div>

            </div>
        );
    }
}



export default ProductGuide;


// const multipleProductCategoriesImgs = {
//     Mouse: this.importKeysAndValues(require.context('../assets/images/ProductGuide/Mouse', false, /\.(png|jpe?g|svg)$/)),
//     Keyborad: this.importKeysAndValues(require.context('../assets/images/ProductGuide/Keyboard', false, /\.(png|jpe?g|svg)$/)),
//     Headset: this.importKeysAndValues(require.context('../assets/images/ProductGuide/Headset', false, /\.(png|jpe?g|svg)$/)),
// }

// const variantsImgs = multipleProductCategoriesImgs[productCategory];
// console.log(variantsImgs);