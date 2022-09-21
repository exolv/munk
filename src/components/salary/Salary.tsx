import React, { FC } from 'react';

import '../../styles.css';

export interface SalaryData {
  range: {
    min: number;
    max: number | undefined;
  };
}

export const Salary: FC<SalaryData> = ({ range }) => {
  return (
    <div className='text-white text-[14px] pr-3'>
      {
        range.max ?
          `${range.min} - ${range.max} lei`
        :
          `${range.min} lei`
      }
    </div>
  );
}