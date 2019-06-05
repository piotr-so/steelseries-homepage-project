import React, { Component } from 'react';
import styles from './MobileNav.module.scss';


class MobileNav extends Component {
    state = {
        isDisplayed: false
    }

    changeVisibility = () => {
        this.setState(prevState => ({
            isDisplayed: !prevState.isDisplayed
        }))
    }

    componentDidUpdate(prevProps) {
        if (this.props.shouldResetChildren !== prevProps.shouldResetChildren) {
            this.setState({
                isDisplayed: false
            })
        }
    }

    render() {
        return (
            <nav>
                <ul className={styles.menu}>
                    <li>
                        <a href="#" id={styles.products} onClick={this.changeVisibility}>PRODUCTS</a>
                        <div className={`${styles.productsItems} ${!this.state.isDisplayed && styles.hidden}`}>
                            <ul>
                                <li>
                                    <a href="#">Headsets</a>
                                </li>
                                <li>
                                    <a href="#">Keyboards</a>
                                </li>
                                <li>
                                    <a href="#">Mice</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#">ESPORTS</a>

                    </li>
                    <li>
                        <a href="#">SUPPORT</a>

                    </li>
                    <li id={styles.beforeProfileFix}>
                        <a href="#">COMMUNITY</a>
                    </li>
                    <li id={styles.profile}>
                        <a href="#" id={styles.profileLink}>MY PROFILE</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default MobileNav;