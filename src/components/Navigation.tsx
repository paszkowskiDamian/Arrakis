'use client';
import * as React from 'react';
import Link from 'next/link';

import { ArrakisAccount } from '@/components/ArrakisAccount';


export function Navigation() {
  return (
    <div className='absolute text-light top-0 right-0 bottom-0 left-0 z-10 pointer-events-none'>
      <nav className='sticky top-0 flex px-6 py-3 pointer-events-auto align-middle items-center'>
        <div className='flex items-center font-thin text-lg tracking-widest'>
          <Link href={'/'}>Arrakis</Link>
          <img className='ml-2' width="20rem" alt='logo' src='/svg/logo.svg'></img>
        </div>
        <div className='grid grid-cols-3 flex-grow items-center align-middle justify-center'>
        </div>
        <ArrakisAccount />
      </nav>
    </div>
  );
}
