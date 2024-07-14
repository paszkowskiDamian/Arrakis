'use client';
import React, { useCallback } from 'react';

import { useRequest } from '@/hooks/useRequest';

import { SectionLayout } from '@/components/SectionLayout';
import { VaultDisplay } from '@/components/VaultDisplay';

import { readVaultData } from '@/contractCalls/vault';

import { ErrorComp } from '../../../components/ErrorComp';
import { Loading } from '../../../components/Loading';

import { Address } from '@/types/Address';

export default function VaultPage({
  params,
}: {
  params: { vaultAddress: Address };
}) {
  const request = useCallback(
    () => readVaultData(params.vaultAddress),
    [params.vaultAddress]
  );
  const data = useRequest(request);

  return (
    <main className='pt-12 text-light'>
      {data.status === 'loading' && (
        <SectionLayout className='text-center'>
          <Loading />
        </SectionLayout>
      )}
      {data.status === 'error' && (
        <SectionLayout>
          <ErrorComp />
        </SectionLayout>
      )}
      {data.status === 'success' && <VaultDisplay vaultData={data.data} />}
    </main>
  );
}
