import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Test from '../components/Test.jsx'
import EntryForm from '../components/EntryForm.jsx'
import * as TestActions from '../actions';

const App = ({test, actions}) => (
  <div>
    <Test TestProps={test} Actions={actions}/>
    <EntryForm />
  </div>
)

const mapStateToProps = state => ({
  test: state.test
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TestActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
