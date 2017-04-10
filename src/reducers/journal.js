const initialState = {
  entries: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
      case 'SUBMIT_ENTRY': {
        return {...state,
          entries: state.entries.concat(action.payload)
        }
      }
    }
  return state
}
