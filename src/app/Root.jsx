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
});

export default Root
