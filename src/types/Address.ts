import { isAddress } from "viem";

export type Address = `0x${string}` & { readonly address: never; };

export function makeAddress(address: string): Address {
  if (isAddress(address)) {
    return address as Address;
  }

  throw new Error(`Invalid address: ${address}`)
}