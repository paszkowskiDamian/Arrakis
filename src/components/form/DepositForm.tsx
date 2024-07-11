'use client';
import Button from "@/components/buttons/Button";
import { VaultData } from "@/contractCalls/vault";
import { TokenBalance, makeTokenBalance, makeTokenBalanceFromBaseUnit } from "@/types/Token";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { ArrakisConnectButton } from "@/components/buttons/ArrakisConnectButton";
import { getProportionalAmount1, getProportionalAmount0, TokenInput } from "../TokenInput";
import { FormState } from "./FormState";
import { Address } from "@/types/Address";

interface DepositFormProps {
  vaultData: VaultData
  formState: FormState
  user: Address | undefined
  onSubmit: (formState: FormState) => void
}
export function DepositForm({ vaultData, onSubmit: onFormSubmit, user, formState }: DepositFormProps) {
  const [token0Balance, setToken0Balance] = useState<TokenBalance>(formState.token0Balance);
  const [token1Balance, setToken1Balance] = useState<TokenBalance>(formState.token1Balance);

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
        <h2>Deposit</h2>
        <div>
          <TokenInput user={user} name="token0Balance" updateTokenBalance={onBalance0Change} tokenBalance={token0Balance} />
          <TokenInput user={user} name="token1Balance" updateTokenBalance={onBalance1Change} tokenBalance={token1Balance} />
        </div>
        {user && <Button type="submit" variant="outline">Continue</Button>}
      </form>
      {!user && <ArrakisConnectButton />}
    </div>
  );
}
