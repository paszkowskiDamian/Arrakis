import { formatUnits, isAddress, parseUnits } from 'viem';

import { Address } from '@/types/Address';

export type Token = {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
};

export type TokenBalance = {
  token: Token;
  balance: bigint;
};

function humanizeNumber(numberAsString: string) {
  const parsedNumber = Number(numberAsString);
  const absoluteNumber = Math.abs(parsedNumber);

  if (Number.isNaN(parsedNumber)) {
    return '🤷‍♂️';
  }

  if (absoluteNumber < 1000) {
    return Number(parsedNumber.toFixed(4)).toString();
  }

  if (absoluteNumber < 1000000) {
    return Number((parsedNumber / 1000).toFixed(2)) + 'K';
  }

  if (absoluteNumber < 1000000000) {
    return Number((parsedNumber / 1000000).toFixed(2)) + 'M';
  }

  return Number((parsedNumber / 1000000000).toFixed(2)) + 'B';
}

export function formatTokenBalanceWithUnit(tokenBalance: TokenBalance): string {
  return `${humanizeNumber(
    formatUnits(tokenBalance.balance, tokenBalance.token.decimals)
  )} ${tokenBalance.token.symbol}`;
}

export function formatTokenBalance(tokenBalance: TokenBalance): number {
  return Number(formatUnits(tokenBalance.balance, tokenBalance.token.decimals));
}

export function makeTokenBalance(balance: bigint, token: Token): TokenBalance {
  return { balance, token };
}

export function makeTokenBalanceFromBaseUnit(
  balance: string,
  token: Token
): TokenBalance {
  return { balance: parseUnits(balance, token.decimals), token };
}

export function isToken(obj: any): obj is Token {
  if (
    typeof obj === 'object' &&
    'address' in obj &&
    'symbol' in obj &&
    'name' in obj &&
    'decimals' in obj &&
    typeof obj.symbol === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.decimals === 'number' &&
    isAddress(obj.address)
  ) {
    return true;
  }
  return false;
}

export function isTokenBalance(obj: unknown): obj is TokenBalance {
  if (
    typeof obj === 'object' &&
    'balance' in obj &&
    'token' in obj &&
    typeof obj.balance === 'bigint' &&
    isToken(obj.token)
  ) {
    return true;
  }
  return false;
}
