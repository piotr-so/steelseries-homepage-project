import React, { Component } from 'react';
import styles from './Product.module.scss';


class Product extends Component {

    setPosition = (_index, elementsStyle) => {
        let whichElement = 
            _index === 0 ? elementsStyle.elem0 : 
            _index === 1 ? elementsStyle.elem1 : 
            _index === 2 && elementsStyle.elem2;
        let positionClass = 
            whichElement === 'left' ? styles.left :
            whichElement === 'right' ? styles.right :
            whichElement === 'center' && styles.center;
        return positionClass
    }

    render() {
        const { item, _index, switchFn, elementsStyle } = this.props;
        const renderDescription = this.setPosition(_index, elementsStyle);
        return (
                <div
                    className={`
                        ${styles.element} 
                        ${this.setPosition(_index, elementsStyle)} 
                    `}
                    style={item.name === 'Mouse' ? { 'background': `url(${item.background}) no-repeat 0% 100% #252526` } : {
                        'background': `url(${item.background}) no-repeat #252526`
                    }}
                    onClick={() => switchFn(_index)}>
                    
                    <h3>{item.name}</h3>
                    {renderDescription === styles.center ? (
                        <>
                            <h2>{`FIND THE PERFECT GAMING ${item.name.toUpperCase()} FOR YOU`}</h2>
                            <button>START GUIDE</button>
                        </>
                    ) : null}
                    <img src={item.img} alt={item.name}></img>
                </div>
        )

    }
}
export default Product;