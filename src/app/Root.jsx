'use strict';

import ReactDOM from "react-dom";
import App from './App.jsx'
import Store from "../stores/Store";
import React from "react";
import {Provider} from "react-redux";

class Root extends React.Component {

    render(){
        return(
            <Provider store={Store}>
                <App />
            </Provider>
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Root />, document.getElementById('app'));
    // Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-8004148-11', 'auto');
    ga('send', 'pageview');
});

export default Root
