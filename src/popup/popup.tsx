import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';

const Popup: FC = () => {
  return (
    <h1>munk</h1>
  );
}

const popupRoot = document.getElementById('popup-root');
const popupElement = createRoot(popupRoot);
popupElement.render(<Popup />);