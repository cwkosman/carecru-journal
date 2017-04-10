import axios from 'axios'
import { calculateSentimentScore } from '../helpers/sentiment.js'
import uuidV4 from 'uuid'

export function saveEntry(entryHappiness, entryBody) {
  const payload = {
    happiness: entryHappiness,
    body: entryBody,
    sentimentScore: calculateSentimentScore(entryHappiness, entryBody),
    id: uuidV4(),
    createdAt: Date.now()
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
    })
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

export function getEntries() {
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
