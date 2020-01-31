import React from 'react'
import './TodoList.css'
import {PropTypes} from 'prop-types';
import { Button } from 'antd';

function TodoList(props) {
  return (
    <div>
      <table id="showList">
        <tr>
          <th>Task </th>
          <th> Reporting-to </th>
          <th> Date</th>
        </tr>
        {showList(props)}
      </table>
    </div>)
}

const showList = (props) => {
  // eslint-disable-next-line

  return props.todoStore.Todo.todos.map(data => {
    return (
      <tr key={data.id}>
        <td>{data.value}</td>
        <td>{data.reportTo}</td>
        <td>{data.date}</td>
        <td><Button onClick={() => {
          props.removeTodo(data.id);
        }}>Remove</Button></td>
        <td><Button onClick={() => {
          props.updateTodo(data)
        }}>Edit</Button></td>
      </tr>)
  })
}
TodoList.propTypes = {
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  todoStore: PropTypes.array.isRequired,
}
export default TodoList;
