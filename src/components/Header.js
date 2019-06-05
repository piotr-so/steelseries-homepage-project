import React, { Component } from 'react';
import MediaQuery from "react-responsive";
import Navigation from './Navigation';
import MobileNav from './MobileNav';
import styles from "./Header.module.scss";
import logo from "../assets/logo.png";
import hamburgerMenu from "../assets/hamburger.svg";
import cancelIco from "../assets/cancel-ico.svg";
import basket from "../assets/Basket.svg";
import userImg from "../assets/Male User.svg";

class Header extends Component {
    state = {
        isVisible: false
    }

    showHamburgerMenu = () => {
        this.setState(prevState => ({
            isVisible: !prevState.isVisible
        }))
    }
    render() {
        return (
            <header className={styles.header}>
                <div className={styles.appHeader}>
                    <MediaQuery maxWidth={799}>
                        <img
                            src={this.state.isVisible ? cancelIco : hamburgerMenu}
                            className={this.state.isVisible ? styles.cancelIco : undefined}
                            onClick={this.showHamburgerMenu}
                            alt="hamburger-ico"
                        />
                    </MediaQuery>

                    <div className={styles.logo}>
                        <img src={logo} alt="logo" />
                    </div>

                    <MediaQuery minWidth={800}>
                        <Navigation />
                    </MediaQuery>

                    <div className={styles.userSection}>
                        <div className={styles.basketIndicator}>
                            <div className={styles.indicatorValue}>2</div>
                        </div>
                        <a href="#"><img href="#" src={basket} alt="basket" /></a>
                        <MediaQuery minWidth={800}>
                            <img src={userImg} alt="user" />
                        </MediaQuery>
                    </div>
                </div>
                <MediaQuery maxWidth={799}>
                    <div className={`${styles.expandedMenu} ${this.state.isVisible ? styles.visible : styles.hidden}`}>
                        <MobileNav shouldResetChildren={this.state.isVisible} />
                    </div>
                </MediaQuery>
            </header>
        )
    }
}


export default Header;
