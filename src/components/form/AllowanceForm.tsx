'use client';
import React, { SyntheticEvent, useCallback, useEffect } from 'react';

import Button from '@/components/buttons/Button';

import { addresses } from '@/constants/addresses';
import { approveToken, getCurrentAllowance } from '@/contractCalls/erc20';

import { Address } from '@/types/Address';
import { ResponseStatus } from '@/types/ChainResponse';
import { formatTokenBalanceWithUnit,TokenBalance } from '@/types/Token';

interface AllowanceFormProps {
  user: Address;
  tokenAmountToAllow: TokenBalance;
  nextStep: () => void;
  backToEdditing: () => void;
}

enum AllowanceStage {
  CheckingCurrentAllowance = 'CheckingCurrentAllowance',
  WaitingForConfirmation = 'WaitingForConfirmation',
  TxPending = 'TxPending',
  AllowanceConfirmed = 'AllowanceConfirmed',
  TxFailed = 'TxFailed',
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AllowanceForm({
  tokenAmountToAllow,
  nextStep,
  user,
  backToEdditing,
}: AllowanceFormProps) {
  const [formStage, setFormStage] = React.useState<AllowanceStage>(
    AllowanceStage.CheckingCurrentAllowance
  );
  const checkAllowance = useCallback(async () => {
    const currentAllowanceResponse = await getCurrentAllowance(
      user,
      addresses.ARRAKIS_ROUTER,
      tokenAmountToAllow.token
    );

    switch (currentAllowanceResponse.status) {
      case ResponseStatus.Success:
        if (
          currentAllowanceResponse.data.balance >= tokenAmountToAllow.balance
        ) {
          await delay(900);
          nextStep();
        } else {
          setFormStage(AllowanceStage.WaitingForConfirmation);
        }
        return;
      case ResponseStatus.Error:
        setFormStage(AllowanceStage.WaitingForConfirmation);
        return;
    }
  }, [tokenAmountToAllow, user]);

  useEffect(() => {
    checkAllowance();
  }, [tokenAmountToAllow.token.symbol]);

  const onSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormStage(AllowanceStage.TxPending);
      try {
        await approveToken(addresses.ARRAKIS_ROUTER, tokenAmountToAllow);
        checkAllowance();
      } catch (e) {
        setFormStage(AllowanceStage.TxFailed);
      }
    },
    [tokenAmountToAllow, user, nextStep, checkAllowance]
  );

  return (
    <form onSubmit={onSubmit}>
      <h2>
        {formStage === AllowanceStage.CheckingCurrentAllowance ? (
          <span>Checking </span>
        ) : (
          <span>Set </span>
        )}
        {tokenAmountToAllow.token.symbol}
        <span> Allowance</span>
      </h2>
      {formStage === AllowanceStage.CheckingCurrentAllowance && (
        <p className='mb-4 w-[70%]'>Checking current allowance...</p>
      )}
      {formStage === AllowanceStage.WaitingForConfirmation && (
        <div>
          <p className='mb-4 w-[70%]'>
            In order to deposit into vault you need to allow{' '}
            <a className='text-primary-600 underline' href=''>
              Arrakis Router
            </a>{' '}
            to use your {formatTokenBalanceWithUnit(tokenAmountToAllow)}
          </p>
          <Button className='mr-4' variant='outline' onClick={backToEdditing}>
            Back to edditing
          </Button>
          <Button type='submit' variant='outline'>
            Set allowance
          </Button>
        </div>
      )}
      {formStage === AllowanceStage.TxPending && (
        <p className='mb-4 w-[70%]'>Transaction is pending</p>
      )}
      {formStage === AllowanceStage.AllowanceConfirmed && (
        <div>
          <p className='mb-4 w-[70%]'>Transaction confirmed</p>
          <Button onClick={nextStep} variant='outline'>
            Next Step
          </Button>
        </div>
      )}
      {formStage === AllowanceStage.TxFailed && (
        <div className='w-[70%]'>
          <p className='mb-4'>
            Transaction has failed. Check your wallet for more information and
            try again.
          </p>
          <Button type='submit' variant='outline'>
            Retry {tokenAmountToAllow.token.symbol} allowance
          </Button>
        </div>
      )}
    </form>
  );
}
