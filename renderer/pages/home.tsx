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
      <Head children>
        <title>System Monitor</title>
      </Head>
      <div className='w-full px-120 py-11 flex justify-center items-start'>
        <div className='flex justify-between items-center w-full max-w-sm'>
          <div className='flex flex-col text-center'>
            <span className='text-primary-200'>Battery</span>
            <span className=''>{result?.battery?.percent}%</span>
          </div>
          <div className='flex flex-col text-center'>
            <span className='text-primary-200'>Free Disk Space</span>
            <span title={`${Math.round((result?.disks?.main?.free / result?.disks?.main?.size) * 100)}%`}>
              {humanFileSize(result?.disks?.main?.free)}
            </span>
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
