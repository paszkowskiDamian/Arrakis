'use client';
import * as React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Button from '@/components/buttons/Button';
import { cn } from '@/lib/utils';

interface ArrakisConnectButtonProps {
  className?: string;
  isDarkBg?: boolean;
}

export const ArrakisConnectButton = ({
  className,
  isDarkBg,
}: ArrakisConnectButtonProps) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            className={cn([
              !ready && [
                'opacity-0',
                'pointer-events-none',
                'user-select-none',
              ],
              className,
            ])}
            aria-hidden={!ready}
          >
            {
              <Button
                onClick={openConnectModal}
                className={cn([connected && ['invisible']])}
                isDarkBg={isDarkBg}
                variant='outline'
              >
                Connect Wallet
              </Button>
            }
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
