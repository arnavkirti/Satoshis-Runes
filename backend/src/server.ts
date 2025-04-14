import express from 'express'
import cors from 'cors'
import { runeRouter } from './routes/rune.js'
import { walletRouter } from './routes/wallet.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/rune', runeRouter)
app.use('/api/wallet', walletRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})