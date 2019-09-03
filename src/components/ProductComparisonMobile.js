import React, { Component } from 'react';
import styles from './ProductComparisonMobile.module.scss';

class ProductComparisonMobile extends Component {
    state = {
        windowWidth: document.body.clientWidth
    }

    changeWindowWidth = () => {
        const value = document.body.clientWidth;

        // 20px is the value of added margin to the right of the .product to separate them from each other
        if (0.6 * value < 320) {
            this.setState({ windowWidth: 320 + 20 })
        }
        else {
            this.setState({
                windowWidth: value * 0.6 + 20
            })
        }
    }

    handleTouchOnSlider = (e) => {
        const { scrollTimesCounter, availableTimesToScroll } = this.props;
        const touchCoords = e.changedTouches[e.changedTouches.length - 1].pageX;

        if (this.lastCoord === null) {
            this.lastCoord = touchCoords;
        }
        else {
            const offsetDifference = touchCoords - this.lastCoord;
            const offsetValue = Math.abs(offsetDifference);
            if (offsetDifference > 0 && offsetValue > 50) {
                if (scrollTimesCounter > 0) {
                    this.props.setState(prevState => ({ scrollTimesCounter: prevState.scrollTimesCounter - 1 }));
                }
            }
            else if (offsetDifference < 0 && offsetValue > 50) {
                if (scrollTimesCounter < availableTimesToScroll) {
                    this.props.setState(prevState => ({ scrollTimesCounter: prevState.scrollTimesCounter + 1 }));
                }
            }
            this.lastCoord = null;
        }
    }

    componentDidMount() {
        this.changeWindowWidth();
        this.lastCoord = null;
        window.addEventListener('resize', this.changeWindowWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.changeWindowWidth);
    }
    render() {
        const { products, scrollTimesCounter, availableTimesToScroll, clickTranslateX } = this.props;
        return (
            <>
            <div className={styles.productTitles}>
                <div className={styles.scroller}>
                <div className={styles.productTitles} style={{ 'transform': `translateX(-${scrollTimesCounter * this.state.windowWidth}px)` }}>
                    {products.map((singleProduct, singleProductIdx) =>
                        <h2
                            key={`mobile_product_title_nr-${singleProductIdx}`}
                            className={styles.singleProductTitle}
                            
                        >
                            <a href={`/${singleProduct.name}`}>
                                {singleProduct.name.toUpperCase()}
                            </a>
                        </h2>
                    )}
                </div>
                </div>
                </div>
                <div
                    className={styles.wrapper}
                    onTouchStart={e => this.handleTouchOnSlider(e)}
                    onTouchEnd={e => this.handleTouchOnSlider(e)}
                >
                    <div className={`${styles.arrowLeft} ${scrollTimesCounter === 0 && styles.hidden}`} onClick={() => clickTranslateX(-1)}></div>
                    <div className={`${styles.arrowRight} ${scrollTimesCounter === availableTimesToScroll && styles.hidden}`} onClick={() => clickTranslateX(1)}></div>
                    <div className={styles.productsWrapper}
                        // Swipe length control (% of (window innerWidth - scrollbar length) for product size) //
                        style={{ 'transform': `translateX(-${scrollTimesCounter * this.state.windowWidth}px)` }}
                    >
                        {products.map((singleProduct, singleProductIdx) =>
                            <div className={styles.product} key={`mobile_product_card_nr-${singleProductIdx}`}>
                                <div className={styles.header}>
                                    <a href={`${singleProduct.name}`}>
                                        <img src={singleProduct.url} className={styles.productImg} alt={singleProduct.name}/>
                                    </a>
                                </div>
                                <ul className={styles.featuresWrapper}>
                                    {Object.entries(singleProduct).map((feature, featureIdx) => feature[0] === "name" || feature[0] === "url" || feature[0] === "id" ? undefined :
                                        <li className={styles.singleFeature} key={`feature_nr-${featureIdx}`}>
                                            <div className={styles.featureName}>{feature[0]}</div>
                                            <div key={singleProduct.name + '_' + (featureIdx + 1)}
                                                className={feature[1] === "yes" ? styles.tickIcon : styles.featureContent}
                                            >
                                                {feature[1] === "no" ? "-" : feature[1] === "yes" ? "" : feature[1]}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default ProductComparisonMobile;