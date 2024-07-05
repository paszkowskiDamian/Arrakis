import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  arbitrum
} from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    arbitrum,
  ],
  transports: {
    [arbitrum.id]: http('https://arb-mainnet.g.alchemy.com/v2/7RdqH7_Q9ZPr03QIpsYzmmZ678FBTRO1')
  },
  ssr: true,
});
