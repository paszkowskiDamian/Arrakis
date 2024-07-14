'use client';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import { Card } from '@/components/CardProps';
import { SectionLayout } from '@/components/SectionLayout';
import { VaultDisplayHeader } from '@/components/VaultDisplayHeader';
import { VaultStat } from '@/components/VaultStat';
import { Form } from '@/components/form/Form';
import { VaultData } from '@/contractCalls/vault';
import { formatTokenBalanceWithUnit } from '@/types/Token';
import React from 'react';

export function VaultDisplay({ vaultData }: { vaultData: VaultData }) {
  return (
    <React.Fragment>
      <VaultDisplayHeader
        token0Symbol={vaultData.token0.token.symbol}
        token1Symbol={vaultData.token1.token.symbol}
      />
      <SectionLayout className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='col-span-2 h-[400px]'>
          <Form vaultData={vaultData} />
        </Card>
        <Card>
          <h4 className='text-primary-500'>About Banner</h4>
        </Card>
        <Card>
          <VaultStat
            title='Balances'
            value={
              <React.Fragment>
                <div>{formatTokenBalanceWithUnit(vaultData.token0)}</div>
                <div>{formatTokenBalanceWithUnit(vaultData.token1)}</div>
              </React.Fragment>
            }
          />
        </Card>
        <Card className='min-h-[200px]'>
          <VaultStat title='Strategy' value='LST Stable' />
        </Card>
        <Card className='min-h-[200px]'>
          <VaultStat title='Reward APR' value='15%' />
        </Card>
      </SectionLayout>
    </React.Fragment>
  );
}
