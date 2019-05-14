import React, { Component } from 'react';
import styles from './ProductGuide.module.scss';
import surveyData from '../assets/data/survey-data.json';
import QuestionCard from './QuestionCard';

class ProductGuide extends Component {
    state = {
        currentCardsStyle: {
            card1: 3,
            card2: 4,
            card3: 5,
        },
        styles: [undefined, undefined, undefined, styles.hidden, styles.hidden],
        transform: [undefined, undefined, undefined],
        counter: 0
    }

    importKeysAndValues = (obj) => {
        const images = {};
        obj.keys().map(item => { images[item.replace('./', '')] = obj(item); });
        return images;
    }

    handleCardChange = (direction) => {
        const arrayToChange = this.state.styles;

        if (direction === 'next') {
            // Hiding next card with class .hidden
            arrayToChange.unshift(styles.hidden);
            arrayToChange.pop();

            // Center, mid, back card class overlay rotation
            const tranfsormToChangeArr = [...this.state.transform];
            if (this.state.counter === 0) {    
                tranfsormToChangeArr.splice(1, 1, styles.modCard1);
                tranfsormToChangeArr.splice(2, 1, styles.modCard2)
            }
            else if (this.state.counter > 0) {
                tranfsormToChangeArr.pop();
                tranfsormToChangeArr.unshift(undefined);
            }
            
            this.setState({
                styles: arrayToChange,
                transform: tranfsormToChangeArr,
                counter: this.state.counter + 1
            })
        }
        if (direction === 'previous') {
            arrayToChange.shift();
            arrayToChange.push(styles.hidden);

            let tranfsormToChangeArr = [...this.state.transform];
            if (this.state.counter === surveyData[this.props.textToRender].length - 1) {    
                tranfsormToChangeArr.push(styles.modCard2)
                tranfsormToChangeArr.shift();
            }
            else if (this.state.counter === 1) {
                tranfsormToChangeArr.length = 0;
                tranfsormToChangeArr = [...Array(surveyData[this.props.textToRender].length)];
            }
            // else if (this.state.counter < 0) {
            //     tranfsormToChangeArr.pop();
            //     tranfsormToChangeArr.unshift(undefined);
            // }
            // else if (this.state.counter === 0) {
            //     tranfsormToChangeArr.length = 0;
            //     tranfsormToChangeArr.push(...undefined(3));
            // }

            
            this.setState({
                styles: arrayToChange,
                transform: tranfsormToChangeArr,
                counter: this.state.counter - 1
            })
        }
        // if (direction === 'next') {
        //     this.setState(prevState => ({
        //         transform: prevState.transform + 1
        //     }))
        // }
        // if (direction === 'previous') {
        //     this.setState(prevState => ({
        //         transform: prevState.transform - 1
        //     }))
        // }

    }

    // changeVisible = () => {
    //     const visibilityArray = this.state.visibility;
    //     const indexOfVisible = visibilityArray.indexOf('visible');
    //     visibilityArray[indexOfVisible] = 'hidden';
    //     visibilityArray[indexOfVisible + 1] = 'visible';
    //     this.setState({
    //         visibility: visibilityArray
    //     });
    // }

    // settingStateArray = () => {
    //     const test = Object.keys(surveyData[productCategory]).map((elem, idx) => elem === 'card1' ? 'visible' : 'hidden');
    //     this.setState({
    //         visibility: test,
    //     })
    // }
    componentWillMount() {
        const initialVisibility = Object.keys(surveyData[this.props.textToRender]).map((elem, idx) => elem === 'card1' ? 'visible' : 'hidden');
        this.setState({
            visibility: initialVisibility,
        })
    }

    // checheng = () => {
    //     const initialVisibility = Object.keys(surveyData[this.props.textToRender]).map((elem, idx) => elem === 'card1' ? 'visible' : 'hidden');
    //     this.setState((prevState, initialVisibility) => {
    //         visibility: prevState.visibility + initialVisibility.increment,
    //     })) 
    // }



    render() {
        const { textToRender } = this.props;
        const { currentCardsStyle } = this.state;
        const images = this.importKeysAndValues(require.context('../assets/images/ProductGuide/Mouse', false, /\.(png|jpe?g|svg)$/));
        console.log(images);
        console.log('show me' + Object.keys(surveyData[this.props.textToRender]));


        // This props tells which product category survey is loaded
        const productCategory = textToRender;

        // this.settingStateArray(surveyData[productCategory]);
        const test = Object.keys(surveyData[productCategory]).map((elem, idx) => elem === 'card1' ? 'visible' : 'hidden');
        console.log(test);

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
                        transformIt={this.state.transform}
                    />

                    {/* <div className={`${styles.card} ${styles.card2}`}></div>
                    <div className={`${styles.card} ${styles.card3}`}></div> */}
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