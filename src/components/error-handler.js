import * as React from 'react';

export const ErrorHandler=({error}) =>{
    return (
      <div role="alert">
        <p>An error occurred:</p>
        <pre>{error.message}</pre>
      </div>
    )
  };