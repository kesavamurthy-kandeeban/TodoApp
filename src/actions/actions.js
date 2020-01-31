import { UPDATE_TODOS, UPDATE_MOVIES} from '../action-type/action-types'
export function updateTodos(payload) {
  return { type: UPDATE_TODOS, payload }
}
export function updatemovies(payload) {
  return { type: UPDATE_MOVIES, payload }
}