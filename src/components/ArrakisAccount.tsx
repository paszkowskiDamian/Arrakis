'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import * as React from 'react';

import Button from '@/components/buttons/Button';

export const ArrakisAccount = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openAccountModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (!ready) {
          return;
        }

        if (connected) {
          return (
            <div>
              <Button isDarkBg onClick={() => openAccountModal()}>
                {chain.hasIcon && (
                  <div className='bg-dark w-6 h-6 rounded-full overflow-hidden mr-4'>
                    {chain.iconUrl && (
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        src={chain.iconUrl}
                        className='w-6 h-6'
                      />
                    )}
                  </div>
                )}
                {account.displayName}
                <div className='ml-3'>{account.displayBalance}</div>
              </Button>
            </div>
          );
        }

        return (
          <Button onClick={openConnectModal} isDarkBg variant='outline'>
            Connect Wallet
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
