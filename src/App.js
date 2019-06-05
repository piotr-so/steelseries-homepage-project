import React, { Component } from 'react';
import styles from "./App.module.scss";
import Header from "./components/Header";
import ProductSlider from "./components/ProductSlider";
import ProductCarousel from "./components/ProductCarousel";
import ProductGuide from "./components/ProductGuide";
import ProductComparison from "./components/ProductComparison";
import MostPopular from './components/MostPopular';

class App extends Component {
  state = {
    windowWidth: null,
    productCategory: 'Mouse',
  }
  // !!! Change to database later !!!

  setCenteredToRender = (centeredELement) => {
    this.setState({
      productCategory: centeredELement
    })
  }

  render() {
    return (
      <div className={styles.main}>
        <Header/>
        <ProductSlider />
        {/* <ProductCarousel whichIsCentered={this.setCenteredToRender}/> */}
        {/* <ProductGuide productCategory={this.state.productCategory}/> */}
        {/* <ProductComparison productCategory={this.state.productCategory}/> */}
        {/* <MostPopular /> */}
      </div>
    );
  }
}

export default App;
