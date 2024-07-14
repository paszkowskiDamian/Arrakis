'use client';
import { ChainResponse } from '@/types/ChainResponse';
import React from 'react';

export type LoadingState = {
  status: 'loading';
};

export function useRequest<Data>(request: () => Promise<ChainResponse<Data>>) {
  const [response, setResponse] = React.useState<
    ChainResponse<Data> | LoadingState
  >({ status: 'loading' });

  React.useEffect(() => {
    request().then(setResponse);
  }, [request]);

  return response;
}
