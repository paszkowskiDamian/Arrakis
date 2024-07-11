'use client';
import Button from "@/components/buttons/Button";
import { VaultData } from "@/contractCalls/vault";
import { TokenBalance, makeTokenBalance, makeTokenBalanceFromBaseUnit } from "@/types/Token";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { useAccount } from "wagmi";
import { ArrakisConnectButton } from "@/components/buttons/ArrakisConnectButton";
import { getProportionalAmount1, getProportionalAmount0, TokenInput } from "../TokenInput";
import { FormState } from "./FormState";

interface DepositFormProps {
  vaultData: VaultData;
  onSubmit: (formState: FormState) => void;
}
export function DepositForm({ vaultData, onSubmit: onFormSubmit }: DepositFormProps) {
  const account = useAccount();
  // useUserTokenBalance(vaultData.token0.token.address)
  const [token0Balance, setToken0Balance] = useState<TokenBalance>(makeTokenBalance(0n, vaultData.token0.token));
  const [token1Balance, setToken1Balance] = useState<TokenBalance>(makeTokenBalance(0n, vaultData.token1.token));

  const onBalance0Change = useCallback((tokenBalance: TokenBalance) => {
    setToken0Balance(tokenBalance);
    setToken1Balance(getProportionalAmount1(tokenBalance, vaultData));
  }, []);

  const onBalance1Change = useCallback((tokenBalance: TokenBalance) => {
    setToken1Balance(tokenBalance);
    setToken0Balance(getProportionalAmount0(tokenBalance, vaultData));
  }, []);

  const onSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData = Object.fromEntries(data.entries());
    const formState = {
      token0Balance: makeTokenBalanceFromBaseUnit(formData.token0Balance.toString(), vaultData.token0.token),
      token1Balance: makeTokenBalanceFromBaseUnit(formData.token1Balance.toString(), vaultData.token1.token)
    };

    onFormSubmit(formState);
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <TokenInput name="token0Balance" updateTokenBalance={onBalance0Change} tokenBalance={token0Balance} />
          <TokenInput name="token1Balance" updateTokenBalance={onBalance1Change} tokenBalance={token1Balance} />
        </div>
        {account.address && <Button type="submit" variant="outline">Approve WETH</Button>}
      </form>
      {!account.address && <ArrakisConnectButton />}
    </div>
  );
}