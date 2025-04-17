import Squares from '../bits/Squares/Squares';

interface DashboardProps {
  walletAddress: string;
  onDisconnect: () => void;
}

function Dashboard({ walletAddress, onDisconnect }: DashboardProps) {
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
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-6">
                  <span className="text-gray-300 font-medium">
                    {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                  </span>
                  <button
                    onClick={onDisconnect}
                    className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-800/50 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg text-gray-400 mb-2">Your Balance</h3>
                  <p className="text-3xl font-bold">1.5 BTC</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg text-gray-400 mb-2">Active Predictions</h3>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg text-gray-400 mb-2">Total Winnings</h3>
                  <p className="text-3xl font-bold">0.5 BTC</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg text-gray-400 mb-2">RUNES Volume (24h)</h3>
                  <p className="text-3xl font-bold">12.8 BTC</p>
                  <div className="flex items-center mt-2">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                    </svg>
                    <span className="text-green-400 ml-1 text-sm">+8.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Column 1: Active Predictions + Oracle */}
            <div className="space-y-6">
              <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Active Predictions</h2>
                  <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "World Cup 2024",
                      amount: "0.5 BTC",
                      prediction: "Brazil to win",
                      status: "active"
                    },
                    {
                      title: "US Election",
                      amount: "1.0 BTC",
                      prediction: "Democrat Victory",
                      status: "active"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 hover:border-orange-500/30 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-orange-500 group-hover:text-orange-400 transition-colors">
                          {item.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-600 text-gray-300'
                        }`}>
                          {item.status === 'active' ? 'Active' : 'Closed'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{item.prediction}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Staked: <span className="font-medium">{item.amount}</span></span>
                        <button className="text-orange-500 hover:text-orange-400 text-xs font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Oracle Resolution Panel */}
                <div className="mt-6 bg-gray-800/80 p-4 rounded-lg border border-amber-500/30">
                  <h3 className="text-lg font-bold text-amber-400 mb-2">Oracle Resolution</h3>
                  <p className="text-sm text-gray-300 mb-3">Markets ready for settlement:</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white">{"Bitcoin Halving Price > $75K"}</span>
                      <button className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded hover:bg-amber-500/30">
                        Resolve
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">"Ethereum ETF Approval"</span>
                      <button className="text-xs bg-gray-600 text-gray-300 px-3 py-1 rounded" disabled>
                        Pending
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Market Creation + Analytics */}
            <div className="space-y-6">
              {/* Market Creation */}
              <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Create New Prediction Market
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Event Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="e.g., 'Bitcoin Halving Price Prediction'"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">End Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Entry Fee (RUNES)</label>
                      <input 
                        type="number" 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                        placeholder="0.001"
                      />
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-gray-950 py-3 rounded-lg font-bold hover:from-orange-600 hover:to-amber-600 transition-all">
                    Deploy Market Contract
                  </button>
                </div>
              </div>

              {/* Additional Analytics */}
              <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4">Your Prediction History</h2>
                <div className="h-40 flex items-center justify-center text-gray-400">
                  <p>Win/Loss chart visualization</p>
                </div>
              </div>
            </div>

            {/* Column 3: Live Trading Feed */}
            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 backdrop-blur-sm h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                Live Trading Activity
              </h2>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {[
                  { user: "0x7f3...1a4", action: "Staked 0.1 RUNES", market: "US Election", time: "2 min ago" },
                  { user: "0x9e2...8b5", action: "Created Market", market: "BTC Q4 Price", time: "5 min ago" },
                  { user: "0x4c6...3d9", action: "Claimed 0.5 RUNES", market: "World Cup", time: "12 min ago" },
                  { user: "0x2a8...7f1", action: "Staked 0.3 RUNES", market: "Olympics 2024", time: "18 min ago" },
                  { user: "0x5b3...9e2", action: "Withdrew 1.2 RUNES", market: "Ethereum ETF", time: "25 min ago" }
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-gray-700/30 rounded-lg border-l-2 border-orange-500/50">
                    <div className="flex justify-between text-sm">
                      <span className="font-mono text-orange-400">{item.user}</span>
                      <span className="text-gray-400">{item.time}</span>
                    </div>
                    <p className="text-white mt-1">{item.action} on <span className="text-amber-400">{item.market}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;