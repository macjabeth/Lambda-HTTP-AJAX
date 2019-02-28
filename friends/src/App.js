import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import axios from 'axios';
import FriendList from './components/FriendList';
import FriendForm from './components/FriendForm';

const initialFrenn = { id: '', name: '', age: '', email: '' };

class App extends Component {
  state = {
    friends: [],
    frenn: initialFrenn
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.fetchFriends();
  }

  fetchFriends() {
    axios
      .get('http://localhost:5000/friends')
      .then(({ data }) => this.setState({ friends: data }))
      .catch(err => console.error(err));
  }

  handleFriendSubmit = event => {
    event.preventDefault();

    const { name, age, email, id } = this.state.frenn;
    const url = id
      ? `http://localhost:5000/friends/${id}`
      : 'http://localhost:5000/friends';

    axios[id ? 'put' : 'post'](url, { name, age, email })
      .then(({ data }) => this.setState({ friends: data, frenn: initialFrenn }))
      .catch(err => console.error(err));
  };

  updateFriend = ({ id, name, age, email }) => {
    this.setState({ frenn: { id, name, age, email } });
    if (this.props.location.pathname !== '/add-friend')
      this.props.history.push('/add-friend');
  };

  deleteFriend = (e, id) => {
    e.stopPropagation();
    axios
      .delete(`http://localhost:5000/friends/${id}`)
      .then(({ data }) => this.setState({ friends: data }))
      .catch(err => console.error(err));
  };

  onChangeHandler = ({ target: { name, value } }) => {
    this.setState(state => ({ frenn: { ...state.frenn, [name]: value } }));
  };

  render() {
    const {
      friends,
      frenn: { name, age, email }
    } = this.state;
    return (
      <div className="app">
        <Route
          path="/"
          render={props => (
            <FriendList
              {...props}
              friends={friends}
              updateFriend={this.updateFriend}
              deleteFriend={this.deleteFriend}
            />
          )}
        />
        <Route
          path="/add-friend"
          render={props => (
            <FriendForm
              name={name}
              age={age}
              email={email}
              handleFriendSubmit={this.handleFriendSubmit}
              onChangeHandler={this.onChangeHandler}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
