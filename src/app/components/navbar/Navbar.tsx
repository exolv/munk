import React, { FC } from 'react';

import '../../../styles.css';

const Navbar: FC<{ title: string; }> = ({ title }) => {
  return (
    <div className='fixed top-0 left-16 right-0 bg-white px-16 py-5 flex items-center drop-shadow-munk z-50'>
      <h6 className='font-poppins font-medium text-[13px] uppercase'>{title}</h6>
    </div>
  );
}

export default Navbar;