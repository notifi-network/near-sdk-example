import { keyStores } from 'near-api-js';
import { useCallback, useEffect, useState, useMemo } from 'react';

import { useWalletSelector } from '../components/NearWalletContextProvider';
//assume that you have NEARWalletContextProvider setup
//example: https://github.com/near/wallet-selector/blob/main/examples/react/contexts/WalletSelectorContext.tsx

export default function useNearWallet() {
  const { accountId } = useWalletSelector();
  const [walletPublicKey, setWalletPublicKey] = useState<string | null>(null);

  const config = {
    networkId: 'testnet', //adjust based on network type
  };

  const keyStore = useMemo(() => {
    return new keyStores.BrowserLocalStorageKeyStore();
  }, []);

  useEffect(() => {
    if (!accountId) {
        setWalletPublicKey(null);
    }
  }, [accountId])

  useEffect(() => {
    async function getPublicKey() {
      if (!keyStore) return;
      const keyPair = await keyStore.getKey(config.networkId, accountId!);
      const publicKey = keyPair.getPublicKey().toString();
      // remove the ed25519: appending for the wallet public key
      const publicKeyWithoutTypeAppend = publicKey.replace('ed25519:', '');
      setWalletPublicKey(publicKeyWithoutTypeAppend);
    }
    getPublicKey();
  }, [accountId, config.networkId, keyStore]);

  const signMessage = useCallback(
    async (message: Uint8Array) => {
      const keyPair = await keyStore.getKey(config.networkId, accountId!);
      const { signature } = keyPair.sign(message);
      return signature;
    },
    [accountId, config.networkId, keyStore],
  );

  return { account: accountId, walletPublicKey, signMessage };
}
