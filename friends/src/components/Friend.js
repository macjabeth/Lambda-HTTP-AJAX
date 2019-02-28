import React from 'react';
import PropTypes from 'prop-types';

const Friend = ({ friend, updateFriend, deleteFriend }) => (
  <li onClick={() => updateFriend(friend)}>
    <span onClick={e => deleteFriend(e, friend.id)}>&times;</span>
    <span>
      {friend.name} is {friend.age} years old. Email them at: {friend.email}
    </span>
  </li>
);

Friend.propTypes = {
  friend: PropTypes.object.isRequired,
  updateFriend: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired
};

export default Friend;
