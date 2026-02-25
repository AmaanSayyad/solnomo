/**
* Main Zustand store for Solnomo dApp
* Combines wallet, game, and history slices
* 
* Note: After migration, blockchain events are handled
* by the native chain backend client for deposit/withdrawal confirmation.
* Game logic remains off-chain.
*/

import { create } from "zustand";
import { WalletState, createWalletSlice } from "./walletSlice";
import { GameState, createGameSlice, startPriceFeed, startGlobalPriceFeed } from "./gameSlice";
import { HistoryState, createHistorySlice, restoreBetHistory } from "./historySlice";
import { BalanceState, createBalanceSlice } from "./balanceSlice";
import { ReferralState, createReferralSlice } from "./referralSlice";
import { ProfileState, createProfileSlice } from "./profileSlice";

/**
 * Combined store type
 */
export type SolnomoStore = WalletState & GameState & HistoryState & BalanceState & ReferralState & ProfileState;

/**
 * Create the main Zustand store
 * Combines all slices into a single store
 */
export const useSolnomoStore = create<SolnomoStore>()((...args) => ({
  ...createWalletSlice(...args),
  ...createGameSlice(...args),
  ...createHistorySlice(...args),
  ...createBalanceSlice(...args),
  ...createReferralSlice(...args),
  ...createProfileSlice(...args)
}));

/**
 * Initialize the store
 * Restores sessions, loads data
 * Should be called once on app initialization
 */
export const initializeStore = async (): Promise<void> => {
  const store = useSolnomoStore.getState();

  try {
    // Restore bet history from localStorage
    restoreBetHistory((bets) => {
      useSolnomoStore.setState({ bets });
    });

    // Load target cells
    await store.loadTargetCells();

    // Fetch house balance if wallet is connected
    if (store.address) {
      await store.fetchBalance(store.address);
    }

    // Start price feed polling
    const stopPriceFeed = store.startGlobalPriceFeed(store.updateAllPrices);

    // Store cleanup function for later use
    (window as any).__solnomoCleanup = () => {
      stopPriceFeed();
    };


    console.log("Solnomo store initialized successfully");
  } catch (error) {
    console.error("Error initializing store:", error);
  }
};

/**
 * Cleanup function
 * Stops price feed
 * Should be called when app is unmounted
 */
export const cleanupStore = (): void => {
  if ((window as any).__solnomoCleanup) {
    (window as any).__solnomoCleanup();
    delete (window as any).__solnomoCleanup;
  }
};

/**
 * Export individual selectors for optimized re-renders
 */
export const useWalletAddress = () => useSolnomoStore(state => state.address);
export const useWalletBalance = () => useSolnomoStore(state => state.walletBalance);
export const useIsConnected = () => useSolnomoStore(state => state.isConnected);
export const useCurrentPrice = () => useSolnomoStore(state => state.currentPrice);
export const usePriceHistory = () => useSolnomoStore(state => state.priceHistory);
export const useActiveRound = () => useSolnomoStore(state => state.activeRound);
export const useTargetCells = () => useSolnomoStore(state => state.targetCells);
export const useBetHistory = () => useSolnomoStore(state => state.bets);
export const useIsPlacingBet = () => useSolnomoStore(state => state.isPlacingBet);
export const useIsSettling = () => useSolnomoStore(state => state.isSettling);
export const useHouseBalance = () => useSolnomoStore(state => state.houseBalance);
export const useIsLoadingBalance = () => useSolnomoStore(state => state.isLoading);
export const useUserTier = () => useSolnomoStore(state => state.userTier);

/**
 * Export main store hook (alias for convenience)
 */
export const useStore = useSolnomoStore;

/**
 * Export actions
 * Note: These selectors return new objects on each call, which can cause infinite loops.
 * Use direct store access (useOverflowStore(state => state.actionName)) instead.
 */
export const useWalletActions = () => {
  const connect = useSolnomoStore(state => state.connect);
  const disconnect = useSolnomoStore(state => state.disconnect);
  const refreshWalletBalance = useSolnomoStore(state => state.refreshWalletBalance);
  return { connect, disconnect, refreshWalletBalance };
};

export const useGameActions = () => {
  const placeBet = useSolnomoStore(state => state.placeBet);
  const placeBetFromHouseBalance = useSolnomoStore(state => state.placeBetFromHouseBalance);
  const settleRound = useSolnomoStore(state => state.settleRound);
  const updatePrice = useSolnomoStore(state => state.updatePrice);
  return { placeBet, placeBetFromHouseBalance, settleRound, updatePrice };
};

export const useHistoryActions = () => {
  const fetchHistory = useSolnomoStore(state => state.fetchHistory);
  const addBet = useSolnomoStore(state => state.addBet);
  const clearHistory = useSolnomoStore(state => state.clearHistory);
  return { fetchHistory, addBet, clearHistory };
};

export const useBalanceActions = () => {
  const fetchBalance = useSolnomoStore(state => state.fetchBalance);
  const setBalance = useSolnomoStore(state => state.setBalance);
  const updateBalance = useSolnomoStore(state => state.updateBalance);
  const depositFunds = useSolnomoStore(state => state.depositFunds);
  const withdrawFunds = useSolnomoStore(state => state.withdrawFunds);
  const clearError = useSolnomoStore(state => state.clearError);
  return { fetchBalance, setBalance, updateBalance, depositFunds, withdrawFunds, clearError };
};
