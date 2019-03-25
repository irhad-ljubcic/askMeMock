import React, { Component } from 'react';
import Navbar from './navbar'
import QuestionListContainer from '../containers/questionListContainer'
import HotQuestionContainer from '../containers/hotQuestionContainer';
import HotUserContainer from '../containers/hotUserContainer';
import Footer from './footer'

export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div style={{margin:'20px'}}>
                    <div className="row">
                        <div className="col-md-4">
                           <br></br>
                            <QuestionListContainer />
                        </div>
                        <div className="col-md-4">
                           <br></br>
                            <HotQuestionContainer />
                            <br></br>                            
                        </div>
                        <div className="col-md-4">
                            <HotUserContainer />
                            <br></br>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        );
    }
}