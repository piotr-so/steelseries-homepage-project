import React, { Component } from 'react';
import MediaQuery from "react-responsive";
import Navigation from './Navigation';
import MobileNav from './MobileNav';
import styles from "./Header.module.scss";
import logo from "../assets/logo.png";
import { ReactComponent as Basket } from "../assets/Basket.svg";
import { ReactComponent as UserImg } from "../assets/Male User.svg";
import { smartphoneAndLandscape, mediumUp } from '../components/MediaQueries';

class Header extends Component {
    state = {
        isVisible: false,
        pageScrolled: false,
        expandedMenuHeight: null
    }

    showHamburgerMenu = () => {
        if (!this.state.isVisible) {
            document.body.classList.add(styles.noscroll)
        }
        else {
            document.body.classList.remove(styles.noscroll)
        }
        this.setState(prevState => ({
            isVisible: !prevState.isVisible
        }));

    }

    handleMenuSize = () => {
        const pageScrollOffset = window.pageYOffset;
        if (pageScrollOffset !== 0) {
            this.setState({ pageScrolled: true })
        }
        else this.setState({ pageScrolled: false })
    }

    fixMobileMenuViewport = () => {
        this.setState({ expandedMenuHeight: window.innerHeight });
    }

    componentDidMount() {
        this.initialHeight = window.innerHeight;
        this.setState({ expandedMenuHeight: this.initialHeight });
        window.addEventListener('resize', this.fixMobileMenuViewport);
        window.addEventListener('scroll', this.handleMenuSize);
    }
    render() {
        return (
            <header
                className={`${styles.main} ${this.state.pageScrolled && styles.scrolling}`}
            >
                <div className={styles.menu}>
                    <MediaQuery {...smartphoneAndLandscape}>
                        <svg
                            className={this.state.isVisible ? styles.hide : styles.hamburgerMenuIco}
                            onClick={this.showHamburgerMenu}
                            xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 32 32" width="32" fill="#624C3C"
                            aria-label="open mobile menu"
                        >
                            <path d="M4 10h24c1.1 0 2-0.9 2-2s-0.9-2-2-2H4C2.9 6 2 6.9 2 8S2.9 10 4 10zM28 14H4c-1.1 0-2 0.9-2 2s0.9 2 2 2h24c1.1 0 2-0.9 2-2S29.1 14 28 14zM28 22H4c-1.1 0-2 0.9-2 2s0.9 2 2 2h24c1.1 0 2-0.9 2-2S29.1 22 28 22z"/>
                        </svg>
                        <svg
                            className={this.state.isVisible ? styles.cancelIco : styles.hide}
                            onClick={this.showHamburgerMenu}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213 213"
                            aria-label="close mobile menu"
                        >
                            <g>
                                <path d="M131.8 106.5l75.9-75.9c7-7 7-18.3 0-25.3 -7-7-18.3-7-25.3 0l-75.9 75.9L30.6 5.2c-7-7-18.3-7-25.3 0 -7 7-7 18.3 0 25.3l75.9 75.9L5.2 182.4c-7 7-7 18.3 0 25.3 7 7 18.3 7 25.3 0l75.9-75.9 75.9 75.9c7 7 18.3 7 25.3 0 7-7 7-18.3 0-25.3L131.8 106.5z"/>
                            </g>
                        </svg>
                    </MediaQuery>

                    <div className={styles.logo}>
                        <a href="/"><img src={logo} alt="steelseries logo" /></a>
                    </div>

                    <MediaQuery {...mediumUp}>
                        <Navigation menuElementsTransparency={this.state.pageScrolled} />
                    </MediaQuery>

                    <div className={styles.userSection}>

                        <a id={styles.basketLink} href="/basket" aria-label="customer basket">
                            <div className={styles.basketIndicator}>
                                <div className={styles.indicatorValue}>2</div>
                            </div>
                            <Basket className={styles.basket} />
                        </a>
                        <MediaQuery {...mediumUp}>
                            <a href="/user_profile" aria-label="user profile">
                                <UserImg className={styles.profileIco}/>
                            </a>
                        </MediaQuery>
                    </div>
                </div>
                <MediaQuery {...smartphoneAndLandscape}>
                    <div
                        className={`${styles.expandedMenu} ${this.state.isVisible ? styles.visible : styles.hidden}`}
                        style={{ "height": `${window.innerHeight - 50}px` }}
                    >
                        <MobileNav shouldResetChildren={this.state.isVisible} />
                    </div>
                </MediaQuery>
            </header>
        )
    }
}


export default Header;
