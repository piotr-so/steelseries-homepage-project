import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        const { toggleHamburger } = this.props;
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
                                    <Link to={'/headsets'} onClick={() => toggleHamburger()}>Headsets</Link>
                                </li>
                                <li>
                                    <Link to={'/keyboards'} onClick={() => toggleHamburger()}>Keyboards</Link>
                                </li>
                                <li>
                                    <Link to={'/mice'} onClick={() => toggleHamburger()}>Mice</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to={'/esports'} onClick={() => toggleHamburger()}>ESPORTS</Link>

                    </li>
                    <li>
                        <Link to={'/support'} onClick={() => toggleHamburger()}>SUPPORT</Link>
                    </li>
                    <li id={styles.beforeProfileFix}>
                        <Link to={'/community'} onClick={() => toggleHamburger()}>COMMUNITY</Link>
                    </li>
                    <li id={styles.profile}>
                        <Link to={'/user_profile'} id={styles.profileLink} onClick={() => toggleHamburger()}>MY PROFILE</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default MobileNav;