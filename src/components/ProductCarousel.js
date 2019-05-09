import React, { Component } from 'react';
import styles from './ProductCarousel.module.scss';
import headset from '../assets/Layer 12.png';
import mouse from '../assets/rival_100 copy.png';
import keyboard from '../assets/apex300_leadin_proof2_r.png';
import HeadsetBackground from '../assets/headset_background.png';
import MouseBackground from '../assets/Layer7.png';
import KeyboardBackground from '../assets/Layer10.png';
import Product from '../components/Product';

const products = [
    {
        index: 0,
        name: "Headset",
        img: headset,
        background: HeadsetBackground,
    },
    {
        index: 1,
        name: "Mouse",
        img: mouse,
        background: MouseBackground,
    },
    {
        index: 2,
        name: "Keyboard",
        img: keyboard,
        background: KeyboardBackground,
    },
];

class ProductCarousel extends Component {
    state = {
        carouselElements: [...products],
        elementsStyle: {
            elem0: 'left',
            elem1: 'center',
            elem2: 'right',
        },
        canRender: true,
    }

    switchElementsStyle = (elemIdx) => {
        this.setState({
            elementsStyle: {
                ['elem'+ elemIdx]: 'center',
                ['elem'+ ((elemIdx + 1) % 3)]: 'right',
                ['elem'+ ((elemIdx + 2) % 3)]: 'left',
            }  
        }, () => this.props.whichIsCentered(checker(this.state.elementsStyle)));
        // callback information for ProductGuide component
        
        const checker = (elemObj) => {
            const centeredElem = Object.keys(elemObj).find(key => elemObj[key] === 'center');
            const nameOfCentered = this.state.carouselElements[centeredElem.substring(4,5)].name;
            return nameOfCentered            
        }
    }

    // this function tries to fix hovering center card button by delaying it's content rendering
    delayRender = () => {
        this.setState(prevState => ({
            canRender: !prevState.canRender
        }));

        const unlockRender = () => {

            this.setState(prevState => ({
                canRender: !prevState.canRender
            }));
            clearTimeout(desciptionRenderTimeout);
        };

        let desciptionRenderTimeout = setTimeout(unlockRender, 500);
    }

    render() {
        const { carouselElements } = this.state;
        return (
            <div className={styles.carousel}>
                <h1>SELECT PRODUCT</h1>
                <div className={styles.wrapper}>
                    {carouselElements.map((element, mapIdx) => (
                        <Product
                            key={`id_0${element.index}`}
                            _index={mapIdx}
                            item={element}
                            elementsStyle={this.state.elementsStyle}
                            switchFn={this.switchElementsStyle}
                            isDescAllowedToRender={this.state.canRender}
                            delayFn={this.delayRender}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default ProductCarousel;