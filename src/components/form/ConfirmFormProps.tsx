'use client';
import Button from "@/components/buttons/Button";
import React from "react";

interface ConfirmFormProps {
  confirm: () => void;
}

export function ConfirmForm(props: ConfirmFormProps) {
  return (
    <div>
      <Button onClick={props.confirm} variant="outline">Deposit to Vault</Button>
    </div>
  );
}
