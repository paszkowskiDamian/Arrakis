'use client';
import React, { useCallback, useState } from "react";
import { useAccount } from "wagmi";

import { VaultData } from "@/contractCalls/vault";
import { makeAddress } from "@/types/Address";
import { DepositForm } from "@/components/form/DepositForm";
import { ConfirmForm } from "@/components/form/ConfirmFormProps";
import { FormState } from "@/components/form/FormState";
import { AllowanceForm } from "@/components/form/AllowanceForm";

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
  const [formState, setFormState] = useState<FormState>();

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

  switch (stage) {
    case FormStages.DepositForm:
      return <DepositForm vaultData={vaultData} onSubmit={onDepositFormSubmit} user={userAddress} />;
    case FormStages.AllowanceToken0Form:
      return userAddress && formState && <AllowanceForm nextStep={onAllowance0Success} user={userAddress} tokenAmountToAllow={formState.token0Balance} />;
    case FormStages.AllowanceToken1Form:
      return userAddress && formState && <AllowanceForm nextStep={onAllowance1Success} user={userAddress} tokenAmountToAllow={formState.token1Balance} />;
    case FormStages.ConfirmForm:
      return <ConfirmForm confirm={onConfirmFormSubmit} />;
    case FormStages.Success:
      return <div>Success</div>;
    case FormStages.Failure:
      return <div>Failure</div>;
  }
}
