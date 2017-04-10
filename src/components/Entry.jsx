import React, { Component } from 'react'

export default class Entry extends Component {
  render () {
    const { Body, Happiness, SentimentScore } = this.props;
    return (
      <article className="panel panel-default">
        <div className="panel-body">
          <h4>Sentiment Score: {SentimentScore}</h4>
          <h4>Happiness: {Happiness}</h4>
          <p>{Body}</p>
        </div>
      </article>
    )
  }
}
