'use client';

import React, { FC, useState } from 'react';

const SingleFileUploader: FC = () => {
  /**
   * When we'll upload the image,it'll be a file type.
   * But when we'll fetch image data from the API,it'll give a string (URL of the File) only.
   */
  const [files, setFiles] = useState<File | string>('');
  return (
    <div className='w-full h-20 rounded-2xl border-blue-600 border-dashed bg-blue-100 border relative '>
      <input
        type='file'
        className='w-full h-full opacity-0 absolute z-50'
        name=''
        onChange={(e) => {
          /**
           * If the Length of the FileList is 0, then the boolean value will be false
           * Which Means, if the user doesn't pick any file, the state will be unchanged.
           */

          if (e.target.files?.length) {
            let updatedFiles = Object.values(e.target.files);
            console.log(
              '🚀 ~ file: SingleFileUploader.tsx:25 ~ updatedFiles:',
              updatedFiles[0]
            );
            /**
             * Although We haven't implemented "multiple" attribute on the input tg
             * But, It's possible to put that attribute from browser.
             * To put an extra layer of security, We can upload only the first element of the Files array
             */
            setFiles(updatedFiles[0]);
          }
        }}
        id=''
      />
    </div>
  );
};

export default SingleFileUploader;

