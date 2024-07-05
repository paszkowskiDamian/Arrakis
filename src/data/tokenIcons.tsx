import { Token } from "@/types/enums";

export const tokenIcons: Record<Token, string> = {
  [Token.ETH]: '/svg/tokens/eth.svg',
  [Token.DAI]: '/svg/tokens/dai.svg',
  [Token.WSTETH]: '/svg/tokens/wsteth.svg',
  [Token.RETH]: '/svg/tokens/unknown.svg',
};
