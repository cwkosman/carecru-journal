const initialState = {
  greeting: 'Welcome'
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
      case 'TEST_ACTION': {
        return {...state, greeting: action.payload.greeting}
      }
    }
  return state
}
