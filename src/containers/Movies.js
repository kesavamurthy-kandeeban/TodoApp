import React from 'react';
import { connect } from 'react-redux';

import { Form, Button, Input, DatePicker, Drawer } from 'antd'
import 'antd/dist/antd.css';

import { updatemovies } from '../actions/actions';

import MovieList from '../components/MovieList'

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.id = 0;
    this.handleSumbit = this.handleSumbit.bind(this);
    this.viewMovie = this.viewMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
  }
  state = {
    MovieDetails: [],
    visible: false,
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
    // this.props.movies.Movies.list.map(data=>{
    //   if(data.id === movieDetails.id){
    //     setTimeout(() => {
    //       this.props.form.setFieldsValue({
    //         movieName: movieDetails.movieName,
    //         description: movieDetails.description,
    //         releaseDate: movieDetails.releaseDate,
    //       });
    //     }, 0)
    //   } 
    // })  
  }

  removeMovie(movieDetails) {

  }

  viewMovie(movieDetails) {
    this.setState({
      MovieDetails: movieDetails,
      visible: true
    });
  }



  handleSumbit = (event) => {
    event.preventDefault();
    let moviesList = this.props.movies.Movies.list;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.releaseDate = values.releaseDate.toString();
        values.id = ++this.id;
        moviesList.push(values)
        console.log(moviesList)
        this.props.updatemovies(moviesList);
        setTimeout(() => {
          this.props.form.setFieldsValue({
            movieName: "",
            description: "",
            releaseDate: "",
          });
        }, 0)
      }
    })
  }

  render() {
    const { isFieldTouched, getFieldDecorator, getFieldsError, getFieldError } = this.props.form;
    const movienameerror = isFieldTouched('movieName') && getFieldError('movieName');
    const descriptionerror = isFieldTouched('description') && getFieldError('description');
    const MovieDateerror = isFieldTouched('releaseDate') && getFieldError('releaseDate');
    const { TextArea } = Input;
    console.log(this.props); 

    return (
      <div>
        <Drawer
          title="Movie Details"
          placement={this.state.placement}
          closable={true}
          width={400}
          visible={this.state.visible}
          onClose={this.onClose}
        >
          <h1 className="textstyle">{this.state.MovieDetails.movieName}</h1>
          <br></br>
          <br></br>
          <h2 className="textColor">{this.state.MovieDetails.description}</h2>
          <br></br>
          <br></br>
          <div> <h5 className="textColor">{this.state.MovieDetails.releaseDate}</h5></div>
        </Drawer>
        <Form onSubmit={this.handleSumbit}>
          <Form.Item
            validateStatus={movienameerror ? 'error' : ''} help={movienameerror || ''}
          >
            {getFieldDecorator('movieName', {
              rules: [{ required: true, message: 'Please enter the Movie name', whitespace: true }],
            })(<Input
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
        </Form>
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

const movieform = Form.create({ name: 'moviesForm' })(Movies)

const mapStateToProps = state => {
  return { movies: state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatemovies: Movies => dispatch(updatemovies(Movies))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(movieform);