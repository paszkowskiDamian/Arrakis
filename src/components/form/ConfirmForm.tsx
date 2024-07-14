'use client';
import { waitForTransactionReceipt } from '@wagmi/core';
import React, { useCallback } from 'react';

import Button from '@/components/buttons/Button';
import { FormState } from '@/components/form/FormState';

import { wagmiConfig } from '@/wagmi';

import { Hash } from '@/types/Hash';
import { formatTokenBalanceWithUnit } from '@/types/Token';

interface ConfirmFormProps {
  formState: FormState;
  confirm: () => Promise<Hash>;
  backToEdditing: () => void;
}

enum ConfirmStage {
  WaitingForConfirmation = 'WaitingForConfirmation',
  WaitingForSignature = 'WaitingForSignature',
  TxPending = 'TxPending',
  TxConfirmed = 'TxConfirmed',
  TxFailed = 'TxFailed',
}

export function ConfirmForm({
  formState,
  backToEdditing,
  confirm,
}: ConfirmFormProps) {
  const [confirmStage, setConfirmStage] = React.useState<ConfirmStage>(
    ConfirmStage.WaitingForConfirmation
  );
  const [txHash, setTxHash] = React.useState<Hash | null>(null);

  const onConfirm = useCallback(async () => {
    setConfirmStage(ConfirmStage.WaitingForSignature);
    try {
      const hash = await confirm();
      setConfirmStage(ConfirmStage.TxPending);
      setTxHash(hash);

      const reciept = await waitForTransactionReceipt(wagmiConfig, { hash });

      if (reciept.status === 'success') {
        setConfirmStage(ConfirmStage.TxConfirmed);
      } else {
        setConfirmStage(ConfirmStage.TxFailed);
      }
    } catch (e) {
      setConfirmStage(ConfirmStage.TxFailed);
    }
  }, [confirm]);

  return (
    <div>
      {confirmStage === ConfirmStage.WaitingForConfirmation && (
        <div>
          <h2>Confirm!</h2>
          <p className='w-[70%] mb-4'>
            You are about to deposit{' '}
            <span className='font-semibold text-primary-600'>
              {formatTokenBalanceWithUnit(formState.token0Balance)}
            </span>{' '}
            and{' '}
            <span className='font-semibold text-primary-600'>
              {formatTokenBalanceWithUnit(formState.token1Balance)}
            </span>{' '}
            into the Arrakis vault. Please review the transaction and confirm
            it.
          </p>
          <Button className='mr-4' onClick={backToEdditing} variant='outline'>
            Back to editing
          </Button>
          <Button onClick={onConfirm} variant='outline'>
            Deposit
          </Button>
        </div>
      )}
      {confirmStage === ConfirmStage.WaitingForSignature && (
        <div>
          <h2>Accept transaction in your wallet!</h2>
          <p className='w-[70%] mb-4'>
            You are about to deposit{' '}
            <span className='font-semibold text-primary-600'>
              {formatTokenBalanceWithUnit(formState.token0Balance)}
            </span>{' '}
            and{' '}
            <span className='font-semibold text-primary-600'>
              {formatTokenBalanceWithUnit(formState.token1Balance)}
            </span>{' '}
            into the Arrakis vault. Please review the transaction and confirm
            it.
          </p>
        </div>
      )}
      {confirmStage === ConfirmStage.TxPending && (
        <div>
          <h2>Transaction is being processed!</h2>
          <p className='w-[70%] mb-4'>
            You are about to depositing{' '}
            <span className='font-semibold text-primary-600'>
              {formatTokenBalanceWithUnit(formState.token0Balance)}
            </span>{' '}
            and{' '}
            <span className='font-semibold text-primary-600'>
              {formatTokenBalanceWithUnit(formState.token1Balance)}
            </span>{' '}
            into the Arrakis vault. Please wait for the{' '}
            <a href=''>transaction</a> to be confirmed.
          </p>
        </div>
      )}
      {confirmStage === ConfirmStage.TxConfirmed && (
        <div>
          <h2>Transaction is confirmed!</h2>
          <p className='w-[70%] mb-4'>
            You have just deposited{' '}
            <span className='font-semibold text-primary-600'>
              {formatTokenBalanceWithUnit(formState.token0Balance)}
            </span>{' '}
            and{' '}
            <span className='font-semibold text-primary-600'>
              {formatTokenBalanceWithUnit(formState.token1Balance)}
            </span>{' '}
            into the Arrakis vault. Thank you, now we take over from here so you
            can see your assets grow!
          </p>
        </div>
      )}
      {confirmStage === ConfirmStage.TxFailed && (
        <div>
          <h2>Transaction failed!</h2>
          <p className='w-[70%] mb-4'>
            Unfortunetly your transaction has failed. Please try again or
            contact support.
          </p>
          <Button className='mr-4' onClick={backToEdditing} variant='outline'>
            Back to editing
          </Button>
          <Button onClick={onConfirm} variant='outline'>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
