import { getDefaultConfig } from 'connectkit';
import { createConfig, http } from 'wagmi';
import { arbitrumSepolia } from 'wagmi/chains';

export const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [arbitrumSepolia],
        transports: {
            [arbitrumSepolia.id]: http(),
        },

        // Required API Keys
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'dummy-id',

        // Required App Info
        appName: 'Solnomo',

        // Optional App Info
        appDescription: 'Solnomo on Solana',
        appUrl: 'https://solnomo.com', // updated url
        appIcon: 'https://solnomo.com/logo.png', // updated icon
    }),
);
