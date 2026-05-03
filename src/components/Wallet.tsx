import { Crypto } from '../App';

interface WalletProps {
  cryptos: Crypto[];
  totalBalance: number;
}

export function Wallet({ cryptos, totalBalance }: WalletProps) {
  return (
    <div className="space-y-6">
      {/* Total Balance Card */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl shadow-purple-500/30">
        <p className="text-purple-100 text-sm font-medium mb-2">Total Portfolio Value</p>
        <h2 className="text-5xl font-bold text-white mb-4">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
        <div className="flex items-center gap-2 text-green-300">
          <span className="text-2xl">📈</span>
          <span className="font-medium">+12.5% this week</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-xl p-4 transition-all hover:scale-105">
          <span className="text-3xl mb-2 block">📤</span>
          <span className="text-white font-medium">Send</span>
        </button>
        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-xl p-4 transition-all hover:scale-105">
          <span className="text-3xl mb-2 block">📥</span>
          <span className="text-white font-medium">Receive</span>
        </button>
        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-xl p-4 transition-all hover:scale-105">
          <span className="text-3xl mb-2 block">🔄</span>
          <span className="text-white font-medium">Swap</span>
        </button>
      </div>

      {/* Crypto List */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Your Assets</h3>
          <p className="text-white/60 text-sm mt-1">{cryptos.filter(c => c.amount > 0).length} активных криптовалют</p>
        </div>
        <div className="divide-y divide-white/10">
          {cryptos.filter(c => c.amount > 0).map((crypto) => {
            const value = crypto.amount * crypto.price;
            const percentage = (value / totalBalance) * 100;

            return (
              <div
                key={crypto.id}
                className="p-6 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${crypto.color} rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg`}>
                      {crypto.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{crypto.name}</h4>
                      <p className="text-white/60 text-sm">{crypto.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-xl">
                      ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-white/60 text-sm">
                      {crypto.amount.toLocaleString()} {crypto.symbol}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-white/60">
                    ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per {crypto.symbol}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${crypto.color} transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-white/60 font-medium w-12 text-right">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-green-400 text-xl">📥</span>
              </div>
              <div>
                <p className="text-white font-medium">Received SOL</p>
                <p className="text-white/60 text-sm">2 hours ago</p>
              </div>
            </div>
            <p className="text-green-400 font-bold">+5 SOL</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <span className="text-red-400 text-xl">📤</span>
              </div>
              <div>
                <p className="text-white font-medium">Sent BTC</p>
                <p className="text-white/60 text-sm">1 day ago</p>
              </div>
            </div>
            <p className="text-red-400 font-bold">-0.1 BTC</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-xl">🔄</span>
              </div>
              <div>
                <p className="text-white font-medium">Swapped ETH → TON</p>
                <p className="text-white/60 text-sm">3 days ago</p>
              </div>
            </div>
            <p className="text-white/60 font-medium">1 ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
}
