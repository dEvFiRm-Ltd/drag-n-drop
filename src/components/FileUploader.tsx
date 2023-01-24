import Image from 'next/image';
import React, { FC, useRef } from 'react';

type uploaderProps = {
  label?: string;
  identifier?: string;
  maxFileSizeInBytes?: number;
  updateFilesCb: (e: any[]) => void;
  [x: string]: any;
  multiples?: boolean;
  stateData: any[];
};
const KILO_BYTES_PER_BYTE = 1000;
const convertBytesToKB = (bytes: number) =>
  Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUploader: FC<uploaderProps> = ({
  label = 'upload Image',
  identifier = 'fileUploader',
  maxFileSizeInBytes = 50000000,
  updateFilesCb,
  multiples = true,
  stateData,
  ...otherProps
}) => {
  //   Ref To Handle additional click event to upload files
  const fileInputField = useRef<HTMLInputElement>(null);

  const handleUploadBtnClick = () => {
    fileInputField.current?.click();
  };

  const removeFile = (fileObj: any) => {
    const fileIndex = stateData.filter((e: any) => e.name !== fileObj.name);
    updateFilesCb(fileIndex);
  };

  return (
    <div className='w-full flex flex-col justify-start items-start gap-4  '>
      {stateData.length <= 0 ? (
        <>
          {' '}
          <label htmlFor={identifier} className='capitalize pb-3 font-medium '>
            {label}
          </label>
          {/* Main Image Uploader Component */}
          <div className='flex border relative w-full py-6 px-9 flex-col flex-wrap items-center capitalize rounded-xl border-blue-400 border-dashed  '>
            <p className='text-xl flex'>Drag and drop your files here or</p>
            <button
              type='button'
              onClick={handleUploadBtnClick}
              className='px-8 py-3 font-semibold rounded bg-slate-900 text-slate-50 my-4 dark:bg-gray-100 dark:text-gray-800 relative z-40 '
            >
              {' '}
              Click{' '}
            </button>
            <p className='text-xl flex'>to upload image</p>
            <input
              type='file'
              // This attribute remove the default title that the file field renders
              title=' '
              id={identifier}
              name={identifier}
              ref={fileInputField}
              className=' block border-0 opacity-0 absolute inset-0 z-30 w-full h-full '
              {...otherProps}
              multiple={multiples}
              onChange={(e) => {
                // If the Length of the newFiles (which is a fileList array) 0, then the boolean value will be false

                if (e.target.files?.length) {
                  let updatedFiles = Object.values(e.target.files);
                  updateFilesCb([...stateData, ...updatedFiles]);
                }
              }}
            />
          </div>
        </>
      ) : (
        <div className=' w-full gap-5 flex flex-col justify-center items-center '>
          <h5 className='text-2xl text-rose-900 '>Selected Images</h5>
          <div className='w-full flex flex-wrap flex-row gap-9 '>
            {stateData.map((files, index) => {
              //   This variable will convert the image object into image URL
              const imgUrl = URL.createObjectURL(files);

              /* Check If the File type is image or not. For image, the file type goes as "image/jpeg" || "image/png" || "image/webp" ; etc.
               */
              let isImageFile = files.type.split('/')[0] === 'image';
              return (
                <section key={index}>
                  {isImageFile && (
                    <div className='w-24 h-16 relative'>
                      <Image
                        src={imgUrl}
                        alt='image'
                        fill
                        className='object-contain'
                      />
                      <button
                        type='button'
                        onClick={() => removeFile(files)}
                        className='px-2 py-1 text-white absolute top-0 right-0 rounded-full bg-gray-600'
                      >
                        x
                      </button>
                    </div>
                  )}
                  <div>
                    <span>{files.name}</span>
                    <aside>
                      <span>{convertBytesToKB(files.size)} kb</span>
                      <i className='fas fa-trash-alt' />
                    </aside>
                  </div>
                </section>
              );
            })}
            <div className='w-36 h-24 relative flex-col flex-wrap justify-center capitalize rounded-xl border-blue-400 border-dashed border  '>
              <p className='text-base flex'>Add</p>
              <button
                type='button'
                onClick={handleUploadBtnClick}
                className='px-1 py-1 font-semibold rounded bg-slate-900 text-slate-50 my-4 dark:bg-gray-100 dark:text-gray-800 relative z-40     '
              >
                {' '}
                Click{' '}
              </button>
              <p className='text-base flex'>more images</p>
              <input
                type='file'
                // This attribute remove the default title that the file field renders
                title=' '
                id={identifier}
                name={identifier}
                ref={fileInputField}
                className=' block border-0 opacity-0 absolute inset-0 z-30 w-full h-full '
                {...otherProps}
                multiple={multiples}
                onChange={(e) => {
                  // If the Length of the newFiles (which is a fileList array) 0, then the boolean value will be false
                  if (e.target.files?.length) {
                    let updatedFiles = Object.values(e.target.files);
                    updateFilesCb([...stateData, ...updatedFiles]);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
