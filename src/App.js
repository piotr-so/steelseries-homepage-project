import React, { Component } from 'react';
import styles from "./App.module.scss";
import Header from "./components/Header";
import ProductSlider from "./components/ProductSlider";
import ProductCarousel from "./components/ProductCarousel";
import ProductGuide from "./components/ProductGuide";
import ProductComparison from "./components/ProductComparison";
import MostPopular from './components/MostPopular';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <div className={styles.main}>            
              <ProductSlider />
              <ProductCarousel whichIsCentered={this.setCenteredToRender} />
              <ProductGuide productCategory={this.state.productCategory} />
              <ProductComparison productCategory={this.state.productCategory} />
              <MostPopular />
            </div>
          </Route>
        </Switch>
      </Router>

    );
  }
}

export default App;
