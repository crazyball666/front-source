import React, { Component } from 'react';

export default class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
    };
  }
  componentWillMount() {
    this.setState({
      show: true
    })
  }
  handleAnimation() {

  }
  render() {
    return (
      // <div className={this.state.show ? this.props.name : ''} onAnimationEnd={this.handleAnimation}>
      this.props.children

    )
  }
}