import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = { friends: [] };

  componentDidMount() {
    axios
      .get('http://localhost:5000/friends')
      .then(({ data }) => this.setState({ friends: data }))
      .catch(err => console.error(err));
  }

  render() {
    const { friends } = this.state;

    return (
      <div>
        <ul>
          {friends.map(friend => (
            <li>
              {friend.name} is {friend.age} years old. Email them at:{' '}
              {friend.email}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
