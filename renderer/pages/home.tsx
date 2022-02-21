import React, { useEffect } from 'react';
import Head from 'next/head';
import { humanFileSize } from '@m2vi/iva';
import { useSystem } from '../hooks/useSystem';
import { Line } from 'rc-progress';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format-commonjs';
import { useLanyard } from 'use-lanyard-react';

momentDurationFormatSetup(moment);

function Home(props: any) {
  const [result, history] = useSystem(props?.data);
  const lanyard = useLanyard('701400631662870609');

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
              <span className='text-2xl font-medium text-white'>
                {moment.duration(result?.client?.uptime, 'seconds').format('m [minutes]')}
              </span>
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

          {lanyard?.listening_to_spotify ? (
            <div className='bg-spotify aspect-square rounded-25 text-left p-3 relative flex flex-col justify-between items-start overflow-hidden'>
              <div className='flex justify-between w-full'>
                <img className='h-80 w-80 rounded-8' src={lanyard.spotify.album_art_url} alt={lanyard.spotify.album} />
                <a href={`https://open.spotify.com/track/${lanyard.spotify.track_id}`} target='_blank'>
                  <svg height={20} width={20} xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10c.001-5.523-4.477-10-10-10Zm4.587 14.424a.623.623 0 0 1-.858.208c-2.348-1.435-5.304-1.759-8.785-.963a.624.624 0 0 1-.277-1.215c3.81-.87 7.076-.496 9.713 1.114a.622.622 0 0 1 .207.856Zm1.224-2.723a.78.78 0 0 1-1.072.256c-2.687-1.651-6.786-2.13-9.966-1.165a.781.781 0 0 1-.973-.52.781.781 0 0 1 .52-.972c3.632-1.102 8.147-.568 11.233 1.33a.78.78 0 0 1 .258 1.07Zm.105-2.835C12.693 6.95 7.376 6.776 4.298 7.71a.935.935 0 1 1-.544-1.79c3.533-1.073 9.406-.865 13.116 1.337a.936.936 0 0 1-.954 1.609Z'
                      fill='#fff'
                    />
                  </svg>
                </a>
              </div>

              <div className='flex flex-col'>
                <span className='text-black font-medium mt-1 l-1 whitespace-nowrap'>{lanyard.spotify.song}</span>
                <span className='text-black opacity-70 font-medium l-1 text-sm whitespace-nowrap'>{lanyard.spotify.artist}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
