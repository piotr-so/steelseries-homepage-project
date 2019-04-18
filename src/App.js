import React, { Component } from 'react';
import styles from "./App.module.scss";
import Header from "./components/Header";
import ProductSlider from "./components/ProductSlider";
import ProductCarousel from "./components/ProductCarousel";

class App extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
        <ProductSlider />
        <ProductCarousel />
        <div style={{'width': `100px`, 'height': `400px`}}>Hello hello</div>
      </div>
    );
  }
}

export default App;
