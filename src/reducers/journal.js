const initialState = {
  entries: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
      case 'SUBMIT_ENTRY': {
        const newEntry = {
          happiness: action.payload.entryHappiness,
          body: action.payload.entryBody,
          //sentimentScore
        }
        return {...state,
          entries: state.entries.concat(newEntry)
        }
      }
    }
  return state
}
