import {
    NotifiContext,
    NotifiInputSeparators,
    NotifiSubscriptionCard,
  } from '@notifi-network/notifi-react-card';
  import '@notifi-network/notifi-react-card/dist/index.css';
  import useNearWallet from './NotifiHook';
  import React from 'react';
  
  export const NotifiCard: React.FC = () => {
    const { account, walletPublicKey, signMessage } = useNearWallet();
  
    if (account === null || walletPublicKey === null) {
      // account is required
      return null;
    }
  
    const inputLabels = {
      email: 'Email',
      sms: 'Text Message',
      telegram: 'Telegram',
    };
  
    const inputSeparators: NotifiInputSeparators = {
      smsSeparator: {
        content: 'OR',
      },
      emailSeparator: {
        content: 'OR',
      },
    };
  
    return (
      <NotifiContext
        dappAddress="junitest.xyz"
        env="Development"
        walletBlockchain="NEAR"
        accountAddress={account}
        walletPublicKey={walletPublicKey} // require wallet public key without ed25519: append
        signMessage={signMessage}
      >
        <NotifiSubscriptionCard
          cardId="71562316475a4171ae9c980adaefab7d"
          inputLabels={inputLabels}
          inputSeparators={inputSeparators}
          darkMode //optional
        />
      </NotifiContext>
    );
  };
