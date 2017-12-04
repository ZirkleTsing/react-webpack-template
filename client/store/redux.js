const ADD = 'ADD'

const initialState = {
  count: 1,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD: {
      return { ...state, count: state.count + 1 }
    }
    default: {
      return state
    }
  }
}

function add() {
  return { type: ADD }
}

module.exports = {
  add,
  reducer,
}
