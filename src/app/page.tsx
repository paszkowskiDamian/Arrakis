'use client';
import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';
import Button from '@/components/buttons/Button';
import Image from 'next/image'

// TODO: move those to Document so every page gets wrapped
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
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { cn } from '@/lib/utils';

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

        console.log(ready, connected, account, chain, authenticationStatus, mounted)
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

export const ArrakisAccount = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openAccountModal,
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

        console.log(ready, connected, account, chain, authenticationStatus, mounted)
        if (!ready) {
          return;
        }

        if (connected) {
          return (<div>
            <Button isDarkBg onClick={openAccountModal}>
              {chain.hasIcon && (
                <div className="bg-dark w-6 h-6 rounded-full overflow-hidden mr-4">
                  {chain.iconUrl && (
                    <img
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl}
                      className='w-6 h-6'
                    />
                  )}
                </div>
              )}
              {account.displayName}
              <div className='ml-3'>
                {account.displayBalance}
              </div>
            </Button>
          </div>)
        }

        return (
          <Button onClick={openConnectModal} isDarkBg variant='outline'>Connect Wallet</Button>
        )

      }}
    </ConnectButton.Custom>
  );
};

const queryClient = new QueryClient();

function Providers({ children }: React.PropsWithChildren<{}>) {
  return <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
}

function Navigation() {
  return (
    <div className='absolute top-0 right-0 bottom-0 left-0 z-10 pointer-events-none'>
      <nav className='sticky top-0 flex px-6 py-3 pointer-events-auto'>
        <div>Arrakis</div>
        <ArrakisAccount />
      </nav>
    </div>
  )
}

function Arc() {
  return (
    <div className='absolute bottom-0 right-0 left-0'>
      <img alt="section separator" width="100%" src="/svg/arc.svg" />
    </div>
  )
}

function SectionLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <section className='flex flex-col max-w-[900px] mx-auto my-6'>
      {children}
    </section>)
}

interface ColumnDescription<RowData> {
  displayName: string;
  key: keyof RowData;
  component: (row: RowData) => React.ReactNode;
}

interface TableProps<RowData> {
  columns: ColumnDescription<RowData>[];
  data: RowData[];
}

const data = [
  {
    vaultAddress: '0x7226cd862bbaaf668c5c1814ce758828dabfc307',
    token1: 'USDC',
    token2: 'ETH',
    tvl: '1,000,000',
    apr: '10%',
    strategy: 'LST stable'
  },
  {
    vaultAddress: '0x7226cd862bbaaf668c5c1814ce758828dabfc307',
    token1: 'USDC',
    token2: 'ETH',
    tvl: '1,000,000',
    apr: '10%',
    strategy: 'LST stable',
    commingSoon: true
  },
]

function Table<RowData>(props: TableProps<RowData>) {
  return (
    <table className='w-[100%] border-collapse border-spacing-2 border-dark'>
      <thead>
        <tr>
          {props.columns.map((column, index) => (
            <th key={index} className='text-left'>{column.displayName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, rowIndex) => (
          <tr key={rowIndex} className=' hover:bg-primary-100 my-3'>
            {props.columns.map((column, columnIndex) => (
              <td key={columnIndex}>{column.component(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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

function Footer() {
  return (
    <footer className='bg-dark text-light text-center py-6'>
      <div>
        <p>Developed by Damian Paszkowski</p>
        <a className='block'>Linked-in</a>
        <a className='block'>Github</a>
      </div>
    </footer>

  )
}

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Arrakis</title>
      </Head>
      <Providers >
        <Navigation />
        <Header />
        <SectionLayout>
          <h2>Arrakis V2 vaults</h2>
          <p className='max-w-[40rem]'>Arrakis V2 is a next-generation trading infrastructure built on top of Uniswap V3. Its unique functionalities allow the creation and automated execution of sophisticated trading strategies on Uniswap V3 that previously were only feasible on CEXs.</p>
          <div className='my-10'>
            <Table
              columns={[{
                displayName: 'Pool',
                key: 'vaultAddress',
                component: (row) => <span>{row.token1} / {row.token2}</span>
              },
              {
                displayName: 'TVL',
                key: 'tvl',
                component: (row) => <span>{row.tvl}</span>
              },
              {
                displayName: 'Rewards',
                key: 'apr',
                component: (row) => <span>{row.apr}</span>
              },
              {
                displayName: 'Strategy',
                key: 'strategy',
                component: (row) => <span>{row.strategy}</span>
              },
              ]}
              data={data}
            />
          </div>
        </SectionLayout>
        <Footer />
      </Providers>
    </main >
  );
}
