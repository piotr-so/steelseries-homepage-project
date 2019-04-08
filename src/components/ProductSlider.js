import React, { Component } from 'react';
import styles from './ProductSlider.module.scss';
import headset from '../assets/Headset.png';

class ProductSlider extends Component {
    state = {

    }

    render() {
        return (
            <div className={styles.sliderWrapper}>
                <div className={styles.itemToShowIdentifiersWrapper}>
                    <div className={styles.identifiers}>
                        <span className={styles.active} />
                        <span className={styles.inactive} />
                        <span className={styles.inactive} />
                    </div>
                </div>
                <div className={styles.productsImages}>
                    <img src={headset} alt="headset" />
                </div>
                <div className={styles.productDescription}>
                    <h1>SIBERIA 200</h1>
                    <p>The Siberia 200 gaming headset combines the comfort and sound of the best-selling Siberia V2 with quality updates,
                    reclaiming its title as the best gaming headset in eSports and PC gaming. </p>
                    <button>BUY NOW</button>
                </div>
            </div >
        )
    }
}

export default ProductSlider;