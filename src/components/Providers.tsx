import * as React from 'react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from '@/wagmi';

export const queryClient = new QueryClient();

export function Providers({ children }: React.PropsWithChildren<{}>) {
  return <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>;
}
