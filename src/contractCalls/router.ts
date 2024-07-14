import { writeContract } from '@wagmi/core';
import { zeroAddress } from 'viem';

import { arrakisRouterAbi } from '@/abis/arrakisRouter.abi';
import { addresses } from '@/constants/addresses';
import { getMintAmounts } from '@/contractCalls/resolver';
import { wagmiConfig } from '@/wagmi';

import { Address } from '@/types/Address';
import { ResponseStatus } from '@/types/ChainResponse';
import { Hash, makeHash } from '@/types/Hash';
import { TokenBalance } from '@/types/Token';

export async function addLiquidity(
  amount0: TokenBalance,
  amount1: TokenBalance,
  vault: Address,
  user: Address
): Promise<Hash> {
  const mintAmounts = await getMintAmounts(amount0, amount1, vault);

  if (mintAmounts.status === ResponseStatus.Error) {
    throw new Error('Failed to get mint amounts');
  }

  const hash = await writeContract(wagmiConfig, {
    abi: arrakisRouterAbi,
    address: addresses.ARRAKIS_ROUTER,
    functionName: 'addLiquidity',
    args: [
      {
        amount0Max: amount0.balance,
        amount1Max: amount1.balance,
        amount0Min: mintAmounts.data.amount0Min,
        amount1Min: mintAmounts.data.amount1Min,
        amountSharesMin: mintAmounts.data.amountSharesMin,
        vault: vault,
        receiver: user,
        gauge: zeroAddress,
      },
    ],
  });

  return makeHash(hash);
}
