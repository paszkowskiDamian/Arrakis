import { arrakisResolverAbi } from '@/abis/arrakisResolver.abi';
import { addresses } from '@/constants/addresses';
import { ChainResponse, ResponseStatus } from '@/types/ChainResponse';
import { TokenBalance } from '@/types/Token';
import { wagmiConfig } from '@/wagmi';
import { readContract } from '@wagmi/core';
import { Address } from 'viem';

interface MintAmounts {
  amount0Min: bigint;
  amount1Min: bigint;
  amountSharesMin: bigint;
}

export async function getMintAmounts(
  token0Amount: TokenBalance,
  token1Amount: TokenBalance,
  vault: Address
): Promise<ChainResponse<MintAmounts>> {
  try {
    const [amount0Min, amount1Min, amountSharesMin] = await readContract(
      wagmiConfig,
      {
        abi: arrakisResolverAbi,
        address: addresses.ARRAKIS_RESOLVER,
        functionName: 'getMintAmounts',
        args: [vault, token0Amount.balance, token1Amount.balance],
      }
    );

    return {
      status: ResponseStatus.Success,
      data: {
        amount0Min,
        amount1Min,
        amountSharesMin,
      },
    };
  } catch (e) {
    return { status: ResponseStatus.Error };
  }
}
