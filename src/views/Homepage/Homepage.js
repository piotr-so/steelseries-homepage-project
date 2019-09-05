import React, { Component } from 'react';
import styles from "./Homepage.module.scss";
import PageHeader from "../../components/Navigation/PageHeader";
import ProductSlider from "../../components/ProductSlider";
import ProductCarousel from "../../components/ProductCarousel";
import ProductGuide from "../../components/ProductGuide";
import ProductComparison from "../../components/ProductComparison";
import MostPopular from '../../components/MostPopular';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Homepage extends Component {
  state = {
    windowWidth: null,
    productCategory: 'Mouse',
  }

  setCenteredToRender = (centeredELement) => {
    this.setState({
      productCategory: centeredELement
    })
  }

  render() {
    return (
      <Router>
        <PageHeader />
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
          <Route path='/products'/>
          <Route path='/esports'/>
          <Route path='/support'/>
          <Route path='/community'/>
        </Switch>
      </Router>

    );
  }
}

export default Homepage;
