import { useState } from 'react'
import { request, AddressPurpose, RpcErrorCode } from 'sats-connect'
import Dashboard from './components/Dashboard'

function App() {
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = async () => {
    try {
      const response = await request('wallet_connect', null);
      if(response.status === 'success'){
        const paymentAddressItem = response.result.addresses.find(
          (address) => address.purpose === AddressPurpose.Payment
        );
        // const ordinalsAddressItem = response.result.addresses.find(
        //   (address) => address.purpose === AddressPurpose.Ordinals
        // );
        // const stacksAddressItem = response.result.addresses.find(
        //     (address) => address.purpose === AddressPurpose.Stacks
        // );
        if(paymentAddressItem){
          setWalletAddress(paymentAddressItem.address);
          setIsConnected(true);
        }
      } else {
        if (response.error.code === RpcErrorCode.USER_REJECTION) {
          // handle user cancellation error
          alert('Connection rejected by user');
        } else {
          // handle error
          alert('Failed to connect wallet');
        }
      }
    } catch (err) {
      alert(err);
      console.error('Error connecting wallet:', err)
      alert('Failed to connect wallet');
    }
  }

  const disconnectWallet = async () => {
    const response = await request('wallet_disconnect', null);
    if(response.status ==='success'){
      setWalletAddress('');
      setIsConnected(false);
    } else {
      alert('Failed to disconnect wallet');
    }
  };

  if(isConnected){
    return (
      <Dashboard
        walletAddress={walletAddress}
        onDisconnect={disconnectWallet}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/90 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-500">Satoshi Rune</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-orange-500 transition-colors">Features</a>
            <a href="#markets" className="hover:text-orange-500 transition-colors">Markets</a>
            <a href="#how-it-works" className="hover:text-orange-500 transition-colors">How It Works</a>
            <button 
              onClick={connectWallet}
              className="bg-orange-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors"
            >
              {isConnected ? 
                `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 
                'Connect Xverse'
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            First Prediction Market on Bitcoin
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Bet on real-world events using Runes tokens with instant Lightning settlements
          </p>
          <button 
            onClick={connectWallet}
            className="bg-orange-500 text-black px-8 py-4 rounded-lg text-xl font-bold hover:bg-orange-600 transition-colors"
          >
            {isConnected ? 'Start Predicting' : 'Connect Xverse to Start'}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-orange-500 mb-4">Create Markets</h3>
              <p className="text-gray-300">Launch prediction markets for sports, elections, weather, and more</p>
            </div>
            <div className="bg-gray-700 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-orange-500 mb-4">Secure Escrow</h3>
              <p className="text-gray-300">Multi-signature wallet system ensures fair and transparent betting</p>
            </div>
            <div className="bg-gray-700 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-orange-500 mb-4">Lightning Fast</h3>
              <p className="text-gray-300">Instant settlements via Lightning Network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section id="markets" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Popular Markets</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-orange-500">World Cup 2024</h3>
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">Active</span>
              </div>
              <p className="text-gray-300 mb-6">Predict the winner</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Pool: 1.5 BTC</span>
                <span>Ends in: 45d</span>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-orange-500">US Election</h3>
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">Active</span>
              </div>
              <p className="text-gray-300 mb-6">Presidential race outcome</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Pool: 2.3 BTC</span>
                <span>Ends in: 180d</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Connect Wallet</h3>
              <p className="text-gray-300">Link your Bitcoin wallet to get started</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">Choose Market</h3>
              <p className="text-gray-300">Select from various prediction markets</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">Place Prediction</h3>
              <p className="text-gray-300">Stake your Runes tokens on outcomes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">4</div>
              <h3 className="text-xl font-bold mb-4">Collect Winnings</h3>
              <p className="text-gray-300">Receive instant payouts via Lightning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Varun</h3>
              <p className="text-gray-400">Blockchain Lead</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Arnav Kirti</h3>
              <p className="text-gray-400">Frontend Developer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Mahendra Limanpure</h3>
              <p className="text-gray-400">Smart Contract Expert</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Kammo</h3>
              <p className="text-gray-400">Product Manager</p>
            </div>
          </div>
          <div className="text-center mt-16 text-gray-400">
            <p>© 2025 Satoshi Rune. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
