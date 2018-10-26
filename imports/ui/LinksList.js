import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Tracker} from "meteor/tracker";
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import {Links} from "../api/links";
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };

        this.renderLinksListItems = this.renderLinksListItems.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount LinksList');
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({links});
        });
    }

    componentWillUnmount() {
        console.log('componentDidUnmount LinksList');
        this.linksTracker.stop();
    }

    renderLinksListItems() {
        if(this.state.links.length === 0) {
            return (
              <div className="item">
                  <p className="item__status-message">No links found.</p>
              </div>
            );
        }

        return this.state.links.map((l) => {
            const shortUrl = Meteor.absoluteUrl(l._id);
            return <LinksListItem key={l._id} {...l} shortUrl={shortUrl}/>;
        });
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
};
