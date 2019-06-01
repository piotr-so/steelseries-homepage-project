import React, { Component } from 'react';
import styles from "./ProductComparison.module.scss";
import productsData from "../assets/data/products-comp-data.json";


class ProductComparison extends Component {
    state = {
        isFixed: false,
        scrollTimesCounter: 0,
    }

    toggleStickyBarVisibility = () => {
        this.setState({ isFixed: !this.state.isFixed })
    }

    checkStickyBarPos = () => {
        const tableELemPosToWindow = this.tableElement.getBoundingClientRect().top; 

        const { isFixed } = this.state;
        // console.log(tableELemPosToWindow);
        const quantityOfFeaturesRows = productsData[this.props.productCategory].features.length;
        // console.log(quantityOfFeaturesRows+"features_rows")
        const productHeadHeight = 124;
        const productColumnPadding = 100;
        const rowHeight = 113;
        const TwoLastElementsVisibleBreakpoint = -(productHeadHeight + productColumnPadding + (rowHeight * quantityOfFeaturesRows - 4 * rowHeight) + 23);

        if (isFixed === false) {
            if (tableELemPosToWindow < 0 && tableELemPosToWindow > TwoLastElementsVisibleBreakpoint) this.toggleStickyBarVisibility();   
        }
        else {
            if (tableELemPosToWindow >= 0 || tableELemPosToWindow <= TwoLastElementsVisibleBreakpoint) this.toggleStickyBarVisibility();
        }
    }

    clickTranslateX = (value) => {
        const { scrollTimesCounter } = this.state;
        const { quantityOfProducts, availableTimesToScroll } = this;

        if (quantityOfProducts > 6 &&
            (scrollTimesCounter > 0 || scrollTimesCounter < availableTimesToScroll)) {
            this.setState(prevState =>({
                scrollTimesCounter: prevState.scrollTimesCounter + value
            }));
        } 
    }

    componentDidMount() {
        this.tableElement = document.getElementsByClassName(styles.product)[0];
        // console.log(this.tableElement.getBoundingClientRect().top+"- didmount");
        this.quantityOfProducts = productsData[this.props.productCategory].products.length;
        this.availableTimesToScroll = this.quantityOfProducts - 6;
        window.addEventListener('scroll', this.checkStickyBarPos);
    }

    componentDidUpdate(prevProps) {
        
        if (this.props.productCategory !== prevProps.productCategory) {
            console.log('changed');
            window.removeEventListener('scroll', this.checkStickyBarPos);
            this.tableElement = document.getElementsByClassName(styles.product)[0];
            // console.log(this.tableElement.getBoundingClientRect().top+"nowy");
            this.quantityOfProducts = productsData[this.props.productCategory].products.length;
            this.availableTimesToScroll = this.quantityOfProducts - 6;
            window.addEventListener('scroll', this.checkStickyBarPos);

            this.setState({
                scrollTimesCounter: 0
            })
        }   
    }

    render() {
        const { productCategory } = this.props;
        const { availableTimesToScroll } = this;
        const { isFixed, scrollTimesCounter } = this.state;
        return (
            // Container width control depending on quantity of elements rendered (ensuring enough space is left for floating)
            <div className={styles.wrapper} style={{ 'width': `${130 + 160 * productsData[productCategory].products.length}px` }}>
                <header className={styles.title}>
                    <h1>COMPARE OUR GAMING MOUSE LINEUP</h1>
                </header>
                <div className={styles.productsTable}>
                {/*Sticky bar for scrolling table vertically */}
                    <div className={`${styles.fixedFeaturesCover} ${isFixed ? styles.visible : styles.hidden}`}></div>
                    <div className={`${styles.stickyBar} ${isFixed ? styles.visible : styles.hidden}`}>
                        <div className={styles.stickyElementsWrapper} style={{'width': `${160 * productsData[productCategory].products.length}px`, 'transform': `translateX(-${this.state.scrollTimesCounter * 160}px)`}}>
                            {productsData[productCategory].products.map((singleProduct, singleProductIdx) =>
                                <div 
                                    className={`
                                    ${styles.stickyElement} 
                                    ${singleProductIdx % 2 === 0 ? styles.headColorVar2 : singleProductIdx % 2 !== 0 && styles.headColorVar1}
                                    `}
                                    key={`sticky-item-${singleProductIdx}`}
                                >
                                    <h2>{singleProduct.name.toUpperCase()}</h2>
                                    <div className={styles.stickyElementImg} style={{ 'background': `url(${singleProduct.url}) center no-repeat / cover` }} />
                                </div>
                            )}
                        </div>
                        <div className={`${styles.arrowLeft} ${scrollTimesCounter === 0 && styles.hidden}`} onClick={() => this.clickTranslateX(-1)}></div>
                        <div className={`${styles.arrowRight} ${scrollTimesCounter === availableTimesToScroll && styles.hidden}`} onClick={() => this.clickTranslateX(1)}></div>    
                    </div>
                {/*  */}
                {/* Features column */}
                    <ul className={styles.productsFeatures}>
                        {productsData[productCategory].features.map(feature =>
                            <li key={`id-${feature}`}>{feature}</li>
                        )}
                    </ul>
                {/*  */}
                {/* Products */}
                    <div className={styles.productsWrapper}>
                    
                        <ul className={styles.columns} style={{ 'width': `${160 * productsData[productCategory].products.length}px`, 'transform': `translate(-${scrollTimesCounter * 160}px)` }}>

                            {productsData[productCategory].products.map((singleProduct, singleProductIdx) =>
                                <li className={styles.product} key={`product-column-${singleProduct.name}`}>
                                    <div className={styles.tableHeadFiller}></div>
                                    {/* // Head of the product // */}
                                    <div className={styles.head}>
                                        <h2>{singleProduct.name.toUpperCase()}</h2>
                                        <div className={styles.productImg} style={{'background': `url(${singleProduct.url}) center no-repeat / cover`}}/> 
                                    </div>
                                    {/*  */}
                                    {/* // Single product features // */}
                                    <ul className={`${styles.featuresList} ${singleProductIdx % 2 === 0 ? styles.colorVar1 : styles.colorVar2}`}>
                                        {Object.entries(singleProduct).map((feature, featureIdx) => feature[0] === "name" || feature[0] === "url" ? undefined :
                                            <li key={singleProduct.name + '_' + (featureIdx + 1)}
                                                className={feature[1] === "yes" ? styles.tickIcon : undefined}
                                            >
                                                {feature[1] === "no" || feature[1] === "yes" ? "" : feature[1]}
                                            </li>
                                        )}
                                    </ul>
                                    {/* // */}
                                </li>
                            )}
                        </ul>
                        <div className={`${styles.arrowLeft} ${scrollTimesCounter === 0 && styles.hidden}`} onClick={() => this.clickTranslateX(-1)}></div>
                        <div className={`${styles.arrowRight} ${scrollTimesCounter === availableTimesToScroll && styles.hidden}`} onClick={() => this.clickTranslateX(1)}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductComparison;
