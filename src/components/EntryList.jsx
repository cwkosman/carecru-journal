import React, {Component} from 'react';
import Entry from './Entry.jsx';


export default class EntryList extends Component {

  render() {
    const { Entries } = this.props
    return (
      <section>
        {Entries.map((entry) => {
          return (
              <Entry Body={entry.body} Happiness={entry.happiness} SentimentScore={entry.sentimentScore} />
            );
        })}
      </section>
    );
  }
}
