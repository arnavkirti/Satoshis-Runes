interface DashboardProps {
  walletAddress: string;
  onDisconnect: () => void;
}

function Dashboard({ walletAddress, onDisconnect }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed w-full bg-gray-900/90 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-500">Satoshi Rune</div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">
              {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
            </span>
            <button 
              onClick={onDisconnect}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Disconnect
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-24">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg text-gray-400">Your Balance</h3>
            <p className="text-2xl font-bold">1.5 BTC</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg text-gray-400">Active Predictions</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg text-gray-400">Total Winnings</h3>
            <p className="text-2xl font-bold">0.5 BTC</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Your Active Predictions</h2>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-orange-500">World Cup 2024</h3>
                  <span className="bg-orange-500/20 text-orange-500 px-2 py-1 rounded-full text-sm">
                    0.5 BTC
                  </span>
                </div>
                <p className="text-sm text-gray-400">Prediction: Brazil to win</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-orange-500">US Election</h3>
                  <span className="bg-orange-500/20 text-orange-500 px-2 py-1 rounded-full text-sm">
                    1.0 BTC
                  </span>
                </div>
                <p className="text-sm text-gray-400">Prediction: Democrat Victory</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Available Markets</h2>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-orange-500">Olympics 2024</h3>
                  <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-sm">
                    Open
                  </span>
                </div>
                <p className="text-sm text-gray-400">Total Pool: 5.0 BTC</p>
                <button className="mt-2 bg-orange-500 text-black px-4 py-2 rounded-lg text-sm">
                  Place Prediction
                </button>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-orange-500">Bitcoin Price Q2</h3>
                  <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-sm">
                    Open
                  </span>
                </div>
                <p className="text-sm text-gray-400">Total Pool: 3.2 BTC</p>
                <button className="mt-2 bg-orange-500 text-black px-4 py-2 rounded-lg text-sm">
                  Place Prediction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;