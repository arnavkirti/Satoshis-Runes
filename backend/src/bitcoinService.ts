// File: server/src/bitcoinService.ts
import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
const ECPair = ECPairFactory(ecc);

// Using the Bitcoin testnet for development
const network = bitcoin.networks.testnet;

/**
 * Create a Taproot output script using a simplified builder.
 * In a full implementation, you would construct a full script path to handle the DLC.
 */
export function createTaprootOutput(internalPubKeyHex: string): bitcoin.payments.Payment {
  const internalPubkey = Buffer.from(internalPubKeyHex, 'hex');
  // For Taproot, output is constructed from the tweaked key.
  // (Additional tweaking based on your spending conditions may be required.)
  const { address, output } = bitcoin.payments.p2tr({ internalPubkey, network });
  return { address, output };
}

/**
 * Create a new Bitcoin transaction (example for placing a bet).
 */
export function createBetTransaction(
  utxos: Array<{ txid: string; vout: number; value: number; scriptPubKey: string }>,
  destinationAddress: string,
  fee: number,
  privateKeyHex: string
): string /* raw tx hex */ {
  // For simplicity we assume one input and one output
  const psbt = new bitcoin.Psbt({ network });
  let totalInput = 0;

  utxos.forEach((utxo) => {
    totalInput += utxo.value;
    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      witnessUtxo: {
        script: Buffer.from(utxo.scriptPubKey, 'hex'), // <-- Use actual scriptPubKey
        value: utxo.value
      }
    });
  });

  // Calculate change
  const sendAmount = totalInput - fee;

  if (sendAmount <= 0) {
    throw new Error('Insufficient funds for fee');
  }

  psbt.addOutput({
    address: destinationAddress,
    value: sendAmount
  });

  // Sign each input
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKeyHex, 'hex'));
  utxos.forEach((_, index) => {
    psbt.signInput(index, keyPair);
  });

  psbt.finalizeAllInputs();
  return psbt.extractTransaction().toHex();
}

// File: server/src/bitcoinService.ts (continued)
import axios from 'axios';

export async function broadcastTransaction(txHex: string): Promise<any> {
  // Replace the endpoint below with your Bitcoin node API or third-party service endpoint.
  const url = 'https://api.testnet.blockchain.info/pushtx';
  try {
    const response = await axios.post(url, { tx: txHex });
    return response.data;
  } catch (err) {
    console.error('Error broadcasting transaction:', err);
    throw err;
  }
}
