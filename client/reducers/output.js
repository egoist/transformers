const defaultState = {
  active: true
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_OUTPUT':
      return Object.assign({}, state, {
        active: !state.active
      })
    default:
      return state
  }
}
