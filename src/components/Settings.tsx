import { useState } from 'react';
import { Crypto } from '../App';

interface SettingsProps {
  cryptos: Crypto[];
  updateCrypto: (id: string, amount: number, price: number) => void;
  isAdmin?: boolean;
}

export function Settings({ cryptos, updateCrypto, isAdmin = true }: SettingsProps) {
  const [editingCrypto, setEditingCrypto] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<{ amount: string; price: string }>({ amount: '', price: '' });

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center">
          <div className="text-8xl mb-4">🔒</div>
          <h3 className="text-3xl font-bold text-white mb-4">Доступ ограничен</h3>
          <p className="text-white/60 text-lg">
            Настройки криптовалюты доступны только для администраторов
          </p>
        </div>
      </div>
    );
  }

  const handleEdit = (crypto: Crypto) => {
    setEditingCrypto(crypto.id);
    setTempValues({
      amount: crypto.amount.toString(),
      price: crypto.price.toString(),
    });
  };

  const handleSave = (id: string) => {
    const amount = parseFloat(tempValues.amount);
    const price = parseFloat(tempValues.price);

    if (!isNaN(amount) && !isNaN(price) && amount >= 0 && price >= 0) {
      updateCrypto(id, amount, price);
      setEditingCrypto(null);
    }
  };

  const handleCancel = () => {
    setEditingCrypto(null);
    setTempValues({ amount: '', price: '' });
  };

  const resetToDefaults = () => {
    if (confirm('Reset all values to defaults?')) {
      const defaults = [
        { id: '1', amount: 0.5, price: 65000 },
        { id: '2', amount: 2.5, price: 3500 },
        { id: '3', amount: 10, price: 150 },
        { id: '4', amount: 500, price: 5.5 },
        { id: '5', amount: 1000, price: 0.65 },
        { id: '6', amount: 500, price: 0.55 },
        { id: '7', amount: 100, price: 8.5 },
        { id: '8', amount: 5000, price: 0.15 },
      ];
      defaults.forEach(def => {
        updateCrypto(def.id, def.amount, def.price);
      });
    }
  };

  const clearAll = () => {
    if (confirm('Set all amounts to zero?')) {
      cryptos.forEach(crypto => {
        updateCrypto(crypto.id, 0, crypto.price);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-2">⚙️ Wallet Settings</h2>
        <p className="text-white/60">
          Adjust your cryptocurrency amounts and prices. Changes are saved automatically.
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all"
          >
            🔄 Reset to Defaults
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
          >
            🗑️ Clear All Amounts
          </button>
        </div>
      </div>

      {/* Crypto Settings */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Manage Cryptocurrencies</h3>
          <p className="text-white/60 text-sm mt-1">Click "Edit" to modify amounts and prices</p>
        </div>
        <div className="divide-y divide-white/10">
          {cryptos.map((crypto) => {
            const isEditing = editingCrypto === crypto.id;
            const value = crypto.amount * crypto.price;

            return (
              <div key={crypto.id} className="p-6 hover:bg-white/5 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${crypto.color} rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg flex-shrink-0`}>
                      {crypto.icon}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-white font-bold text-lg">{crypto.name}</h4>
                      <p className="text-white/60 text-sm">{crypto.symbol}</p>
                    </div>
                  </div>

                  {!isEditing && (
                    <div className="text-right">
                      <p className="text-white font-bold text-xl">
                        ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-white/60 text-sm">
                        {crypto.amount.toLocaleString()} {crypto.symbol}
                      </p>
                      <p className="text-white/40 text-xs mt-1">
                        @ ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="mt-4 space-y-4 bg-white/5 p-4 rounded-xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Amount ({crypto.symbol})
                        </label>
                        <input
                          type="number"
                          step="any"
                          min="0"
                          value={tempValues.amount}
                          onChange={(e) => setTempValues(prev => ({ ...prev, amount: e.target.value }))}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Price (USD)
                        </label>
                        <input
                          type="number"
                          step="any"
                          min="0"
                          value={tempValues.price}
                          onChange={(e) => setTempValues(prev => ({ ...prev, price: e.target.value }))}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(crypto.id)}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
                      >
                        ✓ Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
                      >
                        ✕ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <button
                      onClick={() => handleEdit(crypto)}
                      className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all"
                    >
                      ✏️ Edit Values
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-2">ℹ️ Information</h3>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>All values are stored in your browser's local storage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>This is a demo wallet - no real cryptocurrency is involved</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>You can set any amount and price for each cryptocurrency</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Changes are reflected immediately in the wallet view</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
