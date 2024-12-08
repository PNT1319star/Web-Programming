import React from "react";
import CSSModules from 'react-css-modules';
import styles from './Logout.style.css';
import logoutIcon from '../../../icons/logout.png';

const Logout = (props) => {
    return (
        <a className="logout-link" href="/" onClick={(e) => props.action(e)}>
            <img src={logoutIcon} alt="Log out" height="30"/>
        </a>
    );
}

export default CSSModules(Logout, styles, {allowMultiple: true, handleNotFoundStyleName:'ignore'});