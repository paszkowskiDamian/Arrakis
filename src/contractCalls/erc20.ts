import { erc20Abi } from '@/abis/erc20.abi';
import { Address } from '@/types/Address';
import { Token, TokenBalance, makeTokenBalance } from '@/types/Token';
import { wagmiConfig } from '@/wagmi';

import {
  readContract,
  readContracts,
  waitForTransactionReceipt,
  writeContract,
} from '@wagmi/core';
import { ChainResponse, ResponseStatus } from '../types/ChainResponse';

export async function approveToken(spender: Address, amount: TokenBalance) {
  const hash = await writeContract(wagmiConfig, {
    abi: erc20Abi,
    address: amount.token.address,
    functionName: 'approve',
    args: [spender, amount.balance],
  });

  const reciept = await waitForTransactionReceipt(wagmiConfig, { hash });

  return reciept;
}

export async function getTokenBalance(
  user: Address,
  token: Token
): Promise<ChainResponse<TokenBalance>> {
  const erc20Config = { abi: erc20Abi } as const;

  try {
    const balance = await readContract(wagmiConfig, {
      ...erc20Config,
      address: token.address,
      functionName: 'balanceOf',
      args: [user],
    });

    return {
      status: ResponseStatus.Success,
      data: makeTokenBalance(balance, token),
    };
  } catch {
    return { status: ResponseStatus.Error };
  }
}

export async function getCurrentAllowance(
  user: Address,
  spender: Address,
  token: Token
): Promise<ChainResponse<TokenBalance>> {
  const erc20Config = { abi: erc20Abi } as const;
  console.log('getCurrentAllowance', user, spender, token);
  try {
    const balance = await readContract(wagmiConfig, {
      ...erc20Config,
      address: token.address,
      functionName: 'allowance',
      args: [user, spender],
    });

    return {
      status: ResponseStatus.Success,
      data: makeTokenBalance(balance, token),
    };
  } catch (e) {
    console.error(e);
    return { status: ResponseStatus.Error };
  }
}

export async function readTokenData(
  tokenAddress: Address
): Promise<ChainResponse<Token>> {
  const erc20Config = { abi: erc20Abi } as const;

  try {
    const tokensData = await readContracts(wagmiConfig, {
      contracts: [
        {
          ...erc20Config,
          address: tokenAddress,
          functionName: 'symbol',
        },
        {
          ...erc20Config,
          address: tokenAddress,
          functionName: 'decimals',
        },
        {
          ...erc20Config,
          address: tokenAddress,
          functionName: 'name',
        },
      ],
    });

    if (Object.values(tokensData).some((res) => res.status === 'failure')) {
      return { status: ResponseStatus.Error };
    }

    return {
      status: ResponseStatus.Success,
      data: {
        address: tokenAddress,
        symbol: tokensData[0].result!,
        name: tokensData[2].result!,
        decimals: tokensData[1].result!,
      },
    };
  } catch {
    return { status: ResponseStatus.Error };
  }
}
