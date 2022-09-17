import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';

const Options: FC = () => {
  return (
    <h1>munk options</h1>
  );
}

const optionsRoot = document.getElementById('options-root');
const optionsElement = createRoot(optionsRoot);
optionsElement.render(<Options />);