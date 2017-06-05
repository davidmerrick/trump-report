'use strict'

import React from "react";
import {ListGroup, ListGroupItem, Panel} from "react-bootstrap";
import ActionType from "../constants/ActionType";
import {connect} from "react-redux";
import StoreState from '../constants/StoreState'
import PoweredByLink from './PoweredByLink.jsx'

function mapStateToProps(state) {
    return {
        storeState: state.NewsReducer.storeState,
        error: state.NewsReducer.error,
        articles: state.NewsReducer.articles
    };
}

@connect(mapStateToProps)

class LatestNews extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let {dispatch} = this.props;
        dispatch({type: ActionType.FETCH_NEWS_REQUESTED});
    }

    getRenderedArticles(){
        let {articles} = this.props;
        let rendered = articles
            .slice(0, this.props.NUM_ARTICLES)
            .map(item => {
                return(
                    <ListGroupItem>
                        <a href={item.url} target="_blank">{item.title}</a>
                    </ListGroupItem>
                );
        });
        return <ListGroup>{rendered}</ListGroup>;
    }

    render(){
        let title = "Latest News";
        let {articles, storeState} = this.props;
        let body;
        switch(storeState){
            case StoreState.EMPTY:
            case StoreState.LOADING:
                body = "Loading...";
                break;
            case StoreState.READY:
                if(articles.length === 0) {
                    body = "No articles found. Try again later."
                } else {
                    body = this.getRenderedArticles();
                };
                break;
            default:
                body = "Error: Widget failed to load."
                break;
        };

        return(
            <Panel header={title} bsStyle="primary">
                {body}
                <br />
                <PoweredByLink
                    anchorText="News API"
                    href="https://newsapi.org/"
                />
            </Panel>
        );
    }
}

LatestNews.defaultProps = {
    NUM_ARTICLES: 5
};

export default LatestNews
