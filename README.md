# Satoshi Rune - Bitcoin Prediction Markets with Runes

A decentralized prediction market platform built on Bitcoin using Runes protocol for token operations and market settlements.

## Overview

Satoshi Rune enables users to:
- Create and participate in prediction markets using Rune tokens
- Place bets on real-world events
- Get instant settlements via Bitcoin network
- Manage predictions through a user-friendly interface

## Project Structure
```
satoshi-rune/
├── backend/           # Node.js Express backend
│   ├── src/
│   │   ├── runesService.ts    # Rune token operations
│   │   ├── bitcoinService.ts  # Bitcoin transaction handling
│   │   ├── marketController.ts # Market management
│   │   ├── oracleService.ts   # Oracle integration
│   │   └── server.ts         # Express server setup
│   └── package.json
└── frontend/          # React + Vite frontend
├── src/
│   ├── components/    # React components
│   ├── App.tsx       # Main application
│   └── main.tsx      # Entry point
└── package.json
```
## Technology Stack

### Backend
- Node.js + TypeScript
- Express.js
- Bitcoin.js library
- Rune protocol integration
- Reality.eth oracle integration

### Frontend
- React 19
- TypeScript
- Vite
- TailwindCSS
- Xverse Wallet integration

## Features

1. **Rune Token Operations**
   - Mint new Rune tokens
   - Transfer tokens between addresses
   - Check token balances
   - Advanced operations with low-level primitives

2. **Prediction Markets**
   - Create new markets
   - Place bets using Rune tokens
   - Automated settlement based on oracle outcomes
   - Real-time market status updates

3. **Wallet Integration**
   - Xverse wallet connection
   - Secure transaction signing
   - Address management for different purposes (Payment, Ordinals)

4. **User Interface**
   - Responsive design
   - Real-time market updates
   - User dashboard with portfolio tracking
   - Market creation interface

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- Bitcoin testnet wallet (Xverse recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arnavkirti/Satoshis-Runes.git
cd Satoshis-Runes
```
2. Install backend dependencies:
```bash
cd backend
npm install
```
3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```
### Configuration
1. Create a .env file in the backend directory with the following variables:
```bash
PORT=3001
MEMPOOL_API_URL=https://mempool.space/testnet/api
BROADCAST_API_URL=https://blockstream.info/testnet/api/tx
ORACLE_API_URL=https://api.reality.eth/outcome
```

### Running the Application
1. Start the backend server:
```bash
cd backend
npm start
```
2. Start the frontend development server:
```bash
cd ../frontend
npm run dev
```
The application will be available at ```http://localhost5173```.

### API Endpoints
#### Markets
- GET /api/markets: Get all active markets
- POST /api/markets: Create a new market
- POST /api/markets/:marketId/bets: Place a bet on a market
- POST /api/markets/:marketId/settle: Settle a market

#### Runes
- GET /api/runes/:address: Get Rune balance for an address
- POST /api/runes/mint: Mint new Runes
- POST /api/runes/transfer: Transfer Runes
- POST /api/runes/balance/:address/:ticker: Check Rune balance

### Development

#### Backend Development
The backend uses TypeScript and follows a service-based architecture:

- runesService.ts - Handles all Rune token operations
- bitcoinService.ts - Manages Bitcoin transactions
- marketController.ts - Controls market operations
- oracleService.ts - Integrates with Reality.eth oracle

#### Frontend Development
The frontend is built with React and uses:

- Vite for fast development
- TailwindCSS for styling
- TypeScript for type safety
- Xverse wallet integration for Bitcoin operations

## Security Considerations
1. Private Key Management
   
   - Never expose private keys in the frontend
   - Use secure key storage methods
   - Implement proper signing procedures
2. Transaction Validation
   
   - Verify all transactions before broadcasting
   - Implement proper UTXO management
   - Handle network fees appropriately
3. Oracle Integration
   
   - Verify oracle responses
   - Implement timeout mechanisms
   - Handle dispute resolution