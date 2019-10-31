import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";

const imgStyle = {
    width: "45em"
};

const layoutWelcome = {
    textAlign: "center"
};

export default function Welcome() {
    return (
        <div style={layoutWelcome}>
            <img style={imgStyle} src="/assets/reactlogo.svg" />
            <h2>Welcome to your Social Network!</h2>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
