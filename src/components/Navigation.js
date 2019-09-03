import React, { Component } from 'react';
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
                        <a href="/products">PRODUCTS</a>
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
                                            <a href="/headsets">Headsets</a>
                                        </li>
                                        <li className={shouldBeNonTransparent ? styles.nonTransparent : undefined}>
                                            <a href="/keyboards">Keyboards</a>
                                        </li>
                                        <li className={shouldBeNonTransparent ? styles.nonTransparent : undefined}>
                                            <a href="/mice">Mice</a>
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
                        <a href="/esports">ESPORTS</a>

                    </li>
                    <li>
                        <a href="/support">SUPPORT</a>

                    </li>
                    <li>
                        <a href="/community">COMMUNITY</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Dropdown;