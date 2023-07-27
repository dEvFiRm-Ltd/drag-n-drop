import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <section className='container py-10 flex flex-row justify-center items-start'>
      <div className='w-1/2 flex flex-col justify-start items-center '>
        <h5 className='text-center text-lg text-slate-900 font-bold pb-3 border-0 border-b-4 px-4 border-teal-400 '>
          Single File Uploader
        </h5>
        <div className='w-full flex flex-col justify-start items-start '></div>
      </div>
    </section>
  );
};
export default Home;

