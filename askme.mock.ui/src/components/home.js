import React, { Component } from 'react';
import Navbar from './navbar'
import QuestionListContainer from '../containers/questionListContainer'
import HotQuestionContainer from '../containers/hotQuestionContainer';
import HotUserContainer from '../containers/hotUserContainer';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                           <br></br>
                            <QuestionListContainer />
                        </div>
                        <div className="col-md-6">
                           <br></br>
                            <HotQuestionContainer />
                            <br></br>
                            <HotUserContainer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}