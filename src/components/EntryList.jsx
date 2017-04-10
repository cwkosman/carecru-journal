import React, {Component} from 'react';
import Entry from './Entry.jsx';


export default class EntryList extends Component {

  componentDidMount() {
    const { Actions } = this.props
    Actions.getEntries();
  }

  render() {
    const { Entries } = this.props
    // Entries.sort((a, b) => a.sentimentScore - b.sentimentScore);
    return (
      <section>
        <div className="panel panel-default">
        <div className="panel-heading">
        <h2 className="list-title">Journal Entries</h2>
        </div>
        <div className="panel-body">
        {Entries.sort((a, b) => b.sentimentScore - a.sentimentScore).map((entry) => {
          return (
              <Entry key={entry.id} Body={entry.body} Happiness={entry.happiness} SentimentScore={entry.sentimentScore} />
            );
        })}
      </div>
      </div>
      </section>
    );
  }
}
