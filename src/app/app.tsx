import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles.css';

const App: FC = () => {
  return (
    <h1>app</h1>
  );
}

const appRoot = document.getElementById('app-root');
const appElement = createRoot(appRoot);
appElement.render(<App />);