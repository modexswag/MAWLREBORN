import { InventoryItem } from '../App';

interface InventoryProps {
  inventory: InventoryItem[];
  swapInventoryItem: (item: InventoryItem) => void;
  currentPhone: string;
  currentUsername: string;
}

export function Inventory({ inventory, swapInventoryItem, currentPhone, currentUsername }: InventoryProps) {
  const phones = inventory.filter(i => i.type === 'phone');
  const usernames = inventory.filter(i => i.type === 'username');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl shadow-purple-500/30">
        <h2 className="text-4xl font-bold text-white mb-2">🎒 Инвентарь</h2>
        <p className="text-purple-100">Ваши купленные номера и юзернеймы</p>
      </div>

      {/* Current Active */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">✨ Активные сейчас</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📱</span>
              <span className="text-white/60 text-sm">Номер телефона</span>
            </div>
            <p className="text-white font-bold text-lg">
              {currentPhone || 'Не установлен'}
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">👤</span>
              <span className="text-white/60 text-sm">Username</span>
            </div>
            <p className="text-white font-bold text-lg">@{currentUsername}</p>
          </div>
        </div>
      </div>

      {/* Phone Numbers Inventory */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">📱 Номера телефонов ({phones.length})</h3>
          <p className="text-white/60 text-sm mt-1">Нажмите чтобы установить номер</p>
        </div>
        <div className="p-6">
          {phones.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/40">У вас нет номеров в инвентаре</p>
              <p className="text-white/30 text-sm mt-2">Купите номера в MDX Market</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {phones.map(phone => (
                <button
                  key={phone.id}
                  onClick={() => swapInventoryItem(phone)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl p-4 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-2xl">
                      {phone.icon}
                    </div>
                    <div className="flex-grow">
                      <p className="text-white font-bold">{phone.value}</p>
                      <p className="text-white/60 text-sm">Нажмите чтобы установить</p>
                    </div>
                    <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                      ↔️
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Usernames Inventory */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">👤 Юзернеймы ({usernames.length})</h3>
          <p className="text-white/60 text-sm mt-1">Нажмите чтобы установить username</p>
        </div>
        <div className="p-6">
          {usernames.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/40">У вас нет юзернеймов в инвентаре</p>
              <p className="text-white/30 text-sm mt-2">Купите username в MDX Market</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {usernames.map(username => (
                <button
                  key={username.id}
                  onClick={() => swapInventoryItem(username)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl p-4 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl">
                      {username.icon}
                    </div>
                    <div className="flex-grow">
                      <p className="text-white font-bold font-mono">@{username.value}</p>
                      <p className="text-white/60 text-sm">Нажмите чтобы установить</p>
                    </div>
                    <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                      ↔️
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>ℹ️</span>
          <span>Как это работает</span>
        </h3>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>При покупке нового номера/username, старый автоматически попадает в инвентарь</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Вы можете в любой момент поменять активный номер/username на любой из инвентаря</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>При смене текущий номер/username отправляется обратно в инвентарь</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Все изменения сохраняются автоматически</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
