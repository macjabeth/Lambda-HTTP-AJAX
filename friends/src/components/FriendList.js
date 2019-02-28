import React from 'react';
import { Route } from 'react-router-dom';
import Friend from './Friend';

const FriendList = ({ friends, ...props }) => {
  function displayForm() {
    props.history.push('/add-friend');
  }

  return (
    <div>
      <ul>
        {friends.length ? (
          friends.map(friend => (
            <Friend key={friend.id} friend={friend} {...props} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
      <Route
        exact
        path="/"
        render={() => <button onClick={displayForm}>Display Form</button>}
      />
    </div>
  );
};

export default FriendList;
