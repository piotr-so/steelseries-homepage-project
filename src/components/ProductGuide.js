import React, { Component } from 'react';
import styles from './ProductGuide.module.scss';

class ProductGuide extends Component {
    render() {
        const { textToRender } = this.props;
      return (
        <div className={styles.wrapper}>
        <h1>{textToRender}</h1>
        </div>
      );
    }
  }
  
  export default ProductGuide;