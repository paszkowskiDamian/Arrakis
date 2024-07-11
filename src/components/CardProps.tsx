'use client';
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  className?: string;
}

export function Card({ children, className }: React.PropsWithChildren<CardProps>) {
  return (
    <div className={cn(['bg-light text-dark grow rounded-3xl px-3 py-4', className])}>
      {children}
    </div>
  );
}
