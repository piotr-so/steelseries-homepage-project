import React, { Component } from 'react';
import MediaQuery from "react-responsive";
import Navigation from './Navigation';
import MobileNav from './MobileNav';
import styles from "./Header.module.scss";
import logo from "../assets/logo.png";
import hamburgerMenu from "../assets/hamburger.svg";
import cancelIco from "../assets/cancel-ico.svg";
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
                        <img
                            src={this.state.isVisible ? cancelIco : hamburgerMenu}
                            className={this.state.isVisible ? styles.cancelIco : undefined}
                            onClick={this.showHamburgerMenu}
                            alt="hamburger-ico"
                        />
                    </MediaQuery>

                    <div className={styles.logo}>
                        <a href="/"><img src={logo} alt="logo" /></a>
                    </div>

                    <MediaQuery {...mediumUp}>
                        <Navigation menuElementsTransparency={this.state.pageScrolled} />
                    </MediaQuery>

                    <div className={styles.userSection}>

                        <a id={styles.basketLink} href="#" aria-label="basket">
                            <div className={styles.basketIndicator}>
                                <div className={styles.indicatorValue}>2</div>
                            </div><Basket className={styles.basket} />
                        </a>
                        <MediaQuery {...mediumUp}>
                        <a href="#">
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
