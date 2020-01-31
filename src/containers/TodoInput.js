import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import TodoList from '../components/TodoList'
import Header from '../components/Header'
import 'antd/dist/antd.css';

import { updateTodos } from '../actions/actions';

import { Select, Button, Form, Input } from 'antd'
import { REPORT_TO_1, REPORT_TO_2 } from '../constants/constants'
const { Option } = Select;

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewForm: false,
    };

    //Subscription task
    this.update = { id: 0, status: false };
    this.saveEdits = this.saveEdits.bind(this);
    this.showForm = this.showForm.bind(this);
    this.save = this.save.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.id = 0;
  }
  removeTodo = (todoId) => {
    this.props.updateTodos(this.props.todos.Todo.todos.filter(todo => todo.id !== todoId))
  }

  editTodo = (todo) => {
    const todoInput = 'todoInput';
    const reportTo = 'reportTo';

    setTimeout(() => {
      this.props.form.setFieldsValue({
        [todoInput]: todo.value,
        [reportTo]: todo.reportTo
      });
    }, 0)
    this.setState({ viewForm: true });
    this.update = ({
      id: todo.id,
      status: true,
    })
  }
  saveEdits = (list, values) => {
    list.map(data => {
      if (data.id === this.update.id) {
        data.value = values.todoInput;
        data.reportTo = values.reportTo;
      }
    })
    this.props.updateTodos(list)
    this.update = { id: 0, status: false }
  }
  save = (list, values) => {
    let newItem = {
      id: ++this.id,
      value: values.todoInput,
      date: new Date().toLocaleDateString(),
      reportTo: values.reportTo,
    }
    let todos = list
    todos.push(newItem)
    this.props.updateTodos(todos)
  }
  componentDidMount() {
    this.props.form.validateFields();
  }
  handleSumbit = event => {
    event.preventDefault();
    const { todos } = this.props;
    let list = todos.Todo.todos;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        if (this.update.status) {
          this.setState({
            viewForm: false
          })
          this.saveEdits(list, values);
        }
        else {
          this.save(list, values)
          this.setState({
            viewForm: false
          })
        }
      }
    });
  }
  showForm = () => {
    const { getFieldDecorator, getFieldsError, getFieldError } = this.props.form;
    const todoerror = getFieldError('todoInput');
    const reporterror = getFieldError('todoInput');
    return (
      <div >
        <Form onSubmit={this.handleSumbit}>
          <Form.Item
            validateStatus={todoerror ? 'error' : ''} help={todoerror || ''}
          >
            {getFieldDecorator('todoInput', {
              rules: [{ required: true, message: 'Please enter the task!', whitespace: true }],
            })(<Input
              id="todoInput"
              placeholder="Todo.."
            />)}
          </Form.Item>
          {/* <br></br> */}
          <Form.Item
            label="Report To"
            validateStatus={reporterror ? 'error' : ''} help={reporterror || ''}
          >
            {getFieldDecorator('reportTo', {
              rules: [{ required: true, message: 'Select the person you want to report', whitespace: true }],
            })(
              <Select placeholder="Assign roles for this user" size="defualt" style={{ width: 300 }}>
                <Option value={REPORT_TO_1}>{REPORT_TO_1}</Option>
                <Option value={REPORT_TO_2}>{REPORT_TO_2}</Option>
              </Select>
            )}
          </Form.Item>

          {/* <br></br> */}
          <Button
            disabled={hasErrors(getFieldsError())}
            htmlType="submit">Save</Button>
          <Button
            htmlType="submit"
            onClick={() => this.setState({ viewForm: false })}
          >Cancel</Button>
          <Button
            onClick={() => {
              this.props.updateTodos([]);
              this.setState({ viewForm: false })
            }
            }
          >Clear Store</Button>
        </Form>
        <br></br>
      </div>);
  }

  render() {
    return (
      <div className="Align-center">
        <Header currentPage={'Todo'}/>
        <Button onClick={() => { this.setState({ viewForm: true }) }}> Add </Button>
        {(this.state.viewForm) ? this.showForm() : ""}
        <TodoList
          removeTodo={this.removeTodo}
          updateTodo={this.editTodo}
          todoStore={this.props.todos}
        />
      </div>)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodos: todos => dispatch(updateTodos(todos))
  };
}

const mapStateToProps = state => {
  return { todos: state };
};

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const TodoForm = Form.create({ name: 'todo_form' })(TodoInput);


TodoInput.propTypes = {
  todos: PropTypes.array.isRequired,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoForm);
