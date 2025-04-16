// File: server/src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import { createMarket, listMarkets, placeBet, settleMarket } from './marketController.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Endpoints for managing markets
app.get('/api/markets', async (_req, res) => {
  const markets = await listMarkets();
  res.json(markets);
});

app.post('/api/markets', async (req, res) => {
  // Create a new market
  try {
    const { description, outcomes } = req.body;
    const newMarket = await createMarket(description, outcomes);
    res.status(201).json(newMarket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating market' });
  }
});

app.post('/api/markets/:marketId/bet', async (req, res) => {
  // Place a bet on a market. Expect wallet tx details etc.
  try {
    const { marketId } = req.params;
    const { outcome, amount, walletAddress } = req.body;
    const betResult = await placeBet(marketId, outcome, amount, walletAddress);
    res.status(200).json(betResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error placing bet' });
  }
});

// Endpoint to settle a market (called automatically after oracle finalizes an outcome)
app.post('/api/markets/:marketId/settle', async (req, res) => {
  try {
    const { marketId } = req.params;
    const settlementResult = await settleMarket(marketId);
    res.status(200).json(settlementResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error settling market' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
