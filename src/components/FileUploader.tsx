import Image from 'next/image';
import React, { FC, useRef, useState } from 'react';

type uploaderProps = {
  label?: string;
  identifier?: string;
  maxFileSizeInBytes?: number;
  updateFilesCb: (e: any[]) => void;
  //   Type for all other dynamic props
  [x: string]: any;
  multiples?: boolean;
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
  ...otherProps
}) => {
  // State to manage uploading files
  const [files, setFiles] = useState<any>({});

  //   Ref To Handle additional click event to upload files
  const fileInputField = useRef<HTMLInputElement>(null);

  const handleUploadBtnClick = () => {
    fileInputField.current?.click();
  };

  /**
   * addNewFiles Function
   * Take FileList as Arguments (we get FileList from File Input Field)
   * Check if the file size meets  our condition first
   * If it matches and the multiples props is false, then it'll return the first file of the array
   * if the multiples value is true, then we will make an object, make a key value pair of File Name (Key) & file (value)
   */

  const addNewFiles = (newFiles: any) => {
    let tempObj: any = {};
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!multiples) {
          return { file };
        }
        tempObj[file.name] = file;
      }
    }
    return tempObj;
  };

  /**
   *
   * @param nestedObj files
   * @returns Array of the files
   */
  const convertNestedObjectToArray = (nestedObj: any) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

  /**
   *
   * @param files Files
   * make an array of files and send the array to the updating Callback Function
   */
  const callUpdateFilesCb = (files: any) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const removeFile = (fileName: any) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <div className='w-full flex flex-col justify-start items-start gap-4  '>
      {Object.keys(files).length <= 0 ? (
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
                // Destruct the files object from e.target and rename it to newFiles
                // If the Length of the newFiles (which is a fileList array) 0, then the boolean value will be false
                const { files: newFiles } = e.target;
                if (newFiles?.length) {
                  let updatedFiles = addNewFiles(newFiles);

                  // Update the State
                  setFiles({ ...files, ...updatedFiles });
                  callUpdateFilesCb(updatedFiles);
                }
              }}
            />
          </div>
        </>
      ) : (
        <div className=' w-full gap-5 flex flex-col justify-center items-center '>
          <h5 className='text-2xl text-rose-900 '>Selected Images</h5>
          <div className='w-full flex flex-wrap flex-row gap-9 '>
            {Object.keys(files).map((fileName, index) => {
              let file = files[fileName];
              //   This variable will convert the image name into image URL
              const imgUrl = URL.createObjectURL(file);

              /* Check If the File type is image or not. For image, the file type goes as "image/jpeg" || "image/png" || "image/webp" ; etc.
               */
              let isImageFile = file.type.split('/')[0] === 'image';
              return (
                <section key={index}>
                  <div>
                    {isImageFile && (
                      //   <img
                      //     src={URL.createObjectURL(file)}
                      //     alt={`file preview ${index}`}
                      //   />

                      <div className='w-24 h-16 relative'>
                        <Image
                          src={imgUrl}
                          alt='image'
                          fill
                          className='object-contain'
                        />
                        <button
                          type='button'
                          onClick={() => removeFile(fileName)}
                          className='px-2 py-1 text-white absolute top-0 right-0 rounded-full bg-gray-600'
                        >
                          x
                        </button>
                      </div>
                    )}
                    <div
                    // isImageFile={isImageFile}
                    >
                      <span>{file.name}</span>
                      <aside>
                        <span>{convertBytesToKB(file.size)} kb</span>
                        <i className='fas fa-trash-alt' />
                      </aside>
                    </div>
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
                  // Destruct the files object from e.target and rename it to newFiles
                  // If the Length of the newFiles (which is a fileList array) 0, then the boolean value will be false
                  const { files: newFiles } = e.target;
                  if (newFiles?.length) {
                    let updatedFiles = addNewFiles(newFiles);

                    // Update the State
                    setFiles({ ...files, ...updatedFiles });
                    callUpdateFilesCb(updatedFiles);
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
