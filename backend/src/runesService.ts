import runelib, { Etching, EtchInscription, Range, Rune, Terms, Edict } from 'runelib'; // Added Edict
import { ECPairFactory, ECPairInterface, Signer, SignerAsync } from 'ecpair'; // Added ECPairInterface, Signer, SignerAsync
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { Runestone, RuneId, none, some } from 'runelib';
import { payments, Psbt, Address, networks, script, Taptree } from 'bitcoinjs-lib';
import { tweakSigner } from 'bitcoinjs-lib/src/psbt/bip371'; // Added tweakSigner

// Example: Initialize runelib for testnet (adjust as needed)
const rune = runelib({ network: 'testnet' });

// List all runes for an address
export async function listRunes(address: string): Promise<any> {
  try {
    const runes = await rune.list(address);
    return runes;
  } catch (err) {
    console.error('Error listing Runes:', err);
    throw err;
  }
}

// Mint a new Rune (token)
export async function mintRune(options: {
  ticker: string;
  amount: number;
  toAddress: string;
  fromWIF: string; // WIF format private key
}): Promise<any> {
  try {
    const tx = await rune.mint({
      ticker: options.ticker,
      amount: options.amount,
      to: options.toAddress,
      wif: options.fromWIF,
    });
    return tx;
  } catch (err) {
    console.error('Error minting Rune:', err);
    throw err;
  }
}

// Send Rune tokens
export async function sendRune(options: {
  ticker: string;
  amount: number;
  toAddress: string;
  fromWIF: string;
}): Promise<any> {
  try {
    const tx = await rune.send({
      ticker: options.ticker,
      amount: options.amount,
      to: options.toAddress,
      wif: options.fromWIF,
    });
    return tx;
  } catch (err) {
    console.error('Error sending Rune:', err);
    throw err;
  }
}

// Get Rune balance for an address
export async function getRuneBalance(address: string, ticker: string): Promise<number> {
  try {
    const balance = await rune.balance(address, ticker);
    return balance;
  } catch (err) {
    console.error('Error fetching Rune balance:', err);
    throw err;
  }
}

// Helper to wait for UTXO (stub, replace with real implementation)
async function waitUntilUTXO(address: string): Promise<Array<{ txid: string, vout: number, value: number }>> {
  // TODO: Replace with real UTXO fetching logic (e.g., from a block explorer API)
  console.log(`Fetching UTXOs for address: ${address}`); // Added log
  throw new Error('waitUntilUTXO not implemented');
}

// Helper to sign and send the transaction (stub, replace with real implementation)
async function signAndSend(signer: Signer | SignerAsync, psbt: Psbt, address: string): Promise<any> { // Changed keyPair to signer
  // TODO: Implement signing (using the signer) and broadcasting logic
  console.log(`Signing and sending PSBT for address: ${address}`); // Added log
  psbt.signAllInputs(signer); // Example signing, adjust as needed
  psbt.finalizeAllInputs();
  const txHex = psbt.extractTransaction().toHex();
  console.log('Transaction Hex:', txHex);
  // TODO: Broadcast txHex
  throw new Error('signAndSend broadcasting not implemented');
}

// Advanced minting function using low-level primitives
export async function mintRuneAdvanced({
  wif,
  runeIdBlock,
  runeIdTx,
  ordAddress,
  changeAddress,
  networkType = 'testnet'
}: {
  wif: string,
  runeIdBlock: number,
  runeIdTx: number,
  ordAddress: string,
  changeAddress: string,
  networkType?: 'mainnet' | 'testnet'
}) {
  const network = networkType === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
  const ECPair = ECPairFactory(ecc);

  const mintstone = new Runestone([], none(), some(new RuneId(runeIdBlock, runeIdTx)), some(1));

  const keyPair = ECPair.fromWIF(wif, network);

  const { address } = payments.p2wpkh({ pubkey: keyPair.publicKey, network });

  if (!address) throw new Error('Failed to derive address from WIF');

  const utxos = await waitUntilUTXO(address);
  if (!utxos || utxos.length === 0) throw new Error('No UTXOs found for address');

  const psbt = new Psbt({ network });
  psbt.addInput({
    hash: utxos[0].txid,
    index: utxos[0].vout,
    witnessUtxo: { value: utxos[0].value, script: Address.toOutputScript(address, network) },
  });

  psbt.addOutput({
    script: mintstone.encipher(),
    value: 0
  });

  psbt.addOutput({
    address: ordAddress,
    value: 546
  });

  const fee = 5000;
  const change = utxos[0].value - fee - 546;

  if (change < 0) throw new Error('Insufficient funds for fee and output');

  psbt.addOutput({
    address: changeAddress,
    value: change
  });

  // Sign and send the transaction (implement signAndSend for your environment)
  return await signAndSend(keyPair, psbt, address);
}

// Advanced etching function using low-level primitives
export async function etchRuneAdvanced({
  wif,
  runeName,
  termsAmount,
  termsCap,
  symbol,
  inscriptionContent,
  ordAddress,
  changeAddress,
  networkType = 'testnet'
}: {
  wif: string,
  runeName: string,
  termsAmount: number,
  termsCap: number,
  symbol: string,
  inscriptionContent: string, // Content for the inscription
  ordAddress: string,
  changeAddress: string,
  networkType?: 'mainnet' | 'testnet'
}) {
  const network = networkType === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
  const ECPair = ECPairFactory(ecc);
  const toXOnly = (pubKey: Buffer) => pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);

  const keyPair = ECPair.fromWIF(wif, network);
  const internalPubkey = toXOnly(keyPair.publicKey);

  // 1. Prepare Inscription
  const ins = new EtchInscription();
  ins.setContent("text/plain", Buffer.from(inscriptionContent, 'utf-8'));
  ins.setRune(runeName);

  // 2. Prepare Tapscript
  const etchingScriptAsm = `${internalPubkey.toString("hex")} OP_CHECKSIG`;
  const etchingScript = Buffer.concat([script.fromASM(etchingScriptAsm), ins.encipher()]);

  const scriptTree: Taptree = { output: etchingScript };

  const scriptP2tr = payments.p2tr({
    internalPubkey: internalPubkey,
    scriptTree,
    network,
  });

  const etchingRedeem = {
    output: etchingScript,
    redeemVersion: 192, // Tapscript version
  };

  const etchingP2tr = payments.p2tr({
    internalPubkey: internalPubkey,
    scriptTree,
    redeem: etchingRedeem,
    network,
  });

  const fundingAddress = scriptP2tr.address ?? "";
  if (!fundingAddress) throw new Error('Failed to derive funding address');

  // 3. Wait for funding UTXO
  const utxos = await waitUntilUTXO(fundingAddress);
  if (!utxos || utxos.length === 0) throw new Error(`No UTXOs found for funding address: ${fundingAddress}`);
  // Ensure UTXO has enough confirmations if needed

  // 4. Build PSBT
  const psbt = new Psbt({ network });
  psbt.addInput({
    hash: utxos[0].txid,
    index: utxos[0].vout,
    witnessUtxo: { value: utxos[0].value, script: scriptP2tr.output! },
    tapLeafScript: [
      {
        leafVersion: etchingRedeem.redeemVersion,
        script: etchingRedeem.output,
        controlBlock: etchingP2tr.witness![etchingP2tr.witness!.length - 1],
      },
    ],
  });

  // 5. Define Etching parameters
  const rune = Rune.fromName(runeName);
  const terms = new Terms(termsAmount, termsCap, new Range(none(), none()), new Range(none(), none()));
  const etching = new Etching(none(), none(), some(rune), none(), some(symbol), some(terms), true); // Turbo etching enabled

  // 6. Create Runestone
  const stone = new Runestone([], some(etching), none(), none());

  // 7. Add Outputs
  psbt.addOutput({
    script: stone.encipher(),
    value: 0, // OP_RETURN output
  });

  psbt.addOutput({
    address: ordAddress,
    value: 546, // Dust for ordinals
  });

  const fee = 5000; // Example fee
  const change = utxos[0].value - 546 - fee;
  if (change < 0) throw new Error('Insufficient funds for fee and outputs');

  psbt.addOutput({
    address: changeAddress,
    value: change,
  });

  // 8. Sign and Broadcast
  return await signAndSend(keyPair, psbt, fundingAddress);
}

// Advanced transfer function using low-level primitives
export async function transferRuneAdvanced({
  wif,
  runeIdBlock,
  runeIdTx,
  transferAmount,
  receiverOrdAddress,
  changeOrdAddress,
  changeAddress,
  networkType = 'testnet'
}: {
  wif: string,
  runeIdBlock: number,
  runeIdTx: number,
  transferAmount: bigint, // Use bigint for rune amounts
  receiverOrdAddress: string,
  changeOrdAddress: string,
  changeAddress: string,
  networkType?: 'mainnet' | 'testnet'
}) {
  const network = networkType === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
  const ECPair = ECPairFactory(ecc);
  const toXOnly = (pubKey: Buffer) => pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);

  const keyPair = ECPair.fromWIF(wif, network);

  // 1. Tweak signer and generate P2TR address
  const tweakedSigner = tweakSigner(keyPair, { network });
  const p2pktr = payments.p2tr({
    pubkey: toXOnly(tweakedSigner.publicKey),
    network
  });
  const sendingAddress = p2pktr.address ?? "";
  if (!sendingAddress) throw new Error('Failed to derive sending address');

  // 2. Wait for UTXOs at the sending address
  const utxos = await waitUntilUTXO(sendingAddress);
  if (!utxos || utxos.length === 0) throw new Error(`No UTXOs found for sending address: ${sendingAddress}`);

  // 3. Build PSBT and add inputs
  const psbt = new Psbt({ network });
  let totalInputValue = 0;
  for (const utxo of utxos) {
    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      witnessUtxo: { value: utxo.value, script: p2pktr.output! },
      tapInternalKey: toXOnly(keyPair.publicKey) // Use the original internal key
    });
    totalInputValue += utxo.value;
  }

  // 4. Create Edict for the transfer
  // Output index 1 will receive the runes
  const edict = new Edict(new RuneId(runeIdBlock, runeIdTx), transferAmount, 1);

  // 5. Create Runestone
  // Output index 2 will receive the change runes
  const stone = new Runestone([edict], none(), none(), some(2));

  // 6. Add Outputs
  // OP_RETURN output for Runestone
  psbt.addOutput({
    script: stone.encipher(),
    value: 0
  });

  // Output 1: Receiver's Ordinals dust address
  psbt.addOutput({
    address: receiverOrdAddress,
    value: 546
  });

  // Output 2: Sender's change Ordinals dust address
  psbt.addOutput({
    address: changeOrdAddress,
    value: 546
  });

  // Output 3: BTC Change address
  const fee = 6000; // Example fee
  const dustTotal = 546 * 2;
  const change = totalInputValue - dustTotal - fee;
  if (change < 0) throw new Error('Insufficient funds for fee and outputs');

  psbt.addOutput({
    address: changeAddress,
    value: change
  });

  // 7. Sign and Broadcast using the tweaked signer
  return await signAndSend(tweakedSigner, psbt, sendingAddress);
}
