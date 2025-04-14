import { Request, Response } from 'express'
import { WalletService } from '../services/wallet'

export class WalletController {
  private walletService: WalletService

  constructor() {
    this.walletService = new WalletService()
  }

  connect = async (req: Request, res: Response) => {
    try {
      const wallet = await this.walletService.connect()
      res.json(wallet)
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect wallet' })
    }
  }

  getBalance = async (req: Request, res: Response) => {
    try {
      const balance = await this.walletService.getBalance()
      res.json({ balance })
    } catch (error) {
      res.status(500).json({ error: 'Failed to get balance' })
    }
  }

  getUTXOs = async (req: Request, res: Response) => {
    try {
      const utxos = await this.walletService.getUTXOs()
      res.json({ utxos })
    } catch (error) {
      res.status(500).json({ error: 'Failed to get UTXOs' })
    }
  }
}