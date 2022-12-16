import { setupWalletSelector } from '@near-wallet-selector/core';
import '@near-wallet-selector/modal-ui/styles.css';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';

import { useWalletSelector } from './NearWalletContextProvider';

export const NearSignInButtons: React.FC = () => {
  const { modal } = useWalletSelector();

  const handleSignIn = () => {
    modal.show();
  };

  const handleSignOut = async () => {
    const selector = await setupWalletSelector({
      network: 'testnet',
      modules: [setupNearWallet()],
    });
    const wallet = await selector.wallet('my-near-wallet');
    await wallet.signOut();
  };

  return (
    <div>
      <button onClick={handleSignIn}>Log in</button>
      <button onClick={handleSignOut}>Log out</button>
    </div>
  );
};
