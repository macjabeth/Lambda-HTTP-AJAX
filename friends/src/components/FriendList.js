import React from 'react';
import Friend from './Friend';

const FriendList = ({ friends, ...props }) => {
  function displayForm() {
    props.history.push('/add-friend');
  }

  function goBack() {
    props.history.goBack();
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
      {props.location.pathname === '/' ? (
        <button onClick={displayForm}>Display Form</button>
      ) : (
        <button onClick={goBack}>Go Back</button>
      )}
    </div>
  );
};

export default FriendList;
