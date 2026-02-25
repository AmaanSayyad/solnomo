/**
 * Solana Network Configuration
 *
 * This app runs on Solana devnet only.
 */

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export interface SolanaConfig {
    network: WalletAdapterNetwork;
    rpcEndpoint: string;
    treasuryAddress: string;
}

/**
 * Get Solana configuration from environment variables.
 * App is devnet-only; mainnet-beta is not supported.
 */
export function getSolanaConfig(): SolanaConfig {
    const networkStr = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
    const network =
        networkStr === 'devnet'
            ? WalletAdapterNetwork.Devnet
            : networkStr === 'mainnet-beta'
              ? WalletAdapterNetwork.Mainnet
              : WalletAdapterNetwork.Devnet;

    const publicRpcs = [
        'https://devnet-router.magicblock.app',
        'https://api.devnet.solana.com',
        'https://solana-devnet.rpc.extrnode.com',
        'https://rpc.ankr.com/solana_devnet',
        'https://solana-devnet.publicnode.com',
    ];

    const rpcEndpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || publicRpcs[0];
    const treasuryAddress = process.env.NEXT_PUBLIC_TREASURY_ADDRESS;

    // Validate required environment variables
    if (!treasuryAddress) {
        throw new Error(
            'Missing required Solana environment variable: NEXT_PUBLIC_TREASURY_ADDRESS. ' +
            'Please check your .env file and ensure it is set.'
        );
    }

    return {
        network,
        rpcEndpoint,
        treasuryAddress,
    };
}

/**
 * Validate that all required environment variables are present
 */
export function validateSolanaConfig(): void {
    getSolanaConfig();
}
