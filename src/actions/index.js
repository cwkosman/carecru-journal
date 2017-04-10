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
      type: 'SUBMITTING_ENTRY',
    })
    axios.post('/entries', {
      data: {
        payload
      }
    }).then(() => {
    dispatch({
      type: 'ENTRY_SUBMITTED',
      payload
    });
    setTimeout(() =>
      dispatch({
        type: 'ENTRY_DEFAULT',
      }), 3000)
    }).catch(() => {
      dispatch({
        type: 'ENTRY_ERROR'
      })
    })
  }
}

export function getEntries(entryHappiness, entryBody) {
  return dispatch => {
    dispatch({
      type: 'REQUESTING_ENTRIES',
    })
    axios.get('/entries').then((response) => {
    dispatch({
      type: 'RECEIVED_ENTRIES',
      payload: response.data
    })
  })
  }
}
