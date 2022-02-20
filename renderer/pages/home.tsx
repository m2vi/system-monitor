import React, { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import system from '../utils/system';
import { humanFileSize } from '@m2vi/iva';
import { useSystem } from '../hooks/useSystem';

function Home(props: any) {
  const [result] = useSystem(props?.data);

  useEffect(() => console.log(result), [result]);

  return (
    <React.Fragment>
      <Head>
        <title>System Monitor</title>
      </Head>
      <div className='w-full px-120 py-11 flex justify-center items-start'>
        <div className='grid grid-flow-row grid-cols-2 gap-8 justify-between w-full max-w-sm'>
          <div className='flex flex-col text-center'>
            <span className='text-primary-200'>Battery</span>
            <span className={result?.battery?.acConnected ? '' : ''}>{result?.battery?.percent}%</span>
          </div>

          <div className='flex flex-col text-center'>
            <span className='text-primary-200'>Uptime</span>
            <span>{result?.client?.uptime}</span>
          </div>

          <div className='flex flex-col text-center'>
            <span className='text-primary-200'>Free Disk Space</span>
            <span title={`${Math.round((result?.disk?.free / result?.disk?.size) * 100)}%`}>{humanFileSize(result?.disk?.free)}</span>
          </div>

          <div className='flex flex-col text-center'>
            <span className='text-primary-200'>Total Disk Space</span>
            <span>{humanFileSize(result?.disk?.size)}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      data: await system.get(),
    },
  };
};
