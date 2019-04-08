import React, { Component } from 'react';
import Navigation from './Navigation';
import styles from "./Header.module.scss";
import logo from "../assets/logo.png";

import basket from "../assets/Basket.svg";
import userImg from "../assets/Male User.svg";


const Header = () => (
    <>
    <header>
        <div className={styles.appHeader}>
            <div>
                <img src={logo} alt="logo" />
            </div>
            
            <Navigation />
            

            <div className={styles.userSection}>
                <img src={basket} alt="basket" />
                <img src={userImg} alt="user" />
            </div>
        </div>
    </header>
    </>
)


export default Header;