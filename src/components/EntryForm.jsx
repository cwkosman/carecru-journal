import React, { Component } from 'react'

export default class EntryForm extends Component {

  constructor() {
  super();
  this.state = {
    entryBody: '',
    entryHappiness: 0
  }
}

  render() {
    return (
      <section>
          <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="form-title">New Journal Entry</h2>
          </div>
          <div className="panel-body">
          <form id="entry">
          <div className="form-group form-happiness">
            <label htmlFor="entry-happiness">Happiness Score</label>
            <label className="entry-happiness-label negative">Negative</label>
            <label className="entry-happiness-label positive">Positive</label>
            <input ref="entryHappiness" type="range" id="entry-happiness" className="entry-happiness" name="entry-happiness" min="-10" max="10" value={this.state.entryHappiness} onChange={this._handleChange('entryHappiness').bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="entry-body">Journal Entry</label>
            <textarea ref="entryBody" id="entry-body" className="entry-body" name="entry-body" placeholder="Dear journal..." rows="10" cols="50" value={this.state.entryBody} onChange={this._handleChange('entryBody').bind(this)}></textarea>
          </div>
          <button className="btn btn-success" onClick={this._handleSubmit.bind(this)}>Submit</button>
        </form>
      </div>
      </div>
      </section>
    );
  }

  _handleChange(key) {
    return function (e) {
      var intermediateState = {};
      intermediateState[key] = e.target.value;
      this.setState(intermediateState);
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.Actions.saveEntry(this.state.entryHappiness, this.state.entryBody);
    this.refs.entryHappiness.value = 0;
    this.refs.entryBody.value = '';
  }
}
