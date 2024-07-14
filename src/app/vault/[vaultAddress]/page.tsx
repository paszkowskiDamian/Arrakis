'use client';
import { SectionLayout } from '@/components/SectionLayout';
import { readVaultData } from '@/contractCalls/vault';
import { useRequest } from '@/hooks/useRequest';
import { Address } from '@/types/Address';
import React, { useCallback } from 'react';
import { VaultDisplay } from '@/components/VaultDisplay';
import { Loading } from '../../../components/Loading';
import { ErrorComp } from '../../../components/ErrorComp';

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
