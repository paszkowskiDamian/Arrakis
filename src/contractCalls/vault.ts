import { formatUnits } from 'viem'
import { readContracts } from '@wagmi/core'

import { arrakisVaultAbi } from '@/abis/arrakisVault.abi'
import { erc20Abi } from '@/abis/erc20.abi'
import { wagmiConfig } from '@/wagmi'


export type Address = `0x${string}` & { readonly address: never }

export type Token = {
  address: Address
  symbol: string
  name: string
  decimals: number
}

export type TokenBalance = {
  token: Token
  balance: bigint
}

export function formatTokenBalance(tokenBalance: TokenBalance) {
  return formatUnits(tokenBalance.balance, tokenBalance.token.decimals)
}

export function makeTokenBalance(balance: bigint, token: Token): TokenBalance {
  return { balance, token }
}

export interface VaultData {
  name: string
  address: Address
  token0: TokenBalance
  token1: TokenBalance
}

export enum ResponseStatus {
  Success = 'success',
  Error = 'error',
  Pending = 'pending',
}

interface SuccessfullResponse<T> {
  status: ResponseStatus.Success
  data: T
}

interface ErrorResponse {
  status: ResponseStatus.Error
}

export type ChainResponse<T> = SuccessfullResponse<T> | ErrorResponse

export async function readVaultData(vaultAddress: Address): Promise<ChainResponse<VaultData>> {
  const config = { abi: arrakisVaultAbi, address: vaultAddress } as const

  try {
    const resources = await readContracts(wagmiConfig, {
      contracts: [
        {
          ...config,
          functionName: 'name',
        },
        {
          ...config,
          functionName: 'token0',
        },
        {
          ...config,
          functionName: 'token1',
        },
        {
          ...config,
          functionName: 'managerBalance0',
        },
        {
          ...config,
          functionName: 'managerBalance1',
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
      // TODO: add error codes
    }

    return {
      status: ResponseStatus.Success,
      data: {
        name: resources[0].result!,
        address: vaultAddress,
        token0: makeTokenBalance(resources[3].result!, token0.data!),
        token1: makeTokenBalance(resources[4].result!, token1.data!),
      }
    }

  } catch {
    return { status: ResponseStatus.Error }
  }
}

export async function readTokenData(tokenAddress: Address): Promise<ChainResponse<Token>> {
  const erc20Config = { abi: erc20Abi } as const

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
      ]
    })

    if (Object.values(tokensData).some(res => res.status === 'failure')) {
      return { status: ResponseStatus.Error }
    }

    return {
      status: ResponseStatus.Success,
      data: {
        address: tokenAddress,
        symbol: tokensData[0].result!,
        name: tokensData[2].result!,
        decimals: tokensData[1].result!,
      }
    }

  } catch {
    return { status: ResponseStatus.Error }
  }
}