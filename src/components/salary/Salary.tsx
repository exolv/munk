import React from 'react';

import '../../styles.css';

const Salary = (props: any) => {
  const { salary } = props.data;

  return (
    <div className='text-white text-[14px] pr-3'>{salary} lei</div>
  );
}

export default Salary;