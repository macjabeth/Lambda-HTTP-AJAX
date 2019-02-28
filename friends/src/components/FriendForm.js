import React from 'react';

const FriendForm = ({
  name,
  age,
  email,
  onChangeHandler,
  handleFriendSubmit
}) => (
  <form onSubmit={handleFriendSubmit}>
    <div>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={name}
        onChange={onChangeHandler}
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
        onChange={onChangeHandler}
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
        onChange={onChangeHandler}
        required
      />
    </div>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
);

export default FriendForm;
