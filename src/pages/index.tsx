import FileUploader from '@/components/FileUploader';
import { SyntheticEvent, useState } from 'react';

export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  console.log('🚀 ~ file: index.tsx:6 ~ Home ~ images', images);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setImages([]);
  };
  return (
    <section className='w-screen h-screen flex justify-center items-center '>
      <form
        className='px-6 py-4 rounded-2xl border '
        method='post'
        onSubmit={handleSubmit}
      >
        <FileUploader updateFilesCb={(e) => setImages(e)} stateData={images} />

        <button>submit</button>
      </form>
    </section>
  );
}
