import React, { Component } from 'react'

export default class Test extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <p>Hello</p>
        <p>{this.props.TestProps.greeting}</p>
        <button onClick={this.props.Actions.changeGreeting}>GNDN</button>
      </div>
    );
  }
}
