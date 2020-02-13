import React from 'react';
import { connect } from 'react-redux';

import { Form, Button, Input, DatePicker, Drawer, Card } from 'antd'
import 'antd/dist/antd.css';
import moment from 'moment';

import { updatemovies } from '../actions/actions';

import MovieList from '../components/MovieList'

const { TextArea } = Input;
class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.id = 0;
    this.exist = false;
    this.validation = '';
    this.handleSumbit = this.handleSumbit.bind(this);
    this.viewMovie = this.viewMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.showForm = this.showForm.bind(this);
  }
  state = {
    movieDetails: [],
    visible: false,
    editFunc: false,
    showForm: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };
  componentDidMount() {
    this.props.form.validateFields();
  }

  editMovie(movieDetails) {
    // eslint-disable-next-line
    this.showFormByValue(true)
    this.props.movies.Movies.list.map(data => {
      if (data.id === movieDetails.id) {
        setTimeout(() => {
          this.props.form.setFieldsValue({
            movieName: movieDetails.movieName,
            description: movieDetails.description,
            moviePoster: movieDetails.moviePoster,
            releaseDate: moment(movieDetails.releaseDate),
          });
        }, 0)
      }
      this.setState({
        editFunc: true,
        editId: movieDetails.id
      })
    })
  }

  removeMovie(movieDetails) {
    this.props.updatemovies(this.props.movies.Movies.list.filter(data => data.id !== movieDetails.id))
  }

  viewMovie(movieDetails) {
    this.setState({
      movieDetails: movieDetails,
      visible: true
    });
  }

  handleSumbit = (event) => {
    event.preventDefault();
    this.exist = false;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line
        this.props.movies.Movies.list.map(data => {
          if (values.movieName.toLowerCase().trim() === data.movieName.toLowerCase().trim()
            && this.state.editFunc !== true
          ) {
            this.exist = true;
          }
        })
        if (this.exist === false) {
          this.showFormByValue(false)

          if (this.state.editFunc) {
            this.saveEdit(values)
          }
          else {
            this.save(values)
          }
        }
      }
    })
  }

  saveEdit(values) {
    let moviesList = this.props.movies.Movies.list;

    // eslint-disable-next-line
    moviesList.map(data => {
      if (data.id === this.state.editId) {
        data.movieName = values.movieName;
        data.description = values.description;
        data.releaseDate = values.releaseDate
      }
      this.props.updatemovies(moviesList);
      this.setState({
        editFunc: false,
      })
    })
  }

  save(values) {
    let moviesList = this.props.movies.Movies.list;
    values.id = ++this.id;
    moviesList.push(values);
    this.props.updatemovies(moviesList);
  }

  showFormByValue = (showForm) => {
    this.setState({ showForm });
  }

  showForm() {
    const { isFieldTouched, getFieldDecorator, getFieldsError, getFieldError } = this.props.form;
    const movienameerror = isFieldTouched('movieName') && getFieldError('movieName');
    const moviePostererror = isFieldTouched('moviePoster') && getFieldError('moviePoster');
    const descriptionerror = isFieldTouched('description') && getFieldError('description');
    const MovieDateerror = isFieldTouched('releaseDate') && getFieldError('releaseDate');
    return (
      <Form onSubmit={this.handleSumbit}>
        <Form.Item
          validateStatus={(this.exist || movienameerror) ? 'error' : ''} help={this.exist ? 'Movie name already exist' : ((movienameerror) ? 'Please enter a valid movie name' : '')}
        >
          {getFieldDecorator('movieName', {
            rules: [
              {
                required: true,
                message: 'Please enter the Movie name',
                whitespace: true
              }
            ],
          })(<Input
            onChange={this.exist = false}
            placeholder="Movie Name"
          />)}
        </Form.Item>
        <Form.Item
          validateStatus={descriptionerror ? 'error' : ''} help={descriptionerror || ''}
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please enter the description of the movie', whitespace: true }],
          })(<TextArea
            placeholder="Description"
          />)}
        </Form.Item>

        <Form.Item
          validateStatus={moviePostererror ? 'error' : ''} help={moviePostererror || ''}
        >
          {getFieldDecorator('moviePoster', {
            rules: [{
              required: true, message: 'Please enter the URL of the movie', whitespace: true, type: 'url',
            }],
          })(<Input
            placeholder="URL"
          />)}
        </Form.Item>

        <Form.Item
          validateStatus={MovieDateerror ? 'error' : ''} help={MovieDateerror || ''}
        >
          {getFieldDecorator('releaseDate', {
            rules: [{ required: true, message: ' Please choose a Date' }],
          })(<DatePicker
            placeholder="Movie date"
          />)}
        </Form.Item>
        <Button
          type="primary"
          disabled={hasErrors(getFieldsError())}
          htmlType="submit">Save</Button>
        <Button
          onClick={() => { this.showFormByValue(false) }}
        >
          Cancel
        </Button>
      </Form>
    )
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => { this.showFormByValue(true) }}
        >
          Add
        </Button>
        <Drawer
          title="Movie Details"
          placement={this.state.placement}
          closable={true}
          width={400}
          visible={this.state.visible}
          onClose={this.onClose}
        >
          <Card style={{ width: 300 }} bordered={false}>
            <img src={this.state.movieDetails.moviePoster} style={{ width: 300 } }  />
          </Card>
          <h1 className="textstyle">{this.state.movieDetails.movieName}</h1>

          <br></br>
          <br></br>
          <h2 className="textColor">{this.state.movieDetails.description}</h2>
          <br></br>
          <br></br>
          <div> <h5 className="textColor">Release Date:{moment(this.state.movieDetails.releaseDate).format('DD/MM/YYYY')}</h5></div>
        </Drawer>
        {this.state.showForm && this.showForm()}
        <MovieList
          MovieLists={this.props.movies}
          viewMovie={this.viewMovie}
          editMovie={this.editMovie}
          removeMovie={this.removeMovie}
        />
      </div>
    )
  }
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


const mapStateToProps = state => {
  return { movies: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatemovies: Movies => dispatch(updatemovies(Movies))
  };
}

const movieform = Form.create({ name: 'moviesForm' })(Movies)
export default connect(mapStateToProps, mapDispatchToProps)(movieform);
