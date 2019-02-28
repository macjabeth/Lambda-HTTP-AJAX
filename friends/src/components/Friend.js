import React from 'react';

const Friend = ({ friend, updateFriend, deleteFriend }) => (
  <li onClick={() => updateFriend(friend)}>
    <span onClick={e => deleteFriend(e, friend.id)}>&times;</span>
    <span>
      {friend.name} is {friend.age} years old. Email them at: {friend.email}
    </span>
  </li>
);

export default Friend;
