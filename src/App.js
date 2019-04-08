import React, { Component } from 'react';
import styles from "./App.module.scss";
import Header from "./components/Header";
import ProductSlider from "./components/ProductSlider";

class App extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
        <ProductSlider />
      </div>
    );
  }
}

export default App;
