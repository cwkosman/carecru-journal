const initialState = {
  entries: [],
  submissionStatus: 'default',
  loadStatus: 'default'
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
      case 'ENTRY_SUBMITTED': {
        return {...state,
          entries: state.entries.concat(action.payload),
          submissionStatus: 'submitted'
        }
      }
      case 'ENTRY_ERROR': {
        return {...state,
          submissionStatus: 'error'
        }
      }
      case 'ENTRY_DEFAULT': {
        return {...state,
          submissionStatus: 'default'
        }
      }
      case 'REQUESTING_ENTRIES': {
        return {...state,
          loadStatus: 'requesting'
        }
      }
      case 'RECEIVED_ENTRIES': {
        return {...state,
          entries: action.payload,
          loadStatus: 'default'
        }
      }
      case 'DENIED_ENTRIES': {
        return {...state,
          loadStatus: 'error'
        }
      }
    }
  return state
}
