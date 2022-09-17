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
    <div className='text-white text-[14px] pr-3'>{range.min} lei {range.max && ` - ${range.max} lei`}</div>
  );
}