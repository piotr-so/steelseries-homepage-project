import React, { Component } from 'react';
import styles from './Navigation.module.scss';
import { CSSTransitionGroup } from 'react-transition-group';

function FirstChild(props) {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
}

class Dropdown extends Component {
    state = {
        displayMenu: false, //switching for development purpose
    }

    handleMouseEvent = () => {
        this.setState({
            displayMenu: !this.state.displayMenu,
        })
    }



    render() {
        return (
            <nav>
                <ul className={styles.menu}>
                    <li className={styles.productsList} onMouseEnter={this.handleMouseEvent} onMouseLeave={this.handleMouseEvent}>
                        <a href="#">PRODUCTS</a>
                        <CSSTransitionGroup
                            component={FirstChild}
                            transitionName="reveal"
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                        >
                            {this.state.displayMenu ? (
                                <div key={'dropdownMenu'} className={styles.dropMenu} >
                                    <ul>
                                        <li>Headsets</li>
                                        <li>Keyboards</li>
                                        <li>Mice</li>
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
                        <a href="#">ESPORTS</a>

                    </li>
                    <li>
                        <a href="#">SUPPORT</a>

                    </li>
                    <li>
                        <a href="#">COMMUNITY</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Dropdown;