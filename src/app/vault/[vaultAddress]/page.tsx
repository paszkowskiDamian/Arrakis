'use client';
import { SectionLayout } from "@/components/SectionLayout";
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  className?: string
}

function Card({ children, className }: React.PropsWithChildren<CardProps>) {
  return (
    <div className={cn(['bg-light text-dark rounded-3xl px-3 py-4', className])}>
      {children}
    </div>
  )
}

export default function VaultPage({ vaultAddress }: { vaultAddress: string }) {
  return (
    <main className="bg-dark absolute top-0 left-0 bottom-0 right-0 pt-12 text-light">
      <SectionLayout>
        <h1>
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
      </SectionLayout>
    </main>
  );
}