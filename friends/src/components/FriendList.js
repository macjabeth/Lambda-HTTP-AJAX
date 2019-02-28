import React from 'react';
import PropTypes from 'prop-types';
import Friend from './Friend';

const FriendList = ({ friends, ...props }) => {
  function displayForm() {
    props.history.push('/add-friend');
  }

  function goBack() {
    props.history.goBack();
  }

  console.log(props);

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

FriendList.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  updateFriend: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired
};

export default FriendList;
