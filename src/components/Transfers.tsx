import { useState } from 'react';
import { Crypto, TransferLog, UserRole } from '../App';

interface TransfersProps {
  cryptos: Crypto[];
  transferCrypto: (toUsername: string, cryptoSymbol: string, amount: number) => boolean;
  transferLogs: TransferLog[];
  userRole: UserRole;
  currentUsername: string;
}

export function Transfers({ cryptos, transferCrypto, transferLogs, userRole, currentUsername }: TransfersProps) {
  const [toUsername, setToUsername] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('TON');
  const [amount, setAmount] = useState('');

  const handleTransfer = () => {
    if (!toUsername || !amount) {
      alert('Заполните все поля');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Введите корректную сумму');
      return;
    }

    if (transferCrypto(toUsername, selectedCrypto, amountNum)) {
      setToUsername('');
      setAmount('');
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU');
  };

  const myLogs = transferLogs.filter(log => 
    log.from === currentUsername || log.to === currentUsername
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 shadow-2xl shadow-green-500/30">
        <h2 className="text-4xl font-bold text-white mb-2">💸 Переводы</h2>
        <p className="text-green-100">Отправляйте криптовалюту другим пользователям</p>
      </div>

      {/* Transfer Form */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">📤 Отправить перевод</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Username получателя (без @)
            </label>
            <input
              type="text"
              value={toUsername}
              onChange={(e) => setToUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="username"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Криптовалюта
              </label>
              <select
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {cryptos.filter(c => c.amount > 0).map(crypto => (
                  <option key={crypto.id} value={crypto.symbol}>
                    {crypto.symbol} ({crypto.amount.toFixed(4)} доступно)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Сумма
              </label>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <button
            onClick={handleTransfer}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg shadow-lg transition-all"
          >
            ✅ Отправить перевод
          </button>
        </div>
      </div>

      {/* Transfer History */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">
            {userRole === 'moderator' || userRole === 'admin' 
              ? '📊 Все переводы (Логи)'
              : '📜 История переводов'}
          </h3>
          <p className="text-white/60 text-sm mt-1">
            {userRole === 'moderator' || userRole === 'admin'
              ? `Всего переводов: ${transferLogs.length}`
              : `Ваши переводы: ${myLogs.length}`}
          </p>
        </div>
        <div className="p-6">
          {(userRole === 'moderator' || userRole === 'admin' ? transferLogs : myLogs).length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/40">Переводов пока нет</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(userRole === 'moderator' || userRole === 'admin' ? transferLogs : myLogs).map(log => {
                const isReceived = log.to === currentUsername;
                const isUserLog = log.from === currentUsername || log.to === currentUsername;

                return (
                  <div
                    key={log.id}
                    className={`p-4 rounded-xl border ${
                      isUserLog
                        ? isReceived
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-red-500/10 border-red-500/30'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{isReceived ? '📥' : '📤'}</span>
                        <div>
                          <p className="text-white font-medium">
                            @{log.from} → @{log.to}
                          </p>
                          <p className="text-white/60 text-sm">{formatDate(log.timestamp)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${isReceived ? 'text-green-400' : 'text-red-400'}`}>
                          {isReceived ? '+' : '-'}{log.amount} {log.crypto}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>ℹ️</span>
          <span>Информация о переводах</span>
        </h3>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Переводы выполняются моментально</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Все переводы логируются и сохраняются</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Нельзя переводить самому себе</span>
          </li>
          {(userRole === 'moderator' || userRole === 'admin') && (
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">•</span>
              <span className="text-yellow-300">Вы видите все переводы системы (модератор/админ)</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
