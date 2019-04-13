import React, { Component } from 'react';
import styles from './ProductCarousel.module.scss';
import headset from '../assets/Layer 12.png';
import mouse from '../assets/rival_100 copy.png';
import keyboard from '../assets/apex300_leadin_proof2_r.png';

const testArray = ["headset", "mouse", "keyboard"];


class ProductCarousel extends Component {
    state = {
        carouselElements: [...testArray],
    }

    handleLeftClick = () => {
        const newFirstElem = this.state.carouselElements.slice(2, 3);        
        const newMidAndLastElem= this.state.carouselElements.slice(0,2);
        const sum = [...newFirstElem, ...newMidAndLastElem];
        console.log(sum);
        this.setState({
            carouselElements: sum
        })
    }

    handleRightClick = () => {
        const newFirstElem = this.state.carouselElements.slice(1,3);       
        const newMidAndLastElem= this.state.carouselElements.slice(0,1);
        const sum = [...newFirstElem, ...newMidAndLastElem];
        console.log(sum);
        this.setState({
            carouselElements: sum
        })
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <h1>SELECT PRODUCT</h1>
                <div className={styles.middleElement}>
                    <div className={styles.item}>
                        <h3>Mouse</h3>
                        <h2>FIND THE PERFECT GAMING MOUSE FOR YOU</h2>
                        <button>START GUIDE</button>
                        <img src={mouse} alt="mouse"></img>
                    </div>
                </div>
                <div className={styles.backElements}>
                    <div className={styles.leftElement} onClick={this.handleLeftClick}>
                        <div className={styles.item}>
                            <h3>Headset</h3>
                            <img src={headset} alt="headset" />
                        </div>
                    </div>
                    <div className={styles.rightElement} onClick={this.handleRightClick}>
                        <div className={styles.item}>
                            <h3>Keyboard</h3>
                            <img src={keyboard} alt="keyboard"></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCarousel;