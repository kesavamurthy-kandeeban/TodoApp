import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react'

import './TodoList.css'
import { Button, message } from 'antd';

import _ from 'lodash';
import moment from 'moment'

import { dateFormat, tableFields, reponseMessage } from '../config/config'
import { editTodo, getTodos } from '../actions/actions';


function TodoList(props) {
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    (async () => {
      const response = await props.getTodos();
      if (response === reponseMessage.apiSuccess) {
        setLoading(true);
      }
    })();

  }, [])

  return (
    <>
      {isLoading && message.success("Todo list loaded successfully") && setLoading(false)}
      <div>
        <table id="showList">
          <tr>
            <th> {tableFields.task} </th>
            <th> {tableFields.reportingTo} </th>
            <th> {tableFields.date} </th>
            <th> {tableFields.createdAt} </th>
          </tr>
          {showList(props)}
        </table>
      </div>
    </>)
}

const showList = (props) => {
  // eslint-disable-next-line
  const todos = _.get(props.todoStore, 'Todo.todoList', [])
  return todos.map(data => (
    <tr key={data._id}>
      <td>{data.taskName}</td>
      <td>{data.reportTo}</td>
      <td>{moment(data.date).format(dateFormat)}</td>
      <td>{moment(data.createdAt).format(`${dateFormat}`)}</td>
      <td><Button onClick={() => {
        props.removeTodo(data._id);
      }}>Remove</Button></td>
      <td><Button onClick={async () => {
        await props.editTodo(data);
        props.editTodos();
      }}>Edit</Button></td>
    </tr>
  ))
}
TodoList.propTypes = {
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  todoStore: PropTypes.array.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    editTodo: todo => dispatch(editTodo(todo)),
    getTodos: () => dispatch(getTodos()),
  };
}

const mapStateToProps = state => {
  return { todoStore: state };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
