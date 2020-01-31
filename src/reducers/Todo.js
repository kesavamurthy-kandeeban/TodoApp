import { UPDATE_TODOS } from '../action-type/action-types'
const initialState = {
  todos: [],
}
function reducer(state = initialState, action) {

  switch (action.type) {
    case UPDATE_TODOS:
      return Object.assign({}, state, {
        // todos: state.todos.concat(action.payload)
        todos: action.payload,
      });
    default: return state;
  }
}
export default reducer;