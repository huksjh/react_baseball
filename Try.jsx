import React, { Component } from 'react';

class Try extends Component {
    render() {
        return (
            <li key={this.props.idx + `번째입력`}>
                <div>{this.props.tyuinfo.try}</div>
                <div>{this.props.tyuinfo.result}</div>
            </li>
        );
    }
}

export default Try;
