import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    friends: [],
    id: '',
    name: '',
    age: '',
    email: ''
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

    const { name, age, email, id } = this.state;
    const url = id
      ? `http://localhost:5000/friends/${id}`
      : 'http://localhost:5000/friends';

    axios[id ? 'put' : 'post'](url, { name, age, email })
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

  updateFriend = ({ id, name, age, email }) => {
    this.setState({ name, age, email, id });
  };

  deleteFriend = (e, id) => {
    e.stopPropagation();
    axios
      .delete(`http://localhost:5000/friends/${id}`)
      .then(({ data }) => this.setState({ friends: data }))
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
      <div className="app">
        <ul>
          {friends.length ? (
            friends.map(friend => (
              <li key={friend.id} onClick={() => this.updateFriend(friend)}>
                <span onClick={e => this.deleteFriend(e, friend.id)}>
                  &times;
                </span>
                <span>
                  {friend.name} is {friend.age} years old. Email them at:{' '}
                  {friend.email}
                </span>
              </li>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </ul>
        <form onSubmit={this.handleFriendSubmit}>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={this.onChangeHandler}
              required
            />{' '}
          </div>
          <div>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Age"
              value={age}
              onChange={this.onChangeHandler}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={this.onChangeHandler}
              required
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
