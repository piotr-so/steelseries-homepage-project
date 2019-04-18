import React, { Component } from 'react';
import styles from './ProductCarousel.module.scss';
import headset from '../assets/Layer 12.png';
import mouse from '../assets/rival_100 copy.png';
import keyboard from '../assets/apex300_leadin_proof2_r.png';
import HeadsetBackground from '../assets/headset_background.png';
import MouseBackground from '../assets/Layer7.png';
import KeyboardBackground from '../assets/Layer10.png';

const products = [
    {
        name: "Headset",
        img: headset,
        background: HeadsetBackground,
    },
    {
        name: "Mouse",
        img: mouse,
        background: MouseBackground,
    },
    {
        name: "Keyboard",
        img: keyboard,
        background: KeyboardBackground,
    },
];


class ProductCarousel extends Component {
    state = {
        carouselElements: [...products],
        switchAnimation: 'none',
        renderElement: true,
    }

    handleLeftClick = () => {
        const newFirstElem = this.state.carouselElements.slice(2, 3);
        const newMidAndLastElem = this.state.carouselElements.slice(0, 2);
        const sum = [...newFirstElem, ...newMidAndLastElem];
        this.setState({
            carouselElements: sum
        })
    }

    handleRightClick = () => {
        const newFirstElem = this.state.carouselElements.slice(1, 3);
        const newMidAndLastElem = this.state.carouselElements.slice(0, 1);
        const sum = [...newFirstElem, ...newMidAndLastElem];

        this.setState({
            renderElement: false,
            switchAnimation: "right"
        })
        this.timeoutOne = setTimeout(() => {
            this.setState({
                carouselElements: sum,
                switchAnimation: 'none',
                renderElement: true,
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutOne);
    }

    render() {
        const { carouselElements, switchAnimation, renderElement } = this.state;
        return (
            <div className={styles.wrapper}>
                <h1>SELECT PRODUCT</h1>
                <div className={switchAnimation === 'none' ? styles.middleElement : styles.middleElementSwitchFromRightMid}>
                    <div
                        className={carouselElements[1].name === "Headset" ? styles.buttonFix : styles.item}
                        style={
                            carouselElements[1].name === "Mouse" ? { 'background': `url(${carouselElements[1].background}) no-repeat 0% 100%` } :
                                { 'background': `url(${carouselElements[1].background}) no-repeat` }
                        }
                    >
                        <h3>{carouselElements[1].name}</h3>
                        {renderElement && (
                            <>
                            <h2>{`FIND THE PERFECT GAMING ${carouselElements[1].name.toUpperCase()} FOR YOU`}</h2>
                            <button>START GUIDE</button>
                            </>
                        )}

                        <img src={carouselElements[1].img} alt={carouselElements[1].name}></img>
                    </div>
                </div>
                <div className={styles.backElements}>
                    <div className={switchAnimation === 'none' ? styles.leftElement : styles.leftElementSwitchFromRightLeftElem} onClick={this.handleLeftClick}>
                        <div
                            className={styles.item}
                            style={
                                carouselElements[0].name === "Mouse" ? { 'background': `url(${carouselElements[0].background}) no-repeat 0% 100%` } :
                                    { 'background': `url(${carouselElements[0].background}) no-repeat` }
                            }
                        >
                            <h3>{carouselElements[0].name}</h3>
                            <img src={carouselElements[0].img} alt={carouselElements[0].name} />
                        </div>
                    </div>
                    <div className={switchAnimation === 'none' ? styles.rightElement : styles.rightElementSwitchFromRightRhtElem} onClick={this.handleRightClick}>
                        <div
                            className={styles.item}
                            style={
                                carouselElements[2].name === "Mouse" ? { 'background': `url(${carouselElements[2].background}) no-repeat 0% 100%` } :
                                    { 'background': `url(${carouselElements[2].background}) no-repeat` }
                            }
                        >
                            <h3>{carouselElements[2].name}</h3>
                            <img src={carouselElements[2].img} alt={carouselElements[2].name}></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCarousel;