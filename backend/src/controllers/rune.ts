import { Request, Response } from 'express'
import { RuneService } from '../services/rune'

export class RuneController {
  private runeService: RuneService

  constructor() {
    this.runeService = new RuneService()
  }

  getTokens = async (req: Request, res: Response) => {
    try {
      const tokens = await this.runeService.getTokens()
      res.json({ tokens })
    } catch (error) {
      res.status(500).json({ error: 'Failed to get tokens' })
    }
  }

  createToken = async (req: Request, res: Response) => {
    try {
      const { name, supply } = req.body
      const token = await this.runeService.createToken(name, supply)
      res.json(token)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create token' })
    }
  }

  sendToken = async (req: Request, res: Response) => {
    try {
      const { tokenId, amount, recipient } = req.body
      const tx = await this.runeService.sendToken(tokenId, amount, recipient)
      res.json(tx)
    } catch (error) {
      res.status(500).json({ error: 'Failed to send token' })
    }
  }

  receiveToken = async (req: Request, res: Response) => {
    try {
      const { address } = req.params
      const token = await this.runeService.receiveToken(address)
      res.json(token)
    } catch (error) {
      res.status(500).json({ error: 'Failed to receive token' })
    }
  }
}