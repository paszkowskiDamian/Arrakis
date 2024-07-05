import { Chain, Token } from "@/types/enums";

export interface VaultData {
  vaultAddress: string;
  chain: Chain;
  token1: Token;
  token2: Token;
  tvl: string;
  apr: string;
  strategy: string;
  commingSoon?: boolean;
}
