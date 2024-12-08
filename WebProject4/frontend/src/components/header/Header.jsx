import React from "react";
import CSSModules from "react-css-modules";
import styles from "./Header.style.css";
import Logout from "./logout/Logout";

const Header = (props) => {
    const handleLogout = (e) => {
        e.preventDefault();
        props.logout();
    }
    return (
        <header className="main-header theme">
            {props.loggedUser && <Logout action={handleLogout}/>}
            <ul className="main-header-content info">
                <li className="info-item">Web Project 4</li>
                <li className="info-item">38956</li>
            </ul>
            <ul className="main-header-content creator">
                <li className="creator-item">Фан Нгок Туан Р3221</li>
            </ul>
        </header>
    );
}
export default CSSModules(Header, styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore'});