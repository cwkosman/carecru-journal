import React, { Component } from 'react'

export default class Entry extends Component {
  render () {
    const { Body, Happiness, SentimentScore } = this.props;
    return (
      <div>
        <p>{Body}</p>
        <p>{Happiness}</p>
        <p>{SentimentScore}</p>
      </div>
    )
  }
}
