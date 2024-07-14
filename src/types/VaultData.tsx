import { Chain, TokenSymbol } from '@/types/Enums';

export interface StaticVaultData {
  vaultAddress: string;
  chain: Chain;
  token1: TokenSymbol;
  token2: TokenSymbol;
  tvl: string;
  apr: string;
  strategy: string;
  commingSoon?: boolean;
}
