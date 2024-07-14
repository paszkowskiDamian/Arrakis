'use client';
import React from 'react';

export function VaultStat({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <h4>{title}</h4>
      <div>{value}</div>
    </div>
  );
}
