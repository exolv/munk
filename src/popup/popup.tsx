import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from '../components/popup/Popup';

const popupRoot = document.getElementById('popup-root');
const popupElement = createRoot(popupRoot);
popupElement.render(<Popup />);