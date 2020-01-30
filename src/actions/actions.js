import { UPDATE_TODOS } from '../action-type/action-types'
export function updateTodos(payload) {
  return { type: UPDATE_TODOS, payload }
}