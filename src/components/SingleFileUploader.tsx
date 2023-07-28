'use client';

import React, { FC, useState } from 'react';

const SingleFileUploader: FC = () => {
  const [file, setFile] = useState();
  return (
    <div className='w-full h-20 rounded-2xl border-blue-600 border-dashed bg-blue-100 border relative '>
      <input
        type='file'
        className='w-full h-full opacity-0 absolute z-50'
        name=''
        id=''
      />
    </div>
  );
};

export default SingleFileUploader;

