'use client';
import * as React from 'react';

interface AnimatedLogoProps {
  className?: string;
  hideText?: boolean;
}

export function AnimatedLogo({ className, hideText }: AnimatedLogoProps) {
  return (
    <div className={className}>
      <div className='relative flex justify-center'>
        <div
          id='Sun'
          className='w-60 h-60 bg-light [clip-path:circle(49%)] rounded-full relative'
        >
          <div
            id='Moon_1'
            className='w-28 h-28 bg-dark rounded-full mix-blend-darken absolute origin-[300%_-2000%] animate-moon_1'
          ></div>
          <div
            id='Moon_2'
            className='w-48 h-48 bg-dark rounded-full mix-blend-darken absolute origin-[2800%_-1200%] animate-moon_2'
          ></div>
        </div>
        {!hideText && (
          <h1
            id='Title'
            className='text-9xl tracking-widest mix-blend-exclusion font-thin text-light absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          >
            Arrakis
          </h1>
        )}
      </div>
    </div>
  );
}
