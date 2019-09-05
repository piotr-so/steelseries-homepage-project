import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { CSSTransitionGroup } from 'react-transition-group';

function FirstChild(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

class Dropdown extends Component {
    state = {
        displayMenu: false, //manual switching for development purpose
    }

    handleMouseEvent = () => {
        this.setState({
            displayMenu: !this.state.displayMenu,
        })
    }



    render() {
        const shouldBeNonTransparent  = this.props.menuElementsTransparency;
        return (
            <nav>
                <ul className={styles.menu}>
                    <li className={styles.productsList} onMouseEnter={this.handleMouseEvent} onMouseLeave={this.handleMouseEvent}>
                        <Link to={'/products'}>PRODUCTS</Link>
                        <CSSTransitionGroup
                            component={FirstChild}
                            transitionName="reveal"
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                        >
                            {this.state.displayMenu ? (
                                <div key={'dropdownMenu'} className={styles.dropMenu} >
                                    <ul>
                                        <li className={shouldBeNonTransparent ? styles.nonTransparent : undefined}>
                                            <Link to={'/headsets'}>Headsets</Link>
                                        </li>
                                        <li className={shouldBeNonTransparent ? styles.nonTransparent : undefined}>
                                            <Link to={'/keyboards'}>Keyboards</Link>
                                        </li>
                                        <li className={shouldBeNonTransparent ? styles.nonTransparent : undefined}>
                                            <Link to={'/mice'}>Mice</Link>
                                        </li>
                                    </ul>
                                </div>
                            ) :
                                (
                                    null
                                )
                            }
                        </CSSTransitionGroup>

                    </li>
                    <li>
                        <Link to={'/esports'}>ESPORTS</Link>
                    </li>
                    <li>
                        <Link to={'/support'}>SUPPORT</Link>
                    </li>
                    <li>
                        <Link to={'/community'}>COMMUNITY</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Dropdown;