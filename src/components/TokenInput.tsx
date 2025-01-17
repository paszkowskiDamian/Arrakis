'use client';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';

import { TokenIcon } from '@/data/tokenIcons';

import { getTokenBalance } from '@/contractCalls/erc20';
import { VaultData } from '@/contractCalls/vault';

import { Address } from '@/types/Address';
import {
  formatTokenBalance,
  formatTokenBalanceWithUnit,
  makeTokenBalance,
  makeTokenBalanceFromBaseUnit,
  TokenBalance,
} from '@/types/Token';

const percentagePrecision = 10000n;
export function getProportionalAmount1(
  amount0: TokenBalance,
  vaultData: VaultData
) {
  const proportion =
    (vaultData.token1.balance * percentagePrecision) / vaultData.token0.balance;

  return makeTokenBalance(
    (amount0.balance * proportion) / percentagePrecision,
    vaultData.token1.token
  );
}

export function getProportionalAmount0(
  amount1: TokenBalance,
  vaultData: VaultData
) {
  const proportion =
    (vaultData.token0.balance * percentagePrecision) / vaultData.token1.balance;

  return makeTokenBalance(
    (amount1.balance * proportion) / percentagePrecision,
    vaultData.token0.token
  );
}

interface TokenInputProps {
  tokenBalance: TokenBalance;
  updateTokenBalance: (tokenBalance: TokenBalance) => void;
  name: string;
  error?: string;
  user?: Address;
}

export function TokenInput({
  tokenBalance,
  updateTokenBalance,
  name,
  error,
  user,
}: TokenInputProps) {
  const [userBalance, setUserBalance] = useState<TokenBalance>(
    makeTokenBalance(0n, tokenBalance.token)
  );

  const getUserBalanceRequest = useCallback(async () => {
    if (!user) {
      return;
    }
    const response = await getTokenBalance(user, tokenBalance.token);

    if (response.status === 'success') {
      setUserBalance(response.data);
    }
  }, [user]);

  useEffect(() => {
    getUserBalanceRequest();
  }, []);

  const onChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const newToken0Balance = makeTokenBalanceFromBaseUnit(
        e.currentTarget.value,
        tokenBalance.token
      );
      updateTokenBalance(newToken0Balance);
    },
    [updateTokenBalance]
  );

  const setAsUserBalance = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      updateTokenBalance(userBalance);
    },
    [userBalance, updateTokenBalance]
  );

  return (
    <div className='w-fit mb-3'>
      <div className='flex justify-between text-sm'>
        <label
          className='bg-light translate-y-[0.8rem] translate-x-[1.5rem] p-1'
          htmlFor={name}
        >
          {tokenBalance.token.symbol} deposit
        </label>
        {user && (
          <button className='text-sm' onClick={setAsUserBalance}>
            {formatTokenBalanceWithUnit(userBalance)}
          </button>
        )}
      </div>
      <div className='flex items-center border-dark border rounded-full px-3 py-1 focus-within:border-primary'>
        <input
          className='bg-light border-none focus:ring-0'
          min='0'
          step='any'
          id={name}
          name={name}
          type='number'
          value={formatTokenBalance(tokenBalance).toString()}
          onChange={onChange}
        />
        <div className='flex items-center justify-between pl-2 w-[6rem]'>
          <TokenIcon token={tokenBalance.token.symbol} className='w-[30px]' />
          <div className='ml-1'>{tokenBalance.token.symbol}</div>
        </div>
      </div>
      <p className='text-red-500 text-xs italic h-3 ml-4 mt-1'>{error}</p>
    </div>
  );
}
