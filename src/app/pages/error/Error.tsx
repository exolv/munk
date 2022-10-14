import React, { FC } from 'react';

import { useRouteError } from 'react-router-dom';

const Error: FC = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <h1>{error.statusText || error.message}</h1>
  );
}

export default Error;