import { readContracts } from '@wagmi/core'

import { arrakisVaultAbi } from '@/abis/arrakisVault.abi'
import { wagmiConfig } from '@/wagmi'
import { TokenBalance, makeTokenBalance } from '../types/Token'
import { Address } from '../types/Address'
import { readTokenData } from './erc20'
import { arrakisHelperAbi } from '@/abis/arrakisHelper.abi'
import { addresses } from '../constants/addresses'
import { ChainResponse, ResponseStatus } from '../types/ChainResponse'

export interface VaultData {
  name: string
  address: Address
  token0: TokenBalance
  token1: TokenBalance
}

export async function readVaultData(vaultAddress: Address): Promise<ChainResponse<VaultData>> {
  const arrakisVaultContract = { abi: arrakisVaultAbi, address: vaultAddress } as const
  const arrakisHelperContract = { abi: arrakisHelperAbi, address: addresses.ARRAKIS_HELPER } as const

  try {
    const resources = await readContracts(wagmiConfig, {
      contracts: [
        {
          ...arrakisVaultContract,
          functionName: 'name',
        },
        {
          ...arrakisVaultContract,
          functionName: 'token0',
        },
        {
          ...arrakisVaultContract,
          functionName: 'token1',
        },
        {
          ...arrakisHelperContract,
          functionName: 'totalUnderlying',
          args: [vaultAddress],
        },
      ]
    })
    if (Object.values(resources).some(res => res.status === 'failure')) {
      return { status: ResponseStatus.Error }
    }

    const [token0, token1] = await Promise.all([
      readTokenData(resources[1].result! as Address),
      readTokenData(resources[2].result! as Address),
    ])

    if (token0.status === ResponseStatus.Error || token1.status === ResponseStatus.Error) {
      return { status: ResponseStatus.Error }
    }

    return {
      status: ResponseStatus.Success,
      data: {
        name: resources[0].result!,
        address: vaultAddress,
        token0: makeTokenBalance(resources[3].result![0], token0.data!),
        token1: makeTokenBalance(resources[3].result![1], token1.data!),
      }
    }

  } catch {
    return { status: ResponseStatus.Error }
  }
}
