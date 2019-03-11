import React from 'react';

export default ({ question: { body,upvotes,downvotes, _id } }) => {
  return (
    <div>
      <p>{ body }</p>
      <div>{upvotes}</div>
      <div>{downvotes}</div>
    </div>
  );
};