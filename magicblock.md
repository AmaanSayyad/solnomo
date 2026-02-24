# MagicBlock Integration in Solnomo

This project integrates **MagicBlock**, a high-performance framework for Solana that enables Web2-level performance through **Ephemeral Rollups**.

## How MagicBlock Works

MagicBlock allows Solana applications to scale by decoupling execution from the main chain while maintaining full composability and security.

### Core Architecture: Ephemeral Rollups

The backbone of MagicBlock is the concept of **Ephemeral Rollups (ER)**. These are on-demand, application-specific runtimes that execute transactions off-main-chain but settle back to Solana.

1.  **Account Delegation**: Accounts (like game states or user profiles) can be "delegated" from Solana to an Ephemeral Rollup. While delegated, these accounts can be modified with sub-second latency (as low as 10ms).
2.  **State Commitment**: After a period of activity or upon request, the final state of the accounts is committed back to the Solana mainnet.
3.  **Full Composability**: Even when an account is on an Ephemeral Rollup, it remains part of the Solana ecosystem. You don't "bridge" assets; you simply delegate the right to modify the state.

### The Magic Router

The **Magic Router** is the intelligent gateway we use in this project. It abstracts away the complexity of choosing where a transaction should run.

-   **Intelligent Routing**: When a transaction is sent to the Magic Router RPC, it analyzes the metadata (writable accounts).
-   **Seamless Execution**: If the accounts involved are delegated to a high-speed validator, the router sends the transaction to the Ephemeral Rollup. Otherwise, it routes it to Solana Mainnet/Devnet.
-   **No User Friction**: Users sign standard Solana transactions. They don't need to switch networks or understand the underlying infrastructure.

## Integration in Solnomo

In this project, we have integrated the **Magic Router SDK** to optimize all Solana-based interactions.

### 1. RPC Configuration
The application is configured to use the Magic Router endpoint: `https://devnet-router.magicblock.app`. This ensures that every interaction from the frontend or backend passes through the intelligent routing layer.

### 2. Transaction Preparation
Using `prepareMagicTransaction` from `magic-router-sdk`, the app automatically:
-   Identifies the correct execution environment.
-   Fetches the optimal blockhash.
-   Prepares the transaction for either Ephemeral Rollup or Mainnet execution.

### 3. High-Performance Gaming
By routing transactions through MagicBlock, Solnomo can achieve:
-   **Ultra-low latency**: Faster feedback for user actions.
-   **Elastic Scalability**: Handling spikes in activity without mainnet congestion affecting the core gameplay loop.
-   **Web2 UX**: Transactions feel instantaneous, removing the "waiting for confirmation" friction common in blockchain apps.

## Resources
-   [MagicBlock Documentation](https://docs.magicblocklabs.com)
-   [MagicBlock Website](https://magicblock.xyz)
