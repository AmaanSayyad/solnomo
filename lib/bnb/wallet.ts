/**
 * BNB Wallet Integration Module
 * Syncs Wagmi state with Zustand store
 */

import { useAccount } from 'wagmi';
import { useSolnomoStore } from '@/lib/store';
import { useEffect } from 'react';

/**
 * Hook for managing BNB wallet connection state
 */
export function useWalletConnection() {
    const { address, isConnected, connector } = useAccount();

    // Get store actions
    const setAddress = useSolnomoStore(state => state.setAddress);
    const setIsConnected = useSolnomoStore(state => state.setIsConnected);
    const setNetwork = useSolnomoStore(state => state.setNetwork);
    const fetchBalance = useSolnomoStore(state => state.fetchBalance);
    const refreshWalletBalance = useSolnomoStore(state => state.refreshWalletBalance);

    const preferredNetwork = useSolnomoStore(state => state.preferredNetwork);

    // Sync wallet state with store
    useEffect(() => {
        // Only update store if this is the preferred network or no preference is set
        if (address && isConnected && (preferredNetwork === 'BNB' || preferredNetwork === null)) {
            setAddress(address);
            setIsConnected(true);
            setNetwork('BNB');

            // Fetch house and wallet balance when wallet connects
            fetchBalance(address).catch(console.error);
            refreshWalletBalance();

            // Persist session to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('bnbnomo_wallet_session', JSON.stringify({
                    address: address,
                    walletName: connector?.name || 'Injected',
                    timestamp: Date.now()
                }));
            }
        } else if (!isConnected && preferredNetwork === 'BNB') {
            // Only clear if we were the active network
            setAddress(null);
            setIsConnected(false);

            // Clear localStorage session
            if (typeof window !== 'undefined') {
                localStorage.removeItem('bnbnomo_wallet_session');
            }
        }
    }, [address, isConnected, connector, setAddress, setIsConnected, fetchBalance, preferredNetwork]);

    return {
        address,
        isConnected,
        walletName: connector?.name || null
    };
}
