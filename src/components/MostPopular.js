import React, { Component } from 'react';
import styles from '../components/MostPopular.module.scss';
import products from '../assets/data/most-popular.json';
import arrow from '../assets/images/slider-arrow.svg';
import Button from './Button';
import { smartphoneAndLandscape } from '../components/MediaQueries';

class MostPopular extends Component {
    state = {
        whichProductIsShown: 0,
        whichVariantIsShown: 0,
        variantsSwitching: false,
        windowWidth: 0,
        isWidthAdjustabale: false,
    }

    switchColor = (clickedElement) => {
        if (clickedElement === "reset") {
            this.setState({
                whichVariantIsShown: 0,
                variantsSwitching: false
            })
        }
        else {
            const idOfElement = clickedElement.currentTarget.attributes.numberId.value;
            this.setState({
                whichVariantIsShown: Number(idOfElement),
                variantsSwitching: true
            })
        }
    }

    changeRenderedProduct = (value) => {
        this.setState(prevState => ({
            whichProductIsShown: prevState.whichProductIsShown + value
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
        if (this.screenWidth <= smartphoneAndLandscape.maxWidth) {
            this.setState({
                windowWidth: this.screenWidth,
                isWidthAdjustabale: true
            })
        }
        else {this.setState({ windowWidth: this.screenWidth });}      
        window.addEventListener('resize', this.changeWindowWidth);
    }

    render() {
        const { whichProductIsShown, whichVariantIsShown, variantsSwitching } = this.state;
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
                        <div className={styles.productImg}>
                            {products.map((singleProduct, idx) => 

                                singleProduct["variants-url"] ? (
                                    singleProduct["variants-url"].map((colorVariant, variantIdx) => 
                                        <img
                                            src={colorVariant}
                                            className={
                                                whichProductIsShown === 0 ? 
                                                    variantIdx === 0 ? 
                                                        whichVariantIsShown === variantIdx ? 
                                                            variantsSwitching ? styles.visible : styles.imgVisible 
                                                        : styles.hidden
                                                    :
                                                    variantIdx === whichVariantIsShown ? styles.visible : styles.hidden
                                                : styles.hidden
                                            }
                                            key={`most-popular-product-${idx}-cVariant-${variantIdx}`}
                                            alt={singleProduct.name}>
                                        </img>
                                    )
                                ) : (
                                    <img
                                        src={singleProduct["img-url"]}
                                        className={whichProductIsShown === idx ? styles.imgVisible : styles.hidden}
                                        key={"most-popular-product-" + idx}
                                        alt={singleProduct.name}>
                                    </img>  
                                )
                            )}
                        </div>
                        <div className={`
                            ${styles.slidePrev}
                            ${whichProductIsShown === 0 ? styles.hidden : styles.visible}
                            `}
                            onClick={() => { this.changeRenderedProduct(-1); this.switchColor("reset") }}
                        >
                            <img src={arrow} className={styles.arrowUp} alt="arrow-next" />
                        </div>
                        <div className={`
                            ${styles.slideNext}
                            ${whichProductIsShown === 2 ? styles.hidden : styles.visible}
                            `}
                            onClick={() => { this.changeRenderedProduct(1); this.switchColor("reset") }}
                        >
                            <img src={arrow} className={styles.arrowDown} alt="arrow-next" />
                        </div>
                    </div>
                    <div className={styles.description}>
                        <h2>{products[whichProductIsShown].name.toUpperCase()}</h2>
                        <p className={styles.descriptionText}>{products[whichProductIsShown].description}</p>
                        <div className={styles.colorVariants}>
                            {products[whichProductIsShown]["color-variants"] ? products[whichProductIsShown]["color-variants"].map((color, Idx) =>
                                <div
                                    className={styles.circle}
                                    numberid={Idx}
                                    style={{
                                        "borderColor": `${color}`,
                                        "opacity": `${whichVariantIsShown === Idx ? 1 : 0.29}`,
                                        "backgroundColor": `${whichVariantIsShown === Idx ? color : "transparent"}`
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
                                <Button text={"buy now"} linkTo={products[whichProductIsShown].url}/>
                                <span>{products[whichProductIsShown].price}</span>
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