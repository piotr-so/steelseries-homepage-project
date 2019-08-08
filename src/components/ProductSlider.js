import React, { Component } from 'react';
import styles from './ProductSlider.module.scss';
import headset from '../assets/Headset_mod.png';
import keyboard from '../assets/arctis2.png';
import mice from '../assets/steelseries-mice_mod.png';
import arrow from '../assets/slider-arrow.svg';
import Button from './Button';

const productsToShow = [
    {
        name: "SIBERIA 200",
        image: headset,
        description: "The Siberia 200 gaming headset combines the comfort and sound of the best-selling Siberia V2 with quality updates, reclaiming its title as the best gaming headset in eSports and PC gaming.",
    },
    {
        name: "ARCTIS 5",
        image: keyboard,
        description: "Specifically designed for the PC Gamer, Arctis 5 combines independent game and chat control, cutting-edge DTS surround sound, and dual zone RGB illumination.",
    },
    {
        name: "RIVAL 500",
        image: mice,
        description: "The Rival 500 is the first MOBA/MMO mouse designed to function with the natural movements of your hand. It helps you react quickly and effectively to anything thrown your way.",
    }
];


class ProductSlider extends Component {
    state = {
        currentImageIndex: 0,
    }

    slideToNext = (e) => {
        if (this.state.currentImageIndex < productsToShow.length - 1) {
            this.setState(prevState => ({
                currentImageIndex: prevState.currentImageIndex + 1
            }))
        }
        else {
            this.setState({
                currentImageIndex: 0
            })
        }
    }

    slideToPrev = (e) => {
        if (this.state.currentImageIndex > 0) {
            this.setState(prevState => ({
                currentImageIndex: prevState.currentImageIndex - 1
            }))
        }
        else {
            this.setState({
                currentImageIndex: productsToShow.length - 1
            })
        }
    }


    handleTouchOnSlider = (e) => {
        const { currentImageIndex } = this.state;
        const touchCoords = e.changedTouches[e.changedTouches.length - 1].pageX;
        // console.log(this.lastCoord + " - last Coord")
        // console.log(touchCoords + " - touch coords");

        if (this.lastCoord === null) {
            this.lastCoord = touchCoords;
        }
        else {
            const offsetDifference = touchCoords - this.lastCoord;
            const offsetValue = Math.abs(offsetDifference);
            if (offsetDifference > 0 && offsetValue > 50) {
                if (currentImageIndex !== 0) {
                    this.setState(prevState => ({ currentImageIndex: prevState.currentImageIndex - 1 }));
                }
                else if (currentImageIndex === 0) {
                    this.setState({ currentImageIndex: productsToShow.length - 1 })
                }
            }
            else if (offsetDifference < 0 && offsetValue > 50) {
                if (currentImageIndex < productsToShow.length - 1) {
                    this.setState(prevState => ({ currentImageIndex: prevState.currentImageIndex + 1 }));
                }
                else if (currentImageIndex === productsToShow.length - 1) {
                    this.setState({ currentImageIndex: 0 })
                }
            }
            this.lastCoord = null;
        }
    }

    componentDidMount() {
        this.lastCoord = null;
    }

    render() {
        const { currentImageIndex } = this.state;
        return (
            <div
                className={styles.sliderWrapper}
                onTouchStart={e => this.handleTouchOnSlider(e)}
                onTouchEnd={e => this.handleTouchOnSlider(e)}
            >
                <div className={styles.itemToShowIdentifiersWrapper}>
                    <div className={styles.identifiers}>
                        {productsToShow.map((element, idx) => {
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
                </div>
                <div className={styles.products}>
                    <div
                        className={styles.productsImgWrapper}
                    >
                        {productsToShow.map((singleImg, idx) =>
                            <img
                                className={currentImageIndex === idx ? styles.imgVisible : styles.imgHidden}
                                src={singleImg.image}
                                key={`productSlider_img_${idx + 1}`}
                                alt={singleImg.name}
                            />
                        )}
                    </div>

                    <div className={styles.slidePrev} onClick={this.slideToPrev}>
                        <img src={arrow} className={styles.arrowUp} alt="arrow-prev" />
                    </div>

                    <div className={styles.slideNext} onClick={this.slideToNext}>
                        <img src={arrow} className={styles.arrowDown} alt="arrow-next" />
                    </div>
                </div>
                <div className={styles.productDescription} key={this.state.currentImageIndex + "descSec"}>
                    <h1>{productsToShow[currentImageIndex].name}</h1>
                    <p>{productsToShow[currentImageIndex].description}</p>
                    <Button text={"buy now"} />
                </div>
            </div >
        )
    }
}

export default ProductSlider;