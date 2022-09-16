import React from 'react';

import '../../styles.css';

const Salary = (props: any) => {
  const { range } = props.data;

  return (
    <div className='text-white text-[14px] pr-3'>{range.min} lei {range.max && ` - ${range.max} lei`}</div>
  );
}

export default Salary;