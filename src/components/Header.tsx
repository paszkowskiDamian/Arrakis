'use client';
import * as React from 'react';
import { ArrakisConnectButton } from '../components/buttons/ArrakisConnectButton';
import { AnimatedLogo } from '../components/AnimatedLogo';
import { Arc } from '../components/Arc';

export function Header() {
  return (
    <header className='bg-dark h-[80vh] flex flex-col items-center justify-center relative'>
      <AnimatedLogo />
      <div>
        <h2 className='text-light	text-center m-6'>
          Unlock Your Liquidity’s <br />
          Greatest Potential
        </h2>
      </div>
      <div className='mt-10'>
        <ArrakisConnectButton isDarkBg />
      </div>
      <Arc />
    </header>
  );
}
