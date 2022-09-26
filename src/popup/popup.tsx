import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles.css';

import { Navbar } from '../components/navbar/Navbar';
import { JobBox } from '../components/job-box/JobBox';

const Popup: FC = () => {
  return (
    <div className='w-[420px] h-[640px] bg-gray-100'>
      <Navbar />
      <div className='p-6'>
        <JobBox />
      </div>
    </div>
  );
}

const popupRoot = document.getElementById('popup-root');
const popupElement = createRoot(popupRoot);
popupElement.render(<Popup />);