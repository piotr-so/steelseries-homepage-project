import React, { Component } from 'react';
import styles from "./ProductComparison.module.scss";
import productsData from "../assets/data/products-comp-data.json";

class ProductComparison extends Component {
    state = {
        isFixed: false,
        wereScrolledBy: 0,
    }

    tableHeadElementsFix = (e) => {
        console.log('Works!');
        this.setState(prevstate => ({
            isFixed: !prevstate.isFixed,
        }));
    }


    //dev
    checktableposition = () => {
        const body = document.body.getBoundingClientRect();
        const tableElement = document.getElementsByClassName(styles.productsTable)[0];
        const tableCoordinates = tableElement.getBoundingClientRect();
        const tablePos = tableCoordinates.top;
        console.log(tablePos);;
        console.log(window.pageYOffset);
    }



    componentDidMount() {
        const tableWrapper = document.getElementsByClassName(styles.productsWrapper)[0];
        const tableElement = document.getElementsByClassName(styles.product)[0];

        let wait = false;

        const throttle = (tableELemPosToWindow) => {
            if (!wait && tableELemPosToWindow < 0 && this.state.isFixed !== true) {
                window.requestAnimationFrame(() => {
                    wait = false;
                    this.tableHeadElementsFix()
                });
                wait = true;
            }
            else if (!wait && tableELemPosToWindow > 0 && this.state.isFixed !== false) {
                window.requestAnimationFrame(() => {
                    wait = false;
                    this.tableHeadElementsFix()
                });
                wait = true;
            }
        }

        const scrollHandler = (scrolledByX) => {
            if (!wait) {
                window.requestAnimationFrame(() => {
                    wait = false;
                    this.setState({
                        wereScrolledBy: scrolledByX
                    })
                    console.log(scrolledByX);
                });
                wait = true;
            }
        }

        window.addEventListener('scroll', () => throttle(tableElement.getBoundingClientRect().top));
        tableWrapper.addEventListener('scroll', () => scrollHandler(tableWrapper.scrollLeft));
    }

    render() {
        const { productCategory } = this.props;
        return (
            // Container width control depending on quantity of elements rendered (ensuring enough space is left for floating)
            <div className={styles.table} style={{ 'width': `${130 + 160 * productsData[productCategory].products.length}px` }}>
                <header>
                    <h1>COMPARE OUR GAMING MOUSE LINEUP</h1>
                </header>
                <div className={styles.productsTable}>
                    <div className={styles.features}>
                        <div className={styles.featuresFillerBlock}></div>
                        <div className={this.state.isFixed ? styles.featuresToFixed : undefined}></div>
                        <ul>
                            {/* CHANGE!!!!!!!!!!!!!! */}
                            {productsData[productCategory].features.map(feature =>
                                <li key={`id-${feature}`} onClick={() => this.checktableposition()}>{feature}</li>
                            )}
                        </ul>
                    </div>

                    {this.state.isFixed &&
                        <div className={styles.testHead}>
                            <div className={styles.testHeadWrapper} style={{'width': `${50 + 160 * productsData[productCategory].products.length}px`}}>
                                {productsData[productCategory].products.map((singleProduct, singleProductIdx) =>
                                    <div className={styles.testHeadElement} style={this.state.isFixed ? {'transform': `translateX(-${this.state.wereScrolledBy}px)`} : undefined}>
                                        <h2>{singleProduct.name.toUpperCase()}</h2>
                                        <div className={styles.testHeadElementImg} style={{ 'background': `url(${singleProduct.url}) center no-repeat / cover` }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    }

                    <div className={styles.productsWrapper}>

                        <ul className={styles.columns} style={{ 'width': `${50 + 160 * productsData[productCategory].products.length}px` }}>

                            {productsData[productCategory].products.map((singleProduct, singleProductIdx) =>
                                <li className={styles.product} key={`product-column-${singleProduct.name}`}>
                                    <div className={styles.tableHeadFiller}></div>
                                    {/* // Head of the product // */}
                                    <div 
                                        className={`
                                            ${styles.head} 
                                            ${this.state.isFixed ? styles.headFixed : undefined} 
                                            ${this.state.isFixed && singleProductIdx % 2 === 0 ? styles.headColorVar1 : this.state.isFixed && singleProductIdx % 2 !== 0 ? styles.headColorVar2 : undefined}
                                            `}
                                        style={this.state.isFixed ? {'transform': `translateX(-${this.state.wereScrolledBy}px)`} : undefined}
                                        // style={{'color': 'red'}}
                                        // onScroll={() => this.scrollHandler()}
                                        >
                                        <h2>{singleProduct.name.toUpperCase()}</h2>
                                        <div className={styles.productImg} style={{'background': `url(${singleProduct.url}) center no-repeat / cover`}}/> 
                                    </div>
                                    {/* // Single product features // */}
                                    <ul className={`${styles.featuresList} ${singleProductIdx % 2 === 0 ? styles.colorVar2 : styles.colorVar1}`}>
                                        {Object.entries(singleProduct).map((feature, featureIdx) => feature[0] === "name" || feature[0] === "url" ? undefined :
                                            <li key={singleProduct.name + '_' + (featureIdx + 1)}
                                                className={feature[1] === "yes" ? styles.tickIcon : undefined}    >
                                                {feature[1] === "no" || feature[1] === "yes" ? "" : feature[1]}
                                            </li>
                                        )}
                                    </ul>
                                    {/* // */}
                                </li>
                            )}

                        </ul>

                    </div>
                </div>
            </div>
        )
    }
}

export default ProductComparison;
