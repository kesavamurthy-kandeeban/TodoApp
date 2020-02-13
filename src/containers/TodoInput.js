import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TodoList from '../components/TodoList';
import Header from '../components/Header';
import TodoForm from '../components/TodoFormDrawer'

import { Select, Button } from 'antd';
import 'antd/dist/antd.css';

import { updateTodos, insertTodos, getTodos, editTodos, deleteTodos, editTodo } from '../actions/actions';
import { buttonName, actionTypes } from '../config/config';

import _ from 'lodash';


class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      typeOfAction: '',
    };

  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  removeTodo = todoId => {
    this.props.deleteTodos(todoId);
  }

  editTodo = () => {
    this.setState({
      visible: true,
      typeOfAction: actionTypes.edit
    })
  }

  saveEdits = (todo) => {
    const todoStore = _.get(this.props.todoStore, 'Todo.editTodo', {});
    todoStore.taskName = todo.todoInput;
    todoStore.reportTo = todo.reportTo;
    todoStore.todoDate = todo.todoDate;
    this.props.editTodos(todoStore);
    this.setState({
      typeOfAction:''
    });
  }

  save = todo => {
    let newItem = {
      value: todo.todoInput,
      date: todo.todoDate,
      reportTo: todo.reportTo,
    };
    this.props.insertTodos(newItem);
  }

  handleSumbit = todo => {
    if (this.state.typeOfAction === actionTypes.edit) {
      this.saveEdits(todo);
    }
    else {
      this.save(todo);
    }
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div className="Align-center">
        <Header currentPage={'Todo'} />
        <Button onClick={() => {   
          this.setState({ visible: true });
        }}> {buttonName.add} </Button>
        <Button>{buttonName.clearStore}</Button>
        <TodoForm
          handleSumbit={this.handleSumbit}
          onShowDrawer={this.state.visible}
          typeOfAction={this.state.typeOfAction} 
          onCloseDrawer={this.onClose}
        />
        <TodoList
          editTodos={this.editTodo}
          removeTodo={this.removeTodo}
        />
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodos: todos => dispatch(updateTodos(todos)),
    insertTodos: todos => dispatch(insertTodos(todos)),
    getTodos: () => dispatch(getTodos()),
    editTodos: payload => dispatch(editTodos(payload)),
    deleteTodos: payload => dispatch(deleteTodos(payload)),
  };
}

const mapStateToProps = state => {
  return { todoStore: state };
};

TodoInput.propTypes = {
  todos: PropTypes.array.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoInput);
