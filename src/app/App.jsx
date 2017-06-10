'use strict'

import React from "react";
import {Col, Image, PageHeader, Panel} from "react-bootstrap";
import DaysLeftWidget from "../components/DaysLeftWidget.jsx";
import LatestTweetWidget from "../components/LatestTweetWidget.jsx";
import MoodWidget from "../components/MoodWidget.jsx";
import LatestNewsWidget from "../components/LatestNewsWidget.jsx";
import BashingMediaWidget from "../components/BashingMediaWidget.jsx";
import BraggingWidget from "../components/BraggingWidget.jsx";
import MoodCategoryTweetWidget from "../components/MoodCategoryTweetWidget.jsx";
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
        dispatch({type: ActionType.FETCH_DATA_REQUESTED});
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
                    <Panel header="Latest Tweet" bsStyle="info">
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <LatestTweetWidget />
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <MoodWidget />
                        </Col>
                    </Panel>
                    <Panel header="Categorized Tweets by Emotion" bsStyle="info">
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <MoodCategoryTweetWidget mood="Disgust" />
                            <MoodCategoryTweetWidget mood="Fear" />
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <MoodCategoryTweetWidget mood="Anger" />
                            <MoodCategoryTweetWidget mood="Sadness" />
                            <MoodCategoryTweetWidget mood="Joy" />
                        </Col>
                    </Panel>
                </Col>
                <Col lg={4} md={4} sm={4} xs={12}>
                    <Panel header="Categorized Tweets by Action" bsStyle="info">
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <BashingMediaWidget />
                        </Col>
                    </Panel>
                    <DaysLeftWidget />
                    <LatestNewsWidget />
                </Col>
            </div>
        );
    }
}

export default App
