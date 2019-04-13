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
      </div>
    );
  }
}

export default App;
