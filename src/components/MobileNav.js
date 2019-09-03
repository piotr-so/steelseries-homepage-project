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
        const { isDisplayed } = this.state;
        return (
            <nav>
                <ul className={styles.menu}>
                    <li>
                        <span
                            className={!isDisplayed ? styles.products : styles.productsRotate} 
                            onClick={this.changeVisibility}
                        >
                            PRODUCTS
                        </span> 
                        <div className={`${styles.productsItems} ${!this.state.isDisplayed && styles.hidden}`}>
                            <ul>
                                <li>
                                    <a href="/headsets">Headsets</a>
                                </li>
                                <li>
                                    <a href="/keyboards">Keyboards</a>
                                </li>
                                <li>
                                    <a href="/mice">Mice</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="/esports">ESPORTS</a>

                    </li>
                    <li>
                        <a href="/support">SUPPORT</a>

                    </li>
                    <li id={styles.beforeProfileFix}>
                        <a href="/community">COMMUNITY</a>
                    </li>
                    <li id={styles.profile}>
                        <a href="/user_profile" id={styles.profileLink}>MY PROFILE</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default MobileNav;