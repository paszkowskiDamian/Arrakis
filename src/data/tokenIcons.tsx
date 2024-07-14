import { TokenSymbol } from '@/types/Enums';

export function TokenIcon({
  token,
  className,
}: {
  token: TokenSymbol | string;
  className?: string;
}) {
  const path = tokenIcons[token as TokenSymbol] || UNKNOWN_TOKEN_ICON;

  return <img alt={`${token} token icon`} src={path} className={className} />;
}

const UNKNOWN_TOKEN_ICON = '/svg/tokens/unknown.svg';

export const tokenIcons: Record<TokenSymbol, string> = {
  [TokenSymbol.ETH]: '/svg/tokens/eth.svg',
  [TokenSymbol.WETH]: '/svg/tokens/eth.svg',
  [TokenSymbol.DAI]: '/svg/tokens/dai.svg',
  [TokenSymbol.WSTETH]: '/svg/tokens/wsteth.svg',
  [TokenSymbol.RETH]: UNKNOWN_TOKEN_ICON,
};
