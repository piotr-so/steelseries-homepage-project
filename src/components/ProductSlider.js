import React, { Component } from 'react';
import styles from './ProductSlider.module.scss';
import headset from '../assets/Headset.png';
import keyboard from '../assets/steelseries-keyboard.png';
import mice from '../assets/steelseries-mice.png';
import arrow from '../assets/slider-arrow.svg';

const itemsForSlider = [
    {
        name: "SIBERIA 200",
        image: headset,
        description: "The Siberia 200 gaming headset combines the comfort and sound of the best-selling Siberia V2 with quality updates, reclaiming its title as the best gaming headset in eSports and PC gaming",
    },
    {
        name: "APEX 150",
        image: keyboard,
        description: "Apex 150 delivers everything you need for competitive gaming at a competitive price. SteelSeries Quick Tension switches, 5-zone RGB, Discord notifications and splash resistance combine for the best value in gaming.",
    },
    {
        name: "RIVAL 500",
        image: mice,
        description: "The Rival 500 is the first MOBA/MMO mouse designed to function with the natural movements of your hand. Featuring a next-gen button layout, flickdown switches, and tactile alerts, the Rival 500 helps you react quickly and effectively to anything thrown your way.",
    }
];

class ProductSlider extends Component {
    state = {
        productToShow: [...itemsForSlider],
        currentImageIndex: 0,
        arrowsHovered: false,
    }

    slideToNext = (e) => {
        this.state.currentImageIndex < itemsForSlider.length - 1 && (
            this.setState(prevState => ({
                currentImageIndex: prevState.currentImageIndex + 1
            }))
        )
    }

    slideToPrev = (e) => {
        this.state.currentImageIndex > 0 && (
            this.setState(prevState => ({
                currentImageIndex: prevState.currentImageIndex - 1
            }))
        )
    }

    handleWrapperHover = (e) => {
        this.state.arrowsHovered === false ? (
            this.setState(prevState => ({
                arrowsHovered: !prevState.arrowsHovered
            }))
        ) : (
                this.setState(prevState => ({
                    arrowsHovered: !prevState.arrowsHovered
                }))
            )
    }

    render() {
        const { productToShow, currentImageIndex, arrowsHovered } = this.state;
        return (
            <div className={styles.sliderWrapper} onMouseEnter={this.handleWrapperHover} onMouseLeave={this.handleWrapperHover}>
                <div className={styles.itemToShowIdentifiersWrapper}>
                    <div className={styles.identifiers}>
                        {productToShow.map((element, idx) => {
                            return (
                                currentImageIndex === idx ? (
                                    <span className={styles.active} key={"identifier" + idx} />
                                ) : (
                                        <span className={styles.inactive} key={"identifier" + idx} />
                                    )
                            )
                        })
                        }
                    </div>
                    {currentImageIndex !== 0 && (
                        <div className={arrowsHovered ? styles.slidePrevActive : styles.slidePrev} onClick={this.slideToPrev}>
                            <img src={arrow} className={styles.arrowUp} alt="arrow-prev" />
                        </div>
                    )
                    }
                    {currentImageIndex !== 2 && (
                        <div className={arrowsHovered ? styles.slideNextActive : styles.slideNext} onClick={this.slideToNext}>
                            <img src={arrow} className={styles.arrowDown} alt="arrow-next" />
                        </div>
                    )
                    }
                </div>
                <img src={productToShow[currentImageIndex].image} key={this.state.currentImageIndex + "img"} className={styles.productImage} alt={productToShow[currentImageIndex].name} />
                <div className={styles.productDescription} key={this.state.currentImageIndex + "descSec"}>
                    <h1>{productToShow[currentImageIndex].name}</h1>
                    <p>{productToShow[currentImageIndex].description}</p>
                    <button>BUY NOW</button>
                </div>
            </div >
        )
    }
}

export default ProductSlider;