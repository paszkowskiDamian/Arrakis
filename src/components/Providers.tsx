'use client';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { WagmiProvider } from 'wagmi';

import { wagmiConfig } from '@/wagmi';

export const queryClient = new QueryClient();

export function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
