import React from 'react';

import '../../styles.css';

const Salary = (props: any) => {
  const { salary } = props.data;

  return (
    <div className='pr-3 pb-3 text-white text-[14px]'>{salary} lei</div>
  );
}

export default Salary;