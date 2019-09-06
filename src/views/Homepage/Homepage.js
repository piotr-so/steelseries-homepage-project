import React, { Component } from 'react';
import ProductSlider from "../../components/ProductSlider";
import ProductCarousel from "../../components/ProductCarousel";
import ProductGuide from "../../components/ProductGuide";
import ProductComparison from "../../components/ProductComparison";
import MostPopular from '../../components/MostPopular';

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
            <div>
                <ProductSlider />
                <ProductCarousel whichIsCentered={this.setCenteredToRender} />
                <ProductGuide productCategory={this.state.productCategory} />
                <ProductComparison productCategory={this.state.productCategory} />
                <MostPopular />
            </div>
        );
    }
}

export default Homepage;
