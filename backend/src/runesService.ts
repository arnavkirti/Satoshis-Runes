// File: server/src/runesService.ts
import axios from 'axios';

export async function getRunesData(): Promise<any> {
  // Replace the URL and parameters with those documented by the Runes API.
  const url = 'https://api.run.es/your-endpoint';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error('Error fetching Runes API data:', err);
    throw err;
  }
}
