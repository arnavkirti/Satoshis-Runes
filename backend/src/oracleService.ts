// File: server/src/oracleService.ts
import axios from 'axios';

export async function getOracleOutcome(query: string): Promise<string> {
  // Replace with the actual endpoint and parameters for Reality.eth
  const url = `https://api.reality.eth/outcome?query=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url);
    // Assume the oracle returns { outcome: "WIN" } for example
    return response.data.outcome;
  } catch (err) {
    console.error('Error getting oracle outcome:', err);
    throw err;
  }
}
