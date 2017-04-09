import { calculateSentimentScore } from '../helpers/sentiment.js'

const initialState = {
  entries: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
      case 'SUBMIT_ENTRY': {
        const { entryHappiness, entryBody } = action.payload;
        const newEntry = {
          happiness: entryHappiness,
          body: entryBody,
          sentimentScore: calculateSentimentScore(entryHappiness, entryBody)
        }
        return {...state,
          entries: state.entries.concat(newEntry)
        }
      }
    }
  return state
}
