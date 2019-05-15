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
    
    
    componentWillMount() {
        const stylesForNewProps = this.initialVisibilityOfCards();
        this.setState({
            styles: stylesForNewProps
        })
    }
    componentWillReceiveProps() {
        const stylesForNewProps = this.initialVisibilityOfCards();
        this.setState({
            styles: stylesForNewProps,
        }) 
    }

    render() {
        const { textToRender } = this.props;
        const { currentCardsStyle } = this.state;
        const images = this.importKeysAndValues(require.context('../assets/images/ProductGuide/Mouse', false, /\.(png|jpe?g|svg)$/));
        // console.log(images);
        // console.log('show me' + Object.keys(surveyData[this.props.textToRender]));
        const lastElem = this.state.styles.length -1;
        console.log(this.state.styles[lastElem]);


        // This props tells which product category survey is loaded
        const productCategory = textToRender;

        // this.settingStateArray(surveyData[productCategory]);
        const test = Object.keys(surveyData[productCategory]).map((elem, idx) => elem === 'card1' ? 'visible' : 'hidden');
        // console.log(test);

        return (
            <div className={styles.wrapper}>

                <h1>FIND THE PERFECT<br />GAMING {textToRender.toUpperCase()} FOR YOU</h1>

                <div className={styles.cardWrapper}>

                    <QuestionCard
                        surveyData={surveyData}
                        productCategory={productCategory}
                        activeStyle={this.state.styles}
                        variantsBackground={images}
                        switchQuestion={this.handleCardChange}
                    />

                </div>

            </div>
        );
    }
}



export default ProductGuide;

// // This props tells which product category survey is loaded
// const productCategory = textToRender;

// const multipleProductCategoriesImgs = {
//     Mouse: this.importKeysAndValues(require.context('../assets/images/ProductGuide/Mouse', false, /\.(png|jpe?g|svg)$/)),
//     Keyborad: this.importKeysAndValues(require.context('../assets/images/ProductGuide/Keyboard', false, /\.(png|jpe?g|svg)$/)),
//     Headset: this.importKeysAndValues(require.context('../assets/images/ProductGuide/Headset', false, /\.(png|jpe?g|svg)$/)),
// }

// const variantsImgs = multipleProductCategoriesImgs[productCategory];
// console.log(variantsImgs);