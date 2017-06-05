'use strict'

import React from "react";
import {Col, Image, PageHeader, Panel} from "react-bootstrap";
import DaysLeftWidget from "../components/DaysLeftWidget.jsx";
import LatestTweetWidget from "../components/LatestTweetWidget.jsx";
import MoodWidget from "../components/MoodWidget.jsx";
import LatestNewsWidget from "../components/LatestNewsWidget.jsx";
import BashingMediaWidget from "../components/BashingMediaWidget.jsx";
import {connect} from "react-redux";
import ActionType from '../constants/ActionType'
import ForkMeOnGitHub from '../components/ForkMeOnGitHub.jsx'

// Import CSS
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Glyphicons from 'bootstrap/fonts/glyphicons-halflings-regular.woff'

function mapStateToProps(state) {
    return state;
}

@connect(mapStateToProps)

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let {dispatch} = this.props;
        dispatch({type: ActionType.FETCH_TWEETS_REQUESTED});
    }

    getSubTitle(){
        return "(Artificially) Intelligent Analysis of Trump's Tweets";
    }

    render(){
        return(
            <div>
                <ForkMeOnGitHub />
                <PageHeader>&nbsp;&nbsp;<Image src="img/DJT.jpg" rounded height="40px" /> Trump Report&nbsp;&nbsp;<small>{this.getSubTitle()}</small></PageHeader>
                <Col lg={8} md={8} sm={8} xs={12}>
                    <Panel header="Twitter" bsStyle="info">
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <LatestTweetWidget />
                            <MoodWidget />
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <BashingMediaWidget />
                        </Col>
                    </Panel>
                </Col>
                <Col lg={4} md={4} sm={4} xs={12}>
                    <DaysLeftWidget />
                    <LatestNewsWidget />
                </Col>
            </div>
        );
    }
}

export default App
