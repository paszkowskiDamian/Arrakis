import { VaultData } from "@/types/VaultData";
import { Chain, Token } from "@/types/enums";

export const data: VaultData[] = [
  {
    vaultAddress: '0x7226cd862bbaaf668c5c1814ce758828dabfc307',
    chain: Chain.Arbitrum,
    token1: Token.ETH,
    token2: Token.RETH,
    tvl: '1,000,000',
    apr: '10%',
    strategy: 'LST stable'
  },
  {
    vaultAddress: '0x000000000',
    chain: Chain.Ethereum,
    token1: Token.DAI,
    token2: Token.ETH,
    tvl: '1,000,000',
    apr: '10%',
    strategy: 'Variable',
    commingSoon: true
  },
  {
    vaultAddress: '0x000000000',
    chain: Chain.Ethereum,
    token1: Token.ETH,
    token2: Token.WSTETH,
    tvl: '---',
    apr: '---',
    strategy: 'Stable',
    commingSoon: true
  },
];
