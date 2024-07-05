'use client';
import Head from 'next/head';
import * as React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import '@/lib/env';
import Button from '@/components/buttons/Button';
import { cn } from '@/lib/utils';
import { VaultCard } from '@/components/VaultCard';
import { SectionLayout } from '@/components/SectionLayout';
import { data } from '@/data/data';

function AnimatedLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className='relative flex justify-center'>
        <div id="Sun" className='w-60 h-60 bg-light [clip-path:circle(49%)] rounded-full relative'>
          <div id="Moon_1" className='w-28 h-28 bg-dark rounded-full mix-blend-darken absolute origin-[300%_-2000%] animate-moon_1' ></div>
          <div id="Moon_2" className='w-48 h-48 bg-dark rounded-full mix-blend-darken absolute origin-[2800%_-1200%] animate-moon_2' ></div>
        </div>
        <h1 id="Title" className='text-9xl tracking-widest mix-blend-exclusion font-thin text-light absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          Arrakis
        </h1>
      </div>
    </div>
  )
}

export const ArrakisActionButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            className={cn([!ready && ['opacity-0', 'pointer-events-none', 'user-select-none']])}
            aria-hidden={!ready}
          >
            {
              <Button onClick={openConnectModal} className={cn([connected && ['invisible']])} isDarkBg variant='outline'>Connect Wallet</Button>
            }
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

function Arc() {
  return (
    <div className='absolute bottom-0 right-0 left-0'>
      <img alt="section separator" width="100%" src="/svg/arc.svg" />
    </div>
  )
}

function Header() {
  return (
    <header className='bg-dark h-[80vh] flex flex-col items-center justify-center relative'>
      <AnimatedLogo />
      <div>
        <h2 className='text-light	text-center m-6'>
          Unlock Your Liquidity’s <br />Greatest Potential
        </h2>
      </div>
      <div className='mt-10'>
        <ArrakisActionButton />
      </div>
      <Arc />
    </header>
  )
}

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Arrakis</title>
      </Head>
      <Header />
      <SectionLayout>
        <h2>Arrakis V2 vaults</h2>
        <p className='max-w-[40rem]'>Arrakis V2 is a next-generation trading infrastructure built on top of Uniswap V3. Its unique functionalities allow the creation and automated execution of sophisticated trading strategies on Uniswap V3 that previously were only feasible on CEXs.</p>
        <div className='my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-9 gap-x-5'>
          {data.map((vault, index) => <VaultCard key={index} data={vault} />)}
        </div>
      </SectionLayout>
    </main >
  );
}
