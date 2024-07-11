'use client';
import Button from "@/components/buttons/Button";
import { addresses } from "@/constants/addresses";
import { approveToken, getCurrentAllowance } from "@/contractCalls/erc20";
import { Address } from "@/types/Address";
import { ResponseStatus } from "@/types/ChainResponse";
import { TokenBalance, formatTokenBalanceWithUnit } from "@/types/Token";
import React, { SyntheticEvent, useCallback, useEffect } from "react";

interface AllowanceFormProps {
  user: Address;
  tokenAmountToAllow: TokenBalance;
  nextStep: () => void;
}

enum AllowanceStage {
  CheckingCurrentAllowance = 'CheckingCurrentAllowance',
  WaitingForConfirmation = "WaitingForConfirmation",
  TxPending = "TxPending",
  AllowanceConfirmed = "AllowanceConfirmed",
  TxFailed = "TxFailed",
}

export function AllowanceForm({ tokenAmountToAllow, nextStep, user }: AllowanceFormProps) {
  const [formStage, setFormStage] = React.useState<AllowanceStage>(AllowanceStage.CheckingCurrentAllowance);
  const requestAllowance = useCallback(async () => {
    const currentAllowanceResponse = await getCurrentAllowance(user, addresses.ARRAKIS_ROUTER, tokenAmountToAllow.token)

    switch (currentAllowanceResponse.status) {
      case ResponseStatus.Success:
        if (currentAllowanceResponse.data.balance >= tokenAmountToAllow.balance) {
          setFormStage(AllowanceStage.AllowanceConfirmed)
        } else {
          setFormStage(AllowanceStage.WaitingForConfirmation)
        }
        return;
      case ResponseStatus.Error:
        setFormStage(AllowanceStage.WaitingForConfirmation)
        return;
    }

  }, [tokenAmountToAllow, user]);


  useEffect(() => { requestAllowance() }, [])

  const onSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormStage(AllowanceStage.TxPending);
      try {
        const approval = await approveToken(addresses.ARRAKIS_ROUTER, tokenAmountToAllow);
        setFormStage(AllowanceStage.AllowanceConfirmed);
        console.log(approval);
      } catch (e) {
        setFormStage(AllowanceStage.TxFailed);
      }
    },
    []
  );

  return (
    <form onSubmit={onSubmit}>
      <h4>Set {tokenAmountToAllow.token.symbol} Allowance</h4>
      {
        formStage === AllowanceStage.CheckingCurrentAllowance && (
          <p className="mb-4 w-[70%]">Checking current allowance...</p>
        )
      }
      {
        formStage === AllowanceStage.WaitingForConfirmation && (
          <div>
            <p className="mb-4 w-[70%]">
              In order to deposit into vault you need to allow <a className="text-primary-600 underline" href="">Arrakis Router</a> to use your {formatTokenBalanceWithUnit(tokenAmountToAllow)}
            </p>
            <Button type="submit" variant="outline">Set allowance</Button>
          </div>
        )
      }
      {
        formStage === AllowanceStage.TxPending && (
          <p className="mb-4 w-[70%]">Transaction is pending</p>
        )
      }
      {
        formStage === AllowanceStage.AllowanceConfirmed && (
          <div>
            <p className="mb-4 w-[70%]">Transaction confirmed</p>
            <Button onClick={nextStep} variant="outline">Next Step</Button>
          </div>
        )
      }
      {
        formStage === AllowanceStage.TxFailed && (
          <div className="w-[70%]">
            <p className="mb-4">Transaction has failed. Check your wallet for more information and try again.</p>
            <Button type="submit" variant="outline">Retry {tokenAmountToAllow.token.symbol} allowance</Button>
          </div>
        )
      }
    </form>
  );
}
