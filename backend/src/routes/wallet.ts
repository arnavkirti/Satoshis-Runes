import { Router } from 'express'
import { WalletController } from '../controllers/wallet.js'

const router = Router()
const walletController = new WalletController()

router.post('/connect', walletController.connect)
router.get('/balance', walletController.getBalance)
router.get('/utxos', walletController.getUTXOs)

export { router as walletRouter }