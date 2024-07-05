'use server';
import { SectionLayout } from "@/components/SectionLayout";
import { Address, ChainResponse, ResponseStatus, readVaultData } from "@/contractCalls/vault";
import { tokenIcons } from "@/data/tokenIcons";
import { cn } from "@/lib/utils";
import { VaultData } from "@/types/VaultData";
import React, { ReactNode, Suspense, useCallback } from "react";

interface CardProps {
  className?: string
}

function Card({ children, className }: React.PropsWithChildren<CardProps>) {
  return (
    <div className={cn(['bg-light text-dark grow rounded-3xl px-3 py-4', className])}>
      {children}
    </div>
  )
}

interface AsyncCompProps<Data> {
  request: () => Promise<ChainResponse<Data>>
  DisplayComp: (props: { data: Data }) => ReactNode
  LoadingComp: React.ComponentType
}

function SusspensedComp<Data>(props: AsyncCompProps<Data>) {
  console.log('tesat')
  return (
    <Suspense fallback={<props.LoadingComp />}>
      <AcyncComp {...props} />
    </Suspense>
  )
}

async function AcyncComp<Data>({ request, DisplayComp }: AsyncCompProps<Data>) {
  const response = await request()

  return <ResponseDesplay response={response} LoadingComp={Loading} ErrorComp={Error} SuccessComp={DisplayComp} />
}

function Loading() {
  return <div>Loading</div>
}

function Error() {
  return <div>Loading</div>
}

interface ResponseDesplayProps<Data> {
  response: ChainResponse<Data>
  LoadingComp: React.ComponentType
  ErrorComp: React.ComponentType
  SuccessComp: React.ComponentType<{ data: Data }>
}

function ResponseDesplay<Data>({ response, ErrorComp, SuccessComp }: ResponseDesplayProps<Data>) {
  if (response.status === ResponseStatus.Error) {
    return <ErrorComp />
  }

  return <SuccessComp data={response.data} />
}

function VaultDisplay({ data }: { data: VaultData }) {
  return <div>
    test
    {data.strategy}
  </div>
}

export default async function VaultPage({ params }: { params: { vaultAddress: Address } }) {
  const request = useCallback(() => readVaultData(params.vaultAddress), [params.vaultAddress])

  return (
    <main className="bg-dark absolute top-0 left-0 bottom-0 right-0 pt-12 text-light">
      <SusspensedComp request={request} DisplayComp={VaultDisplay} LoadingComp={Loading} />
      <SectionLayout className="flex flex-row">
        <div className='flex'>
          <img width="60px" src={tokenIcons.DAI} className='translate-x-[10px]' />
          <img width="60px" src={tokenIcons.ETH} className='translate-x-[-10px]' />
        </div>
        <h1 className="self-center">
          WETH / rETH Vault
        </h1>
      </SectionLayout>
      <SectionLayout className="grid gap-3 grid-rows-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          Test
        </Card>
        <Card>
          Test 2
        </Card>
        <Card>
          Test 3
        </Card>
        <Card>
          Test 4
        </Card>
        <Card>
          Test 5
        </Card>
      </SectionLayout>
    </main>
  );
}