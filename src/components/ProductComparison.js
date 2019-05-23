import React, { Component } from 'react';
import styles from "./ProductComparison.module.scss";
import productsData from "../assets/data/products-comp-data.json";

class ProductComparison extends Component {
    render() {
        const { productCategory } = this.props;
        return (
            <div className={styles.table} style={{'width': `${130 + 160 * productsData[productCategory].products.length}px`}}>
                <header>
                    <h1>COMPARE OUR GAMING MOUSE LINEUP</h1>
                </header>
                <div className={styles.productsTable}>
                    <div className={styles.features}>
                        <div className={styles.positionFeaturesBlock}></div>
                        <ul>
                            {productsData[productCategory].features.map(feature =>
                                <li key={`id-${feature}`}>{feature}</li>
                            )}
                        </ul>
                    </div>

                    <div className={styles.productsWrapper}>

                        <ul className={styles.columns} style={{'width': `${160 * productsData[productCategory].products.length}px`}}>

                            {productsData[productCategory].products.map((singleProduct, singleProductIdx) =>
                                <li className={styles.product} key={`product-column-${singleProduct.name}`}>
                                    {/* // Head of the product // */}
                                    <div className={styles.head}>
                                        <h2>{singleProduct.name.toUpperCase()}</h2>
                                        {/* <img src={singleProduct.url} alt={singleProduct.name}></img> */}
                                        <div className={styles.productImg} style={{'background': `url(${singleProduct.url}) center no-repeat / cover`}}/>
                                    </div>
                                    {/* // */}
                                    {/* // Single product features // */}
                                    <ul className={`${styles.featuresList} ${singleProductIdx % 2 === 0 ? styles.colorVar2 : styles.colorVar1}`}>
                                        {Object.entries(singleProduct).map((feature, featureIdx) => feature[0] === "name" || feature[0] === "url" ? undefined :
                                            <li key={singleProduct.name + '_' + (featureIdx + 1)}
                                                className={feature[1] === "yes" && styles.tickIcon}    >
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
