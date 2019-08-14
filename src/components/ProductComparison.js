import React, { Component } from 'react';
import styles from "./ProductComparison.module.scss";
import productsData from "../assets/data/products-comp-data.json";
import MediaQuery from "react-responsive";
import {mediumUp, smartphoneAndLandscape} from '../components/MediaQueries';
import ProductComparisonMobile from './ProductComparisonMobile';


class ProductComparison extends Component {
    state = {
        mobileOrDesktop: "",
        isFixed: false,
        scrollTimesCounter: 0,
        availableTimesToScroll: 0,
    }

    modifyVisibleColumns = () => {
        const width = window.innerWidth;
        if (width <= 1110 && this.state.availableTimesToScroll === this.quantityOfProducts - 6) {
            this.setState({
                availableTimesToScroll: this.state.availableTimesToScroll + 2
            })
        }
        else if (width > 1110 && this.state.availableTimesToScroll !== this.quantityOfProducts - 6) {
            this.setState({
                availableTimesToScroll: this.quantityOfProducts - 6,
            })
            if (this.state.scrollTimesCounter > this.state.availableTimesToScroll) {
                this.setState({
                    scrollTimesCounter: this.state.availableTimesToScroll
                })
            }
        }  
    }

    toggleStickyBarVisibility = () => {
        this.setState({ isFixed: !this.state.isFixed })
    }

    checkStickyBarPos = () => {
        if (this.tableElement) {
            const tableELemPosToWindow = this.tableElement.getBoundingClientRect().top; 

            const { isFixed } = this.state;
            const quantityOfFeaturesRows = productsData[this.props.productCategory].features.length;
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
    }

    clickTranslateX = (value) => {
        const { scrollTimesCounter, availableTimesToScroll } = this.state;
        const { quantityOfProducts } = this;;

        if (quantityOfProducts > 6) {
            if (scrollTimesCounter > 0 && value === -1) {
                this.setState(prevState =>({
                    scrollTimesCounter: prevState.scrollTimesCounter + value
                }));
            }
            else if (scrollTimesCounter < availableTimesToScroll && value === 1) {
                this.setState(prevState =>({
                    scrollTimesCounter: prevState.scrollTimesCounter + value
                }));
            }
        }
    }

    // **fix** Function for tableElement repeated assign after coming back from mobile window size (resize)
    updateWindowSize = () => {
        const windowSize = window.innerWidth;
        let version = "";
        if (windowSize > smartphoneAndLandscape.maxWidth) {
            version = "desktop"
        }
        else {
            version = "mobile"
        }
        this.setState({mobileOrDesktop: version})
    }

    componentDidMount() {
        this.tableElement = document.getElementsByClassName(styles.product)[0];
        this.quantityOfProducts = productsData[this.props.productCategory].products.length;

        // availableTimesToScroll control depending on media query breakpoint
        if (!this.tableElement) {
            this.setState({availableTimesToScroll: this.quantityOfProducts - 1})
        }
        else {
            this.setState({
                availableTimesToScroll: this.quantityOfProducts - 6
            })
        }
        
        window.addEventListener('scroll', this.checkStickyBarPos);
        window.addEventListener('resize', ()=>{this.modifyVisibleColumns(); this.updateWindowSize();});
    }

    componentDidUpdate() {
        if (this.state.mobileOrDesktop === "desktop") {
            this.tableElement = document.getElementsByClassName(styles.product)[0];
        }    
    }

    // ** WIP ** for other props, no content right now
    //
    // componentDidUpdate(prevProps) {
        
        // Update tableElement for stickyBar when media query breakpoints change
        // this.tableElement = document.getElementsByClassName(styles.product)[0];

        // if (this.props.productCategory !== prevProps.productCategory) {
        //     window.removeEventListener('scroll', this.checkStickyBarPos);
        //     this.tableElement = document.getElementsByClassName(styles.product)[0];
        //     this.quantityOfProducts = productsData[this.props.productCategory].products.length;
        //     window.addEventListener('scroll', this.checkStickyBarPos);

        //     this.setState({
        //         scrollTimesCounter: 0,
        //         availableTimesToScroll: this.quantityOfProducts - 6
        //     })
        // }   
    // }

    render() {
        const productCategory = "Mouse"; // this.props; ** WIP ** for other props, no content right now
        const { isFixed, scrollTimesCounter, availableTimesToScroll } = this.state;
        return (
            // Container width control depending on quantity of elements rendered (ensuring enough space is left for floating)
            // style={{ 'width': `${130 + 160 * productsData[productCategory].products.length}px` }}
            <div className={styles.wrapper} >
                <header className={styles.title}>
                    <h1>COMPARE OUR GAMING MOUSE LINEUP</h1>
                </header>
                <MediaQuery {...mediumUp}>
                <div className={styles.productsTable}>
                {/*Sticky bar for scrolling table vertically */}
                    <div className={`${styles.stickyBar} ${isFixed ? styles.visible : styles.hidden}`}>
                        <div className={styles.featuresCover}></div>
                        <div className={styles.stickyBarHeader}>
                            <div className={styles.stickyElementsWrapper} style={{'width': `${160 * productsData[productCategory].products.length}px`, 'transform': `translateX(-${this.state.scrollTimesCounter * 160}px)`}}>
                                {productsData[productCategory].products.map((singleProduct, singleProductIdx) =>
                                    <a href={singleProduct.name} key={`sticky-item-${singleProductIdx}`}>
                                        <div 
                                            className={`
                                            ${styles.stickyElement} 
                                            ${singleProductIdx % 2 === 0 ? styles.headColorVar2 : singleProductIdx % 2 !== 0 && styles.headColorVar1}
                                            `}
                                        >
                                            <h2>{singleProduct.name.toUpperCase()}</h2>
                                            <img src={singleProduct.url} className={styles.stickyElementImg} alt={singleProduct.name}/>
                                        </div>
                                    </a>
                                )}
                            </div>
                            <div className={`${styles.arrowLeft} ${scrollTimesCounter === 0 && styles.hidden}`} onClick={() => this.clickTranslateX(-1)}></div>
                            <div className={`${styles.arrowRight} ${scrollTimesCounter === availableTimesToScroll && styles.hidden}`} onClick={() => this.clickTranslateX(1)}></div>    
                        </div>
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
                                <li className={styles.product} key={`product-column-${singleProduct.id}`}>
                                    {/* // Head of the product // */}
                                    <a href={singleProduct.name}>
                                        <div className={styles.head}>
                                            <h2>{singleProduct.name.toUpperCase()}</h2>
                                            <img src={singleProduct.url} className={styles.productImg} alt={singleProduct.name}/>
                                        </div>
                                    </a>
                                    {/*  */}
                                    {/* // Single product features // */}
                                    <ul className={`${styles.featuresList} ${singleProductIdx % 2 === 0 ? styles.colorVar1 : styles.colorVar2}`}>
                                        {Object.entries(singleProduct).map((feature, featureIdx) => feature[0] === "name" || feature[0] === "url" || feature[0] === "id" ? undefined :
                                            <li key={singleProduct.name + '_' + (featureIdx + 1)}
                                                className={feature[1] === "yes" ? styles.tickIcon : undefined}
                                            >
                                                {feature[1] === "no" ? "-" : feature[1] === "yes" ? "" : feature[1]}
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
                </MediaQuery>
                <MediaQuery {...smartphoneAndLandscape}>
                    <ProductComparisonMobile
                        products={productsData[productCategory].products}
                        availableTimesToScroll={this.state.availableTimesToScroll}
                        scrollTimesCounter={this.state.scrollTimesCounter}
                        clickTranslateX={this.clickTranslateX}
                        setState={e => this.setState(e)}
                    />
                </MediaQuery>
            </div>
        )
    }
}

export default ProductComparison;
