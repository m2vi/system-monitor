import React, { useEffect } from 'react';
import Head from 'next/head';
import { humanFileSize } from '@m2vi/iva';
import { useSystem } from '../hooks/useSystem';
import { Line } from 'rc-progress';

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
          <div className='gradient-pink aspect-square rounded-25 text-center flex flex-col justify-between items-center py-3 px-5 relative'>
            <Line percent={100} strokeWidth={6} trailWidth={6} strokeColor='#40D9B4' trailColor='#FFFFFF' />

            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full'>
              <span className='text-2xl font-medium text-white'>{result?.client?.uptime}</span>
            </div>

            <span className='text-sm text-white'>Uptime</span>
          </div>

          <div className='gradient-purple aspect-square rounded-25 text-center flex flex-col justify-between items-center py-3 px-5 relative'>
            <span className='w-full'>
              <Line percent={result?.battery?.percent} strokeWidth={6} trailWidth={6} strokeColor='#40D9B4' trailColor='#FFFFFF' />
            </span>

            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
              <span className='text-2xl font-medium text-white'>{result?.battery?.percent}%</span>
            </div>

            <span className='text-sm text-white'>Battery</span>
          </div>

          <div className='gradient-blueberry aspect-square rounded-25 text-center flex flex-col justify-between items-center py-3 px-5 relative'>
            <span className='w-full'>
              <Line
                percent={Math.round(((result?.disk?.size - result?.disk?.free) / result?.disk?.size) * 100)}
                strokeWidth={6}
                trailWidth={6}
                strokeColor='#40D9B4'
                trailColor='#FFFFFF'
              />
            </span>

            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full'>
              <span className='text-2xl font-medium text-white'>{humanFileSize(result?.disk?.size - result?.disk?.free)}</span>
            </div>

            <span className='text-sm text-white'>Used Disk Space</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
