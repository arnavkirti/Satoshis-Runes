import { getOracleOutcome } from './oracleService.js';
import { createBetTransaction, broadcastTransaction } from './bitcoinService.js';

// In-memory stores for demonstration
const markets: Record<string, any> = {};
const bets: Record<string, any[]> = {};
const utxos: Record<string, any[]> = {};

// Helper to generate unique IDs
function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create a new market
export async function createMarket(description: string, outcomes: string[]) {
  const id = generateId('market');
  // For demo, generate a fake payout address and private key
  const winnerPayoutAddress = "tb1qexampleaddress..." + id.slice(-4);
  const marketPrivateKey = "yourmarketprivatekeyhex" + id.slice(-4);

  markets[id] = {
    id,
    description,
    outcomes,
    oracleQuery: description, // For demo, use description as oracle query
    winnerPayoutAddress,
    marketPrivateKey,
    status: 'open',
    createdAt: Date.now(),
    resolvedOutcome: null,
  };
  bets[id] = [];
  utxos[id] = [
    {
      txid: generateId('tx'),
      vout: 0,
      value: 100000, // 0.001 BTC for demo
      scriptPubKey: "0014d85c5b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b",
    },
  ];
  return markets[id];
}

// List all markets
export async function listMarkets() {
  return Object.values(markets);
}

// Place a bet on a market
export async function placeBet(marketId: string, outcome: string, amount: number, walletAddress: string) {
  const market = markets[marketId];
  if (!market) throw new Error('Market not found');
  if (!market.outcomes.includes(outcome)) throw new Error('Invalid outcome');
  if (market.status !== 'open') throw new Error('Market is not open for betting');

  const bet = {
    id: generateId('bet'),
    marketId,
    outcome,
    amount,
    walletAddress,
    placedAt: Date.now(),
    status: 'active',
  };
  bets[marketId].push(bet);

  // For demo: no real UTXO locking, just record the bet
  return { ...bet, message: "Bet placed (demo, no real BTC moved)" };
}

// Get market by ID
async function getMarketById(marketId: string) {
  return markets[marketId] || null;
}

// Get UTXOs for a market (for settlement)
async function getMarketUTXOs(marketId: string) {
  return utxos[marketId] || [];
}

// Settle a market based on oracle outcome
export async function settleMarket(marketId: string): Promise<any> {
  const market = await getMarketById(marketId);
  if (!market) throw new Error('Market not found');
  if (market.status !== 'open') throw new Error('Market already settled or closed');

  // 1. Fetch oracle outcome
  const outcome = await getOracleOutcome(market.oracleQuery);
  market.resolvedOutcome = outcome;
  market.status = 'settled';

  // 2. Find winning bets
  const marketBets = bets[marketId] || [];
  const winners = marketBets.filter(bet => bet.outcome === outcome);

  // 3. For demo, send all UTXO value to the first winner (real logic: split among all winners)
  const utxoList = await getMarketUTXOs(marketId);
  let settlementTxHex = null;
  let broadcastResult = null;
  let payoutAddress = null;

  if (winners.length > 0 && utxoList.length > 0) {
    payoutAddress = winners[0].walletAddress; // For demo, send to first winner
    const fee = 500;
    const privateKey = market.marketPrivateKey;
    settlementTxHex = createBetTransaction(utxoList, payoutAddress, fee, privateKey);
    broadcastResult = await broadcastTransaction(settlementTxHex);
  }

  return {
    outcome,
    winners: winners.map(w => w.walletAddress),
    settlementTxHex,
    broadcastResult,
    message: winners.length > 0
      ? `Market settled. Payout sent to winner(s).`
      : `Market settled. No winners for outcome: ${outcome}`,
  };
}

