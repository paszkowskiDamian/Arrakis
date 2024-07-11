'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { StaticVaultData } from '@/types/VaultData';
import { tokenIcons } from '@/data/tokenIcons';

export function VaultCard({ data }: { data: StaticVaultData; }) {
  const router = useRouter();

  return (
    <div onClick={() => !data.commingSoon && router.push(`/vault/${data.vaultAddress}`)} className={cn([
      'bg-dark  rounded-3xl p-4 text-light relative',
      [!data.commingSoon && 'group hover:bg-primary-900 cursor-pointer']
    ])}>
      <div className='absolute top-0 left-0 right-0 flex justify-center translate-y-[-30px]'>
        <img width="60px" alt={`${data.token1} token icon`} src={tokenIcons[data.token1]} className='translate-x-[10px] group-hover:translate-x-[-3px] duration-150' />
        <img width="60px" alt={`${data.token2} token icon`} src={tokenIcons[data.token2]} className='translate-x-[-10px] group-hover:translate-x-[3px] duration-150' />
      </div>
      <h3 className='text-center my-5'>
        {data.token1} / {data.token2}
      </h3>
      {data.commingSoon && <div className='absolute text-xs right-0 top-0 border-light border-[3px] translate-y-[-50%] translate-x-5  bg-primary-600 rounded-full px-2 py-1'>Comming soon</div>}
      <dl className='grid grid-cols-2 gap-y-2 w-[100%]'>
        <dt>TVL</dt>
        <dd className='text-right'>{data.tvl}</dd>
        <dt>Reward</dt>
        <dd className='text-right'>{data.apr}</dd>
        <dt>Strategy</dt>
        <dd className='text-right'>{data.strategy}</dd>
      </dl>
    </div>
  );
}
