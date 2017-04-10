import axios from 'axios'
import { calculateSentimentScore } from '../helpers/sentiment.js'

export function saveEntry(entryHappiness, entryBody) {
  const entrySentimentScore = calculateSentimentScore(entryHappiness, entryBody)
  const payload = {
    happiness: entryHappiness,
    body: entryBody,
    sentimentScore: entrySentimentScore
  }
  return dispatch => {
    dispatch({
      type: 'SUBMIT_ENTRY',
      payload
    })
    axios.post('/new', {
      data: {
        payload
      }
    }).then((response) => {
    dispatch({
      type: 'DUMMY',
    })
  })
  }
}
