import { Chain, TokenSymbol } from '@/types/Enums';
import { StaticVaultData } from '@/types/VaultData';

export const data: StaticVaultData[] = [
  {
    vaultAddress: '0x4ca9fb1f302b6bd8421bad9debd22198eb6ab723',
    chain: Chain.Arbitrum,
    token1: TokenSymbol.ETH,
    token2: TokenSymbol.RETH,
    tvl: '1,000,000',
    apr: '10%',
    strategy: 'LST stable',
  },
  {
    vaultAddress: '0x000000000',
    chain: Chain.Ethereum,
    token1: TokenSymbol.DAI,
    token2: TokenSymbol.ETH,
    tvl: '---',
    apr: '---',
    strategy: 'Variable',
    commingSoon: true,
  },
  {
    vaultAddress: '0x000000000',
    chain: Chain.Ethereum,
    token1: TokenSymbol.ETH,
    token2: TokenSymbol.WSTETH,
    tvl: '---',
    apr: '---',
    strategy: 'Stable',
    commingSoon: true,
  },
];
