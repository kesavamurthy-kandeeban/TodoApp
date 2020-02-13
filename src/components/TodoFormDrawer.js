import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { buttonName, reportToOptions, dateFormat, fieldId } from '../config/config';
import { editTodo } from '../actions/actions';


import { Drawer, Select, Input, Form, Button, DatePicker } from 'antd'
import 'antd/dist/antd.css';

import _ from 'lodash';
import moment from 'moment';


const { Option } = Select


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TodoFromDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todoStore: _.get(this.props, 'todoStore.Todo.editTodo', {}),
    };

  }

  componentDidMount() {
    this.props.form.validateFields();
  }
  
  componentDidUpdate(prevProps, prevState) {
    const todoStore = _.get(this.props, 'todoStore.Todo');
    if (prevProps.todoStore.Todo.editTodo !== todoStore.editTodo) {
      this.setState({
        todoStore: _.get(todoStore, 'editTodo', {}),
      }, () => {
        this.setFields();
      });
    }
  }

  onClose = () => {
    this.props.form.setFieldsValue({
      [fieldId.todoInput]: null,
      [fieldId.todoDate]: null,
      [fieldId.reportTo]: null,
    });
    this.props.editTodo({});
    this.props.onCloseDrawer();
  };

  handleSumbit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSumbit(values);
        this.props.form.setFieldsValue({
          [fieldId.todoInput]: null,
          [fieldId.todoDate]: null,
          [fieldId.reportTo]: null,
        });
      }
    });
  }

  setFields = () => {
    this.props.form.setFieldsValue({
      [fieldId.todoInput]: this.state.todoStore.taskName,
      [fieldId.todoDate]: moment(this.state.todoStore.date),
      [fieldId.reportTo]: this.state.todoStore.reportTo,
    });
  }

  showForm = () => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const todoError = isFieldTouched(fieldId.todoInput) && getFieldError(fieldId.todoInput);
    const reportError = isFieldTouched(fieldId.reportTo) && getFieldError(fieldId.reportTo);
    const dateError = isFieldTouched(fieldId.todoDate) && getFieldError(fieldId.todoDate);

    return (<div >
      <Drawer
        title="Todo list"
        placement="right"
        width="500px"
        closable={true}
        onClose={this.onClose}
        visible={this.props.onShowDrawer}
      >
        <Form onSubmit={this.handleSumbit}>
          <Form.Item
            validateStatus={todoError ? 'error' : ''} help={todoError || ''}
          >
            {getFieldDecorator(fieldId.todoInput, {
              rules: [{ required: true, message: 'Please enter the task!', whitespace: true }],
            })(<Input
              id="todoInput"
              placeholder="Todo.."
            />)}
          </Form.Item>
          <Form.Item
            validateStatus={dateError ? 'error' : ''} help={dateError || ''}
          >
            {getFieldDecorator(fieldId.todoDate, {
              rules: [{ required: true, message: 'Please choose the task completion date!' }],
            })(<DatePicker
              format={dateFormat}
              placeholder="Choose the task date"
            />)}
          </Form.Item>
          <Form.Item
            label="Report To"
            validateStatus={reportError ? 'error' : ''} help={reportError || ''}
          >
            {getFieldDecorator(fieldId.reportTo, {
              rules: [{ required: true, message: 'Select the person you want to report', whitespace: true }],
            })(
              <Select placeholder="Select the person to reportTo" size="default" >
                <Option value={reportToOptions.REPORT_TO_1}>{reportToOptions.REPORT_TO_1}</Option>
                <Option value={reportToOptions.REPORT_TO_2}>{reportToOptions.REPORT_TO_2}</Option>
              </Select>
            )}
          </Form.Item>
          <Button
            block
            disabled={hasErrors(getFieldsError())}
            htmlType="submit">{buttonName.save}</Button>
          <Button
            block
            type="primary"
            onClick={() => this.props.onCloseDrawer(false)}
          >
            {buttonName.cancel}
          </Button>
        </Form>
        <br></br>
      </Drawer>
    </div>);
  }

  render() {
    return (
      <>
        {this.showForm()}
      </>
    );
  }
}


TodoFromDrawer.propTypes = {
  handleSumbit: PropTypes.func.isRequired,
  actionTypes: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return { todoStore: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editTodo: todo => dispatch(editTodo(todo)),
  }
}

const TodoForm = Form.create({ name: 'todo_form' })(TodoFromDrawer);

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);

