import React, { FC } from 'react';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const Contacts: FC = () => {
  return (
    <div className='flex'>
      <Sidebar active='contacts' />
      <div className='bg-gray-100 w-full min-h-screen px-6 py-4'>
        <Navbar title='Contacte' />

        <div className='px-32 py-24'>
          //
        </div>
      </div>
    </div>
  );
}

export default Contacts;