import React from "react";
import {Helmet} from "react-helmet";

const TitleHelmet = (props) => {
    return (
        <Helmet>
            <title>{props.title ? props.title : "Web Project 4"}</title>
        </Helmet>
    );
}
export default TitleHelmet;