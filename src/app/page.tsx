'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';
import Button from '@/components/buttons/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';



import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { config } from '@/wagmi';

function AnimatedLogo() {
  return (
    <div>
      <div className='relative'>
        <div id="Sun" className='w-60 h-60 bg-light [clip-path:circle(49%)] rounded-full relative overflow-hidden'>
          <div id="Moon_1" className='w-28 h-28 bg-primary-950 rounded-full mix-blend-darken absolute origin-[300%_-2000%] animate-moon_1' ></div>
          <div id="Moon_2" className='w-48 h-48 bg-primary-950 rounded-full mix-blend-darken absolute origin-[2800%_-1200%] animate-moon_2' ></div>
        </div>
        <h1 id="Title" className='text-9xl tracking-widest mix-blend-exclusion font-thin text-light absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          Arrakis
        </h1>
      </div>
    </div>
  )
}

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Arrakis</title>
      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <div className='bg-primary-950 h-[80vh] flex flex-col items-center justify-center relative'>
              <AnimatedLogo />
              <h2 className='text-light	text-center mt-7'>
                Unlock Your Liquidity’s <br />Greatest Potential
              </h2>
              <Button className='mt-9' isDarkBg variant='outline'>Connect Wallet</Button>
              <ConnectButton />
            </div>

            <div className='bg-primary h-lvh'>


            </div>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </main >
  );
}
