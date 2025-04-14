import { useState } from 'react'

function App() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletBalance, setWalletBalance] = useState(0)
  const [runeTokens, setRuneTokens] = useState([] as { id: string, name: string, balance: number }[])
  
  const connectWallet = async () => {
    setWalletConnected(true)
    setWalletBalance(0.05)
    setRuneTokens([
      { id: 'rune1', name: 'SatoshiToken', balance: 100 },
      { id: 'rune2', name: 'RuneCoin', balance: 50 }
    ])
  }

  return (
    <div className="max-w-6xl mx-auto p-8 text-center">
      <div className="flex flex-col min-h-[80vh] bg-gray-50 rounded-xl shadow-lg p-8">
        <header className="mb-8">
          <h1 className="text-5xl font-bold">Satoshi-Rune Wallet</h1>
          <p className="text-gray-600 mt-2">Manage your Runes-based tokens on Bitcoin</p>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center">
          {!walletConnected ? (
            <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-lg shadow-sm w-full max-w-lg">
              <p>Connect your wallet to manage your Runes tokens</p>
              <button 
                className="bg-[#f7931a] hover:bg-[#e78008] text-white font-semibold py-3 px-6 rounded-md transition-colors"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Wallet Balance</h2>
                <p className="text-4xl font-bold text-[#f7931a] my-4">{walletBalance} BTC</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Your Rune Tokens</h2>
                {runeTokens.length > 0 ? (
                  <ul className="mt-4 divide-y divide-gray-100">
                    {runeTokens.map(token => (
                      <li key={token.id} className="flex justify-between py-4">
                        <span className="font-semibold">{token.name}</span>
                        <span className="font-bold text-[#f7931a]">{token.balance}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4">No Rune tokens found in your wallet</p>
                )}
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm flex justify-center gap-4 flex-wrap">
                <button className="border border-gray-200 hover:bg-[#f7931a] hover:text-white hover:border-[#f7931a] text-gray-800 font-semibold py-3 px-6 rounded-md transition-all">
                  Send Tokens
                </button>
                <button className="border border-gray-200 hover:bg-[#f7931a] hover:text-white hover:border-[#f7931a] text-gray-800 font-semibold py-3 px-6 rounded-md transition-all">
                  Receive Tokens
                </button>
                <button className="border border-gray-200 hover:bg-[#f7931a] hover:text-white hover:border-[#f7931a] text-gray-800 font-semibold py-3 px-6 rounded-md transition-all">
                  Create New Token
                </button>
              </div>
            </div>
          )}
        </main>
        
        <footer className="mt-8 text-gray-600 text-sm">
          <p>Satoshi-Rune: Decentralized Runes Token Wallet</p>
        </footer>
      </div>
    </div>
  )
}

export default App
