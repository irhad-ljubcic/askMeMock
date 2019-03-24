import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer className="navbar-fixed-bottom">
                <div className="row justify-content-md-center" style={{ backgroundColor: '#007bff', color: 'white' }}>
                    <div className="col-md-12 text-center">
                        <div style={{ marginTop: '10px' }}>
                            <p>© <span>2019</span> <span>Irhad Ljubcic</span></p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}