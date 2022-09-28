import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles.css';

import { Navbar } from '../components/navbar/Navbar';
import { Timeline } from '../components/timeline/Timeline';

const Popup: FC = () => {
  return (
    <div className='w-[360px] h-[640px] bg-gray-100'>
      <Navbar />

      <Timeline />
    </div>
  );
}

const popupRoot = document.getElementById('popup-root');
const popupElement = createRoot(popupRoot);
popupElement.render(<Popup />);