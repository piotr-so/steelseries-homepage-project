import React, { Component } from 'react';
import styles from "./App.module.scss";
import Header from "./components/Header";
import ProductSlider from "./components/ProductSlider";
import ProductCarousel from "./components/ProductCarousel";
import ProductGuide from "./components/ProductGuide";

class App extends Component {
  state = {
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
        <Header />
        <ProductSlider />
        <ProductCarousel whichIsCentered={this.setCenteredToRender}/>
        <ProductGuide productCategory={this.state.productCategory}/>
        <div style={{'width': `100px`, 'height': `400px`}}>Hello hello</div>
      </div>
    );
  }
}

export default App;
