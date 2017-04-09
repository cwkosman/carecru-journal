import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EntryForm from '../components/EntryForm.jsx'
import EntryList from '../components/EntryList.jsx'
import * as EntryActions from '../actions';

const App = ({ entries, actions }) => (
  <div>
    <p>Hello</p>
    <EntryForm Actions={actions}/>
    <EntryList Entries={entries}/>
  </div>
)

const mapStateToProps = state => ({
  entries: state.journal.entries
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(EntryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
