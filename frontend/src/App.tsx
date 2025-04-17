import { useState } from 'react';
import { request, AddressPurpose, RpcErrorCode } from 'sats-connect';
import Dashboard from './components/Dashboard';
import Squares from './bits/Squares/Squares';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const connectWallet = async () => {
    try {
      const response = await request('wallet_connect', null);
      if (response.status === 'success') {
        const paymentAddressItem = response.result.addresses.find(
          (address) => address.purpose === AddressPurpose.Payment
        );
        if (paymentAddressItem) {
          setWalletAddress(paymentAddressItem.address);
          setIsConnected(true);
        }
      } else {
        if (response.error.code === RpcErrorCode.USER_REJECTION) {
          alert('Connection rejected by user');
        } else {
          alert('Failed to connect wallet');
        }
      }
    } catch (err) {
      console.error('Error connecting wallet:', err);
      alert('Failed to connect wallet');
    }
  };

  const disconnectWallet = async () => {
    const response = await request('wallet_disconnect', null);
    if (response.status === 'success') {
      setWalletAddress('');
      setIsConnected(false);
    } else {
      alert('Failed to disconnect wallet');
    }
  };

  if (isConnected) {
    return <Dashboard walletAddress={walletAddress} onDisconnect={disconnectWallet} />;
  }

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* Background Squares */}
      <div className="fixed inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(249, 115, 22, 0.15)"
          squareSize={50}
          hoverFillColor="rgba(249, 115, 22, 0.1)"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed w-full bg-gray-950/90 backdrop-blur-md z-50 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                  Satoshi Rune
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
                  Features
                </a>
                <a href="#markets" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
                  Markets
                </a>
                <a href="#how-it-works" className="text-gray-300 hover:text-orange-500 transition-colors font-medium">
                  How It Works
                </a>
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-gray-950 px-6 py-2 rounded-lg font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/20"
                >
                  Connect Xverse
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-orange-500 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="#features"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800"
                >
                  Features
                </a>
                <a
                  href="#markets"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800"
                >
                  Markets
                </a>
                <a
                  href="#how-it-works"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-orange-500 hover:bg-gray-800"
                >
                  How It Works
                </a>
                <button
                  onClick={connectWallet}
                  className="w-full mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-gray-950 px-6 py-3 rounded-lg font-bold hover:from-orange-600 hover:to-amber-600 transition-all"
                >
                  Connect Xverse
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-40 pb-28 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400 leading-tight">
              Decentralized Prediction Markets
              <br />
              <span className="text-white">Powered by Bitcoin Runes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Bet on real-world events with Runes tokens. Transparent, trustless markets with instant Lightning settlements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-gray-950 px-8 py-4 rounded-xl text-xl font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/20"
              >
                Start Predicting Now
              </button>
              <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl text-xl font-bold hover:bg-orange-500/10 transition-colors">
                Explore Markets
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-orange-500 font-semibold">WHY CHOOSE US</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">Revolutionary Prediction Markets</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  ),
                  title: "Create Markets",
                  description: "Launch prediction markets for sports, elections, weather, and more with just a few clicks."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: "Secure Escrow",
                  description: "Multi-signature wallet system ensures fair and transparent betting with no middlemen."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Lightning Fast",
                  description: "Instant settlements via Lightning Network with minimal fees and maximum speed."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-800/60 p-8 rounded-xl hover:bg-gray-800 transition-all border border-gray-700 hover:border-orange-500/30">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-lg mb-6 flex items-center justify-center text-orange-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Markets Section */}
        <section id="markets" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-orange-500 font-semibold">TRADE NOW</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">Active Prediction Markets</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "World Cup 2024",
                  status: "Active",
                  description: "Predict the tournament winner",
                  pool: "1.5 BTC",
                  endsIn: "45d"
                },
                {
                  title: "US Election",
                  status: "Active",
                  description: "Presidential race outcome",
                  pool: "2.3 BTC",
                  endsIn: "180d"
                },
                {
                  title: "Bitcoin Price",
                  status: "Active",
                  description: "Will BTC hit $100K by EOY?",
                  pool: "3.1 BTC",
                  endsIn: "90d"
                }
              ].map((market, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">{market.title}</h3>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-xs font-medium text-orange-400">{market.status}</span>
                  </div>
                  <p className="text-gray-300 mb-6">{market.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div>
                      <p className="text-xs text-gray-400">Total Pool</p>
                      <p className="font-medium">{market.pool}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Ends in</p>
                      <p className="font-medium">{market.endsIn}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-xl font-bold hover:bg-orange-500/10 transition-colors">
                View All Markets
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-orange-500 font-semibold">GET STARTED</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">How It Works</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Connect Wallet",
                  description: "Link your Bitcoin wallet to get started"
                },
                {
                  step: "2",
                  title: "Choose Market",
                  description: "Select from various prediction markets"
                },
                {
                  step: "3",
                  title: "Place Prediction",
                  description: "Stake your Runes tokens on outcomes"
                },
                {
                  step: "4",
                  title: "Collect Winnings",
                  description: "Receive instant payouts via Lightning"
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-orange-500/20">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-orange-600/20 to-amber-600/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Predicting?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the first Bitcoin-native prediction market platform today.
            </p>
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-gray-950 px-8 py-4 rounded-xl text-xl font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/20"
            >
              Connect Wallet & Get Started
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-950 border-t border-gray-800 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent mb-4">
                  Satoshi Rune
                </h3>
                <p className="text-gray-400">
                  The first decentralized prediction market platform powered by Bitcoin Runes.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-400 hover:text-orange-500 transition-colors">Features</a></li>
                  <li><a href="#markets" className="text-gray-400 hover:text-orange-500 transition-colors">Markets</a></li>
                  <li><a href="#how-it-works" className="text-gray-400 hover:text-orange-500 transition-colors">How It Works</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">GitHub</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Team</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
              <p>© 2025 Satoshi Rune. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;