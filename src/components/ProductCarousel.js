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
        animationComplete: true,
    }

    // first step function for handling click event, it's checking direction and rotating array elements
    handleRotationInDirection = (direction) => {

        this.setState({
            switchAnimation: direction,
        });

        let newFirstElem = [];
        let newMidAndLastElem = [];
        let sum = [];

        if (direction === 'left') {
            newFirstElem = this.state.carouselElements.slice(2, 3);
            newMidAndLastElem = this.state.carouselElements.slice(0, 2);
            sum = [...newFirstElem, ...newMidAndLastElem];
            this.arrayRotation(sum);
        }
        else {
            newFirstElem = this.state.carouselElements.slice(1, 3);
            newMidAndLastElem = this.state.carouselElements.slice(0, 1);
            sum = [...newFirstElem, ...newMidAndLastElem];
            this.arrayRotation(sum);
        }
    }

    // second step function for handling click event, it's handling multiple click-events prevention, delaying next elements mount for the time of animation
    // and conditionally rendering text for centered product element
    arrayRotation = (rotatedElements) => {

        this.setState({
            renderElement: false,
            animationComplete: !this.state.animationComplete,
        });

        const switchArrayElems = () => {
            this.setState({
                carouselElements: rotatedElements,
                switchAnimation: 'none',
                renderElement: true,
                animationComplete: !this.state.animationComplete,
            });

            clearTimeout(newArrayMountTimeout);
        }

        let newArrayMountTimeout = setTimeout(switchArrayElems, 500);
    }

    // function for changing class during animation
    animationClassChanger = (element) => {

        const { switchAnimation } = this.state;

        const classStyles = {
            middle: [styles.middleElement, styles.middleElementSwitchFromLeftMid, styles.middleElementSwitchFromRightMid],
            left: [styles.leftElement, styles.leftElementSwitchFromLeftLeftElem, styles.leftElementSwitchFromRightLeftElem],
            right: [styles.rightElement, styles.rightElementSwitchFromLeftRhtElem, styles.rightElementSwitchFromRightRhtElem],
        };


        if (element === 'middle') {
            return giveClass(classStyles.middle)
        }
        else if (element === 'left') {
            return giveClass(classStyles.left)
        }
        else if (element === 'right') {
            return giveClass(classStyles.right)
        }

        function giveClass(whichAnimation) {
            if (switchAnimation === 'none') {
                return whichAnimation[0]
            }
            else if (switchAnimation === 'left') {
                return whichAnimation[1]
            }
            else if (switchAnimation === 'right') {
                return whichAnimation[2]
            }
        }
    }

    // function for injecting background as in-line style or fixing mouse element background position
    addBackgroundOrFixMouseElem = (number) => {
        const { carouselElements } = this.state;

        return carouselElements[number].name === "Mouse" ? 

        { 'background': `url(${carouselElements[number].background}) no-repeat 0% 100%` } 
        :
        { 'background': `url(${carouselElements[number].background}) no-repeat` }
    }

    render() {
        const { carouselElements, renderElement, animationComplete } = this.state;
        return (
            <div className={styles.wrapper}>
                <h1>SELECT PRODUCT</h1>
                <div
                    className={this.animationClassChanger('middle')}
                >
                    <div
                        className={carouselElements[1].name === "Headset" ? styles.buttonFix : styles.item}
                        style={this.addBackgroundOrFixMouseElem(1)}
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
                    <div
                        className={this.animationClassChanger('left')}
                        onClick={animationComplete ? () => this.handleRotationInDirection('left') : undefined}
                    >
                        <div
                            className={styles.item}
                            style={this.addBackgroundOrFixMouseElem(0)}
                        >
                            <h3>{carouselElements[0].name}</h3>
                            <img src={carouselElements[0].img} alt={carouselElements[0].name} />
                        </div>
                    </div>
                    <div
                        className={this.animationClassChanger('right')}
                        onClick={animationComplete ? () => this.handleRotationInDirection('right') : undefined}
                    >
                        <div
                            className={styles.item}
                            style={this.addBackgroundOrFixMouseElem(2)}
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