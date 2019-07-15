import React, { Component } from 'react';
import styles from '../components/MostPopular.module.scss';
import products from '../assets/data/most-popular.json';
import arrow from '../assets/slider-arrow.svg';
import Button from './Button';

class MostPopular extends Component {
    state = {
        whichProductIsRendered: 0,
        whichVariantIsRendered: 0,
        windowWidth: 0,
        isWidthAdjustabale: false,
    }

    switchColor = (clickedElement) => {
        if (clickedElement === "reset") {
            this.setState({
                whichVariantIsRendered: 0
            })
        }
        else {
            const idOfElement = clickedElement.currentTarget.attributes.numberId.value;
            this.setState({
                whichVariantIsRendered: Number(idOfElement)
            })
        }
    }

    changeRenderedProduct = (value) => {
        this.setState(prevState => ({
            whichProductIsRendered: prevState.whichProductIsRendered + value
        }))
    }

    changeWindowWidth = () => {
        const currentWindowWidth = window.innerWidth;
        if (currentWindowWidth < 951) {
            this.setState({
                windowWidth: currentWindowWidth,
                isWidthAdjustabale: true
            });
        }
        else {
            this.setState({ isWidthAdjustabale: false })
        }
    }

    componentDidMount() {
        this.screenWidth = window.innerWidth;
        this.setState({ windowWidth: this.screenWidth });
        window.addEventListener('resize', this.changeWindowWidth);
    }

    render() {
        const { whichProductIsRendered, whichVariantIsRendered } = this.state;
        return (
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <h1>MOST POPULAR</h1>
                </header>

                <div
                    className={styles.productWrapper}
                    style={this.state.isWidthAdjustabale === true ? { "transform": `translatey(-${0.04 * this.state.windowWidth}px)` } : undefined}
                >
                    <div className={styles.imgContainer}>
                        <div className={styles.spriteContainer}>
                            {/* Adding key property to force re-render and fire animation */}
                            <img
                                src={products[whichProductIsRendered].url}
                                key={"product-" + whichProductIsRendered}
                                style={
                                    whichProductIsRendered === 0 ?
                                        this.state.isWidthAdjustabale === false ? { "transform": `translateX(-${562 * whichVariantIsRendered}px)` }
                                            : { "transform": `translateX(-${266 * whichVariantIsRendered}px)` }
                                        : undefined
                                }
                                alt={products[whichProductIsRendered].name}>
                            </img>
                        </div>
                        <div className={`
                            ${styles.slidePrev}
                            ${whichProductIsRendered === 0 ? styles.hidden : styles.visible}
                            `}
                            onClick={() => { this.changeRenderedProduct(-1); this.switchColor("reset") }}
                        >
                            <img src={arrow} className={styles.arrowUp} alt="arrow-next" />
                        </div>
                        <div className={`
                            ${styles.slideNext}
                            ${whichProductIsRendered === 2 ? styles.hidden : styles.visible}
                            `}
                            onClick={() => { this.changeRenderedProduct(1); this.switchColor("reset") }}
                        >
                            <img src={arrow} className={styles.arrowDown} alt="arrow-next" />
                        </div>
                    </div>
                    <div className={styles.description}>
                        <h2>{products[whichProductIsRendered].name.toUpperCase()}</h2>
                        <p className={styles.descriptionText}>{products[whichProductIsRendered].description}</p>
                        <div className={styles.colorVariants}>
                            {products[whichProductIsRendered]["color-variants"] ? products[whichProductIsRendered]["color-variants"].map((color, Idx) =>
                                <div
                                    className={styles.circle}
                                    numberid={Idx}
                                    style={{
                                        "borderColor": `${color}`,
                                        "opacity": `${whichVariantIsRendered === Idx ? 1 : 0.29}`,
                                        "backgroundColor": `${whichVariantIsRendered === Idx ? color : "transparent"}`
                                    }}
                                    key={`color-variant-${Idx + 1}`}
                                    onClick={(e) => this.switchColor(e)}
                                >
                                </div>
                            )
                                :
                                undefined
                            }
                        </div>
                        <div className={styles.purchaseWrapper}>
                            <div className={styles.purchaseWrapperItems}>
                                <Button text={"buy now"} />
                                <span>{products[whichProductIsRendered].price}</span>
                            </div>
                            <p className={styles.deliveryTime}>3-5 day delivery</p>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default MostPopular;