'use client';
import { SectionLayout } from "@/components/SectionLayout";
import { TokenIcon } from "@/data/tokenIcons";
import React from "react";

export interface VaultDisplayHeaderProps {
  token0Symbol: string
  token1Symbol: string
}

export function VaultDisplayHeader({ token0Symbol, token1Symbol }: VaultDisplayHeaderProps) {
  return (
    <SectionLayout className="flex flex-row">
      <div className='flex'>
        <TokenIcon token={token0Symbol} className='translate-x-[10px] w-[60px]' />
        <TokenIcon token={token1Symbol} className='translate-x-[-10px] w-[60px]' />
      </div>
      <h1 className="self-center duration-150">
        {token0Symbol} / {token1Symbol}
      </h1>
    </SectionLayout>
  );
}
