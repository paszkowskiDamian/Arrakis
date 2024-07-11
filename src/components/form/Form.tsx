'use client';
import React, { useCallback, useState } from "react";
import { useAccount } from "wagmi";

import { VaultData } from "@/contractCalls/vault";
import { Address, makeAddress } from "@/types/Address";
import { DepositForm } from "@/components/form/DepositForm";
import { ConfirmForm } from "@/components/form/ConfirmFormProps";
import { FormState } from "@/components/form/FormState";
import { AllowanceForm } from "@/components/form/AllowanceForm";
import { makeTokenBalance } from "@/types/Token";
import { cn } from "@/lib/utils";

enum FormStages {
  DepositForm = 'DepositForm',
  AllowanceToken0Form = 'AllowanceToken0Form',
  AllowanceToken1Form = 'AllowanceToken1Form',
  ConfirmForm = 'ConfirmForm',
  Success = 'Success',
  Failure = 'Failure'
}

interface FormProps {
  vaultData: VaultData;
}

export function Form({ vaultData }: FormProps) {
  const [stage, setStage] = useState<FormStages>(FormStages.DepositForm);
  const [formState, setFormState] = useState<FormState>(
    {
      token0Balance: makeTokenBalance(0n, vaultData.token0.token),
      token1Balance: makeTokenBalance(0n, vaultData.token1.token)
    }
  );

  const user = useAccount();
  const userAddress = user.address && makeAddress(user.address);

  const onDepositFormSubmit = useCallback((formState: FormState) => {
    setFormState(formState);
    setStage(FormStages.AllowanceToken0Form);
  }, []);

  const onAllowance0Success = useCallback(() => {
    setStage(FormStages.AllowanceToken1Form);
  }, []);

  const onAllowance1Success = useCallback(() => {
    setStage(FormStages.ConfirmForm);
  }, []);

  const onConfirmFormSubmit = useCallback(() => {
  }, []);

  const backToEdditing = useCallback(() => {
    setStage(FormStages.DepositForm)
  }, []);

  return (
    <div className="h-full relative">
      <FormBody
        stage={stage}
        vaultData={vaultData}
        userAddress={userAddress}
        formState={formState}
        onDepositFormSubmit={onDepositFormSubmit}
        onAllowance0Success={onAllowance0Success}
        onAllowance1Success={onAllowance1Success}
        onConfirmFormSubmit={onConfirmFormSubmit}
        backToEdditing={backToEdditing}
      />
      <div className="absolute bottom-0 right-0 left-0">
        <FormStepper
          token0Symbol={vaultData.token0.token.symbol}
          token1Symbol={vaultData.token1.token.symbol}
          currentStep={stage}
        />
      </div>
    </div>
  )
}

interface FormBodyProps {
  formState: FormState;
  stage: FormStages;
  userAddress: Address | undefined;
  vaultData: VaultData;
  onDepositFormSubmit: (formState: FormState) => void;
  onAllowance0Success: () => void;
  onAllowance1Success: () => void;
  onConfirmFormSubmit: () => void;
  backToEdditing: () => void;
}

function FormBody({ formState, stage, userAddress, vaultData, onAllowance0Success, onAllowance1Success, onConfirmFormSubmit, onDepositFormSubmit, backToEdditing }: FormBodyProps) {
  switch (stage) {
    case FormStages.DepositForm:
      return <DepositForm formState={formState} vaultData={vaultData} onSubmit={onDepositFormSubmit} user={userAddress} />;
    case FormStages.AllowanceToken0Form:
      return userAddress && <AllowanceForm nextStep={onAllowance0Success} backToEdditing={backToEdditing} user={userAddress} tokenAmountToAllow={formState.token0Balance} />;
    case FormStages.AllowanceToken1Form:
      return userAddress && <AllowanceForm nextStep={onAllowance1Success} backToEdditing={backToEdditing} user={userAddress} tokenAmountToAllow={formState.token1Balance} />;
    case FormStages.ConfirmForm:
      return <ConfirmForm formState={formState} backToEdditing={backToEdditing} confirm={onConfirmFormSubmit} />;
    case FormStages.Success:
      return <div>Success</div>;
    case FormStages.Failure:
      return <div>Failure</div>;
  }
}

interface FormStepperProps {
  currentStep: FormStages;
  token0Symbol: string;
  token1Symbol: string;
}

function FormStepper({ currentStep, token0Symbol, token1Symbol }: FormStepperProps) {
  return (
    <div className="flex">
      <Step isActive={currentStep === FormStages.DepositForm} name="Deposit" />
      <Step isActive={currentStep === FormStages.AllowanceToken0Form} name={`${token0Symbol} allowance`} />
      <Step isActive={currentStep === FormStages.AllowanceToken1Form} name={`${token1Symbol} allowance`} />
      <Step isActive={currentStep === FormStages.ConfirmForm} name="Confirm" />
    </div>
  );
}

interface StepProps {
  isActive: boolean;
  name: string;
}

function Step({ isActive, name }: StepProps) {
  return (
    <div
      className={cn([
        isActive ? ['flex-1'] : ['w-[3rem]'],
        ['bg-primary-300', 'm-1', 'text-primary-800', 'font-semibold'],
        ['flex', 'justify-center', 'items-center', 'rounded-lg'],
        ['duration-700'],
        ['h-[2rem]']
      ])}>
      <span className={cn([
        isActive ? ['opacity-100'] : ['opacity-0'], []
      ])} >{name}</span>
    </div>
  )
}