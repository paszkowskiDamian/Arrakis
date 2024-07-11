'use client';
import Button from "@/components/buttons/Button";
import { FormState } from "@/components/form/FormState";
import { formatTokenBalanceWithUnit } from "@/types/Token";
import React from "react";

interface ConfirmFormProps {
  formState: FormState;
  confirm: () => void;
  backToEdditing: () => void;
}

export function ConfirmForm({ formState, backToEdditing, confirm }: ConfirmFormProps) {
  return (
    <div>
      <h2>Confirm!</h2>
      <p className="w-[70%] mb-4">
        You are about to deposit <span className="font-semibold text-primary-600">{formatTokenBalanceWithUnit(formState.token0Balance)}</span> and <span className="font-semibold text-primary-600">{formatTokenBalanceWithUnit(formState.token1Balance)}</span> into the Arrakis vault. Please review the transaction and confirm it.
      </p>
      <Button className="mr-4" onClick={backToEdditing} variant="outline">Back to editing</Button>
      <Button onClick={confirm} variant="outline">Deposit to Vault</Button>
    </div>
  );
}
