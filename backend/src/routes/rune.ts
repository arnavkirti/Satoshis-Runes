import { Router } from 'express'
import { RuneController } from '../controllers/rune.js'

const router = Router()
const runeController = new RuneController()

router.get('/tokens', runeController.getTokens)
router.post('/create', runeController.createToken)
router.post('/send', runeController.sendToken)
router.get('/receive/:address', runeController.receiveToken)

export { router as runeRouter }