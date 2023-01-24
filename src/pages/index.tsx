import FileUploader from '@/components/FileUploader';
import { Inter } from '@next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  console.log('🚀 ~ file: index.tsx:9 ~ Home ~ images', images);
  return (
    <section className='w-screen h-screen flex justify-center items-center '>
      <form className='px-6 py-4 rounded-2xl border ' method='post'>
        <FileUploader updateFilesCb={(e) => setImages(e)} stateData={images} />
      </form>
    </section>
  );
}
