'use client';
import Head from 'next/head';
import * as React from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import '@/lib/env';
import { VaultCard } from '@/components/VaultCard';
import { SectionLayout } from '@/components/SectionLayout';
import { data } from '@/data/data';
import { Header } from '@/components/Header';

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
