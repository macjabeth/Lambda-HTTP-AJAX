import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    friends: [],
    name: null,
    age: null,
    email: null
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

  handleNewFriend = event => {
    event.preventDefault();
    const { name, age, email } = this.state;
    axios
      .post('http://localhost:5000/friends', { name, age, email })
      .then(({ data }) =>
        this.setState({
          friends: data,
          name: '',
          age: '',
          email: ''
        })
      )
      .catch(err => console.error(err));
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { friends, name, age, email } = this.state;
    return (
      <div>
        <ul>
          {friends.length ? (
            friends.map(friend => (
              <li key={friend.id}>
                {friend.name} is {friend.age} years old. Email them at:{' '}
                {friend.email}
              </li>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </ul>
        <form onSubmit={this.handleNewFriend}>
          <label htmlFor="name">Name:</label>{' '}
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={this.onChangeHandler}
            required
          />{' '}
          <label htmlFor="age">Age:</label>{' '}
          <input
            type="number"
            name="age"
            id="age"
            value={age}
            onChange={this.onChangeHandler}
            required
          />{' '}
          <label htmlFor="email">Email:</label>{' '}
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.onChangeHandler}
            required
          />{' '}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
