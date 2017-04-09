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
      <div>
        <form id="entry">
          <input ref="entryHappiness" type="range" name="entry-happiness" min="-10" max="10" value={this.state.entryHappiness} onChange={this._handleChange('entryHappiness').bind(this)} />
          <textarea ref="entryBody" name="entry-body" placeholder="Dear journal..." rows="10" cols="50" value={this.state.entryBody} onChange={this._handleChange('entryBody').bind(this)}></textarea>
          <button onClick={this._handleSubmit.bind(this)}>Submit</button>
        </form>
      </div>
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
