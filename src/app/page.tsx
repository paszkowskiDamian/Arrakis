'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';


export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Arrakis</title>
      </Head>
      <div className='bg-primary-950 h-[80vh] flex flex-row items-center justify-center relative'>
        <div className='relative'>
          <div id="Sun" className='w-60 h-60 bg-white [clip-path:circle(49%)] rounded-full relative overflow-hidden'>
            <div id="Moon_1" className='w-28 h-28 bg-black rounded-full mix-blend-darken absolute origin-[300%_-2000%] animate-moon_1' ></div>
            <div id="Moon_2" className='w-48 h-48 bg-black rounded-full mix-blend-darken absolute origin-[2800%_-1200%] animate-moon_2' ></div>
          </div>
          <h1 id="Title" className='text-9xl tracking-widest mix-blend-exclusion font-thin text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Arrakis</h1>
        </div>


      </div>

      <div className='bg-primary h-lvh'>


      </div>



    </main>
  );
}
