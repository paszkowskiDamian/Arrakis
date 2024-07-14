import { isAddress } from "viem";

export type Hash = `0x${string}` & { readonly hash: never; };

export function makeHash(address: string): Hash {
  if (isAddress(address)) {
    return address as Hash;
  }

  throw new Error(`Invalid hash: ${address}`)
}