import React from 'react';

import '../../styles.css';

const Rating = (props: any) => {
  const { rating, displayLogo } = props.data;

  return (
    <div className='flex justify-between items-center'>
      <div className='w-7 h-7'>
        {
          rating >= 0 && rating < 1.67 ?
            <img src={chrome.runtime.getURL('assets/img/stars/empty.svg')} className='max-w-full' />
          :
          (
            rating >= 1.67 && rating < 3.34 ?
              <img src={chrome.runtime.getURL('assets/img/stars/half.svg')} className='max-w-full' />
              :
              <img src={chrome.runtime.getURL('assets/img/stars/full.svg')} className='max-w-full' />
          )
        }
      </div>
      <span className='text-white ml-2'>{rating}</span>
      {
        displayLogo &&
        <div className='w-6 h-6 ml-4'>
          <img src={chrome.runtime.getURL('assets/img/undelucram-icon.svg')} className='max-w-full' />
        </div>
      }
    </div>
  );
}

export default Rating;