import { useState } from 'react';
import { NFTGift, AdminMarketItem, UserRole } from '../App';

interface AdminPanelProps {
  allGifts: NFTGift[];
  addGift: (gift: NFTGift) => void;
  updateGift: (giftId: string, updates: Partial<NFTGift>) => void;
  deleteGift: (giftId: string) => void;
  marketPhones: AdminMarketItem[];
  addMarketPhone: (item: AdminMarketItem) => void;
  updateMarketPhone: (itemId: string, updates: Partial<AdminMarketItem>) => void;
  deleteMarketPhone: (itemId: string) => void;
  marketUsernames: AdminMarketItem[];
  addMarketUsername: (item: AdminMarketItem) => void;
  updateMarketUsername: (itemId: string, updates: Partial<AdminMarketItem>) => void;
  deleteMarketUsername: (itemId: string) => void;
  grantPremium: (username: string, duration: number) => boolean;
  grantPrefix: (username: string, prefix: string) => boolean;
  changeUserRole: (username: string, role: UserRole) => boolean;
}

const rarityColors = {
  common: 'from-gray-500 to-slate-500',
  rare: 'from-blue-500 to-cyan-500',
  epic: 'from-purple-500 to-pink-500',
  legendary: 'from-yellow-500 to-orange-500',
};

export function AdminPanel({
  allGifts,
  addGift,
  updateGift,
  deleteGift,
  marketPhones,
  addMarketPhone,
  updateMarketPhone,
  deleteMarketPhone,
  marketUsernames,
  addMarketUsername,
  updateMarketUsername,
  deleteMarketUsername,
  grantPremium,
  grantPrefix,
  changeUserRole,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'gifts' | 'phones' | 'usernames' | 'users'>('gifts');

  // Gift form state
  const [giftName, setGiftName] = useState('');
  const [giftEmoji, setGiftEmoji] = useState('🎁');
  const [giftRarity, setGiftRarity] = useState<'common' | 'rare' | 'epic' | 'legendary'>('common');
  const [giftBonus, setGiftBonus] = useState(10);
  const [giftColor, setGiftColor] = useState('from-purple-500 to-pink-500');

  // Phone form state
  const [phoneName, setPhoneName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phonePrice, setPhonePrice] = useState(50);
  const [phoneIcon, setPhoneIcon] = useState('📱');

  // Username form state
  const [usernameName, setUsernameName] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [usernamePrice, setUsernamePrice] = useState(25);
  const [usernameIcon, setUsernameIcon] = useState('⭐');

  // User management state
  const [targetUsername, setTargetUsername] = useState('');
  const [premiumDuration, setPremiumDuration] = useState(86400000); // 1 day
  const [newPrefix, setNewPrefix] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('user');

  const handleAddGift = () => {
    if (!giftName || !giftEmoji) {
      alert('Заполните все поля');
      return;
    }

    const newGift: NFTGift = {
      id: Date.now().toString(),
      name: giftName,
      emoji: giftEmoji,
      rarity: giftRarity,
      level: 1,
      owned: false,
      color: giftColor,
      bonus: giftBonus,
    };

    addGift(newGift);
    setGiftName('');
    setGiftEmoji('🎁');
    setGiftRarity('common');
    setGiftBonus(10);
    alert('✅ NFT подарок добавлен!');
  };

  const handleAddPhone = () => {
    if (!phoneName || !phoneNumber) {
      alert('Заполните все поля');
      return;
    }

    const newPhone: AdminMarketItem = {
      id: Date.now().toString(),
      type: 'phone',
      name: phoneName,
      price: phonePrice,
      icon: phoneIcon,
      description: phoneNumber,
      value: phoneNumber,
      enabled: true,
    };

    addMarketPhone(newPhone);
    setPhoneName('');
    setPhoneNumber('');
    setPhonePrice(50);
    alert('✅ Номер добавлен в маркет!');
  };

  const handleAddUsername = () => {
    if (!usernameName || !usernameValue) {
      alert('Заполните все поля');
      return;
    }

    const newUsername: AdminMarketItem = {
      id: Date.now().toString(),
      type: 'username',
      name: usernameName,
      price: usernamePrice,
      icon: usernameIcon,
      description: '@' + usernameValue,
      value: usernameValue,
      enabled: true,
    };

    addMarketUsername(newUsername);
    setUsernameName('');
    setUsernameValue('');
    setUsernamePrice(25);
    alert('✅ Username добавлен в маркет!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl p-8 shadow-2xl shadow-red-500/30">
        <h2 className="text-4xl font-bold text-white mb-2">🔧 Admin Panel</h2>
        <p className="text-red-100">Управление NFT подарками, номерами и юзернеймами</p>
      </div>

      {/* Tabs */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('gifts')}
            className={`flex-1 px-6 py-4 font-medium transition-all ${
              activeTab === 'gifts'
                ? 'bg-red-600 text-white'
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            🎁 NFT Подарки
          </button>
          <button
            onClick={() => setActiveTab('phones')}
            className={`flex-1 px-6 py-4 font-medium transition-all ${
              activeTab === 'phones'
                ? 'bg-red-600 text-white'
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            📱 Номера телефонов
          </button>
          <button
            onClick={() => setActiveTab('usernames')}
            className={`flex-1 px-6 py-4 font-medium transition-all ${
              activeTab === 'usernames'
                ? 'bg-red-600 text-white'
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            👤 Юзернеймы
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 px-6 py-4 font-medium transition-all ${
              activeTab === 'users'
                ? 'bg-red-600 text-white'
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            👥 Управление пользователями
          </button>
        </div>

        <div className="p-6">
          {/* NFT Gifts Tab */}
          {activeTab === 'gifts' && (
            <div className="space-y-6">
              {/* Add Gift Form */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">➕ Добавить NFT подарок</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Название</label>
                    <input
                      type="text"
                      value={giftName}
                      onChange={(e) => setGiftName(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Golden Star"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Эмодзи</label>
                    <input
                      type="text"
                      value={giftEmoji}
                      onChange={(e) => setGiftEmoji(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 text-2xl text-center"
                      placeholder="⭐"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Редкость</label>
                    <select
                      value={giftRarity}
                      onChange={(e) => setGiftRarity(e.target.value as any)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="common">Common (Обычный)</option>
                      <option value="rare">Rare (Редкий)</option>
                      <option value="epic">Epic (Эпический)</option>
                      <option value="legendary">Legendary (Легендарный)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Бонус</label>
                    <input
                      type="number"
                      value={giftBonus}
                      onChange={(e) => setGiftBonus(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      min="0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white/80 text-sm font-medium mb-2">Цветовой градиент</label>
                    <select
                      value={giftColor}
                      onChange={(e) => setGiftColor(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="from-gray-500 to-slate-500">Gray (Серый)</option>
                      <option value="from-blue-500 to-cyan-500">Blue (Синий)</option>
                      <option value="from-purple-500 to-pink-500">Purple (Фиолетовый)</option>
                      <option value="from-yellow-500 to-orange-500">Yellow (Желтый)</option>
                      <option value="from-green-500 to-emerald-500">Green (Зеленый)</option>
                      <option value="from-red-500 to-pink-500">Red (Красный)</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleAddGift}
                  className="mt-4 w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-lg"
                >
                  ➕ Добавить подарок
                </button>
              </div>

              {/* Gifts List */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">📦 Все NFT подарки ({allGifts.length})</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {allGifts.map(gift => (
                    <div key={gift.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-16 h-16 bg-gradient-to-br ${gift.color} rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
                          {gift.emoji}
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-white font-bold">{gift.name}</h4>
                          <div className="flex items-center gap-2 text-xs mt-1">
                            <span className={`px-2 py-1 bg-gradient-to-r ${rarityColors[gift.rarity]} rounded text-white font-bold uppercase`}>
                              {gift.rarity}
                            </span>
                            <span className="text-white/60">Бонус: +{gift.bonus}%</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <input
                              type="number"
                              defaultValue={gift.bonus}
                              onBlur={(e) => {
                                const newBonus = parseInt(e.target.value) || 0;
                                if (newBonus !== gift.bonus) {
                                  updateGift(gift.id, { bonus: newBonus });
                                }
                              }}
                              className="w-20 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                              placeholder="Бонус"
                            />
                            <button
                              onClick={() => {
                                if (confirm(`Удалить "${gift.name}"?`)) {
                                  deleteGift(gift.id);
                                }
                              }}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Phone Numbers Tab */}
          {activeTab === 'phones' && (
            <div className="space-y-6">
              {/* Add Phone Form */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">➕ Добавить номер телефона</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Название</label>
                    <input
                      type="text"
                      value={phoneName}
                      onChange={(e) => setPhoneName(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Premium +7"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Номер</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="+7 (999) 999-99-99"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Цена (TON)</label>
                    <input
                      type="number"
                      value={phonePrice}
                      onChange={(e) => setPhonePrice(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Иконка</label>
                    <input
                      type="text"
                      value={phoneIcon}
                      onChange={(e) => setPhoneIcon(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="📱"
                      maxLength={2}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddPhone}
                  className="mt-4 w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-lg"
                >
                  ➕ Добавить номер
                </button>
              </div>

              {/* Phones List */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">📱 Номера в маркете ({marketPhones.length})</h3>
                <div className="space-y-3">
                  {marketPhones.map(phone => (
                    <div key={phone.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{phone.icon}</span>
                        <div>
                          <h4 className="text-white font-bold">{phone.name}</h4>
                          <p className="text-white/60 text-sm">{phone.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white font-bold">{phone.price} 💎</span>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={phone.enabled}
                            onChange={(e) => updateMarketPhone(phone.id, { enabled: e.target.checked })}
                            className="w-5 h-5"
                          />
                          <span className="text-white/60 text-sm">Активен</span>
                        </label>
                        <button
                          onClick={() => {
                            if (confirm('Удалить номер?')) {
                              deleteMarketPhone(phone.id);
                            }
                          }}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                  {marketPhones.length === 0 && (
                    <p className="text-white/40 text-center py-8">Номеров пока нет</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Usernames Tab */}
          {activeTab === 'usernames' && (
            <div className="space-y-6">
              {/* Add Username Form */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">➕ Добавить юзернейм</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Название</label>
                    <input
                      type="text"
                      value={usernameName}
                      onChange={(e) => setUsernameName(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Cool Username"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Username (без @)</label>
                    <input
                      type="text"
                      value={usernameValue}
                      onChange={(e) => setUsernameValue(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="cool_name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Цена (TON)</label>
                    <input
                      type="number"
                      value={usernamePrice}
                      onChange={(e) => setUsernamePrice(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Иконка</label>
                    <input
                      type="text"
                      value={usernameIcon}
                      onChange={(e) => setUsernameIcon(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="⭐"
                      maxLength={2}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddUsername}
                  className="mt-4 w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-lg"
                >
                  ➕ Добавить юзернейм
                </button>
              </div>

              {/* Usernames List */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">👤 Юзернеймы в маркете ({marketUsernames.length})</h3>
                <div className="space-y-3">
                  {marketUsernames.map(username => (
                    <div key={username.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{username.icon}</span>
                        <div>
                          <h4 className="text-white font-bold">{username.name}</h4>
                          <p className="text-purple-300 font-mono">{username.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white font-bold">{username.price} 💎</span>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={username.enabled}
                            onChange={(e) => updateMarketUsername(username.id, { enabled: e.target.checked })}
                            className="w-5 h-5"
                          />
                          <span className="text-white/60 text-sm">Активен</span>
                        </label>
                        <button
                          onClick={() => {
                            if (confirm('Удалить юзернейм?')) {
                              deleteMarketUsername(username.id);
                            }
                          }}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                  {marketUsernames.length === 0 && (
                    <p className="text-white/40 text-center py-8">Юзернеймов пока нет</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Grant Premium */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">⭐ Выдать Premium подписку</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Username (без @)</label>
                    <input
                      type="text"
                      value={targetUsername}
                      onChange={(e) => setTargetUsername(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Срок действия</label>
                    <select
                      value={premiumDuration}
                      onChange={(e) => setPremiumDuration(parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value={86400000}>1 день</option>
                      <option value={604800000}>7 дней</option>
                      <option value={2592000000}>1 месяц</option>
                      <option value={31536000000}>1 год</option>
                      <option value={-1}>Навсегда</option>
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      if (targetUsername && grantPremium(targetUsername, premiumDuration)) {
                        setTargetUsername('');
                      }
                    }}
                    className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium rounded-lg"
                  >
                    ⭐ Выдать Premium
                  </button>
                </div>
              </div>

              {/* Grant Prefix */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🏷️ Выдать префикс</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Username (без @)</label>
                    <input
                      type="text"
                      value={targetUsername}
                      onChange={(e) => setTargetUsername(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Префикс</label>
                    <input
                      type="text"
                      value={newPrefix}
                      onChange={(e) => setNewPrefix(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="[BOSS]"
                      maxLength={20}
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (targetUsername && newPrefix && grantPrefix(targetUsername, newPrefix)) {
                        setTargetUsername('');
                        setNewPrefix('');
                      }
                    }}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg"
                  >
                    🏷️ Выдать префикс
                  </button>
                </div>
              </div>

              {/* Change Role */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">👑 Изменить роль пользователя</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Username (без @)</label>
                    <input
                      type="text"
                      value={targetUsername}
                      onChange={(e) => setTargetUsername(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Роль</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as UserRole)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="user">👤 Пользователь</option>
                      <option value="moderator">🛡️ Модератор</option>
                      <option value="admin">👑 Администратор</option>
                    </select>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <p className="text-yellow-300 text-sm">
                      ⚠️ <strong>Модератор</strong>: может просматривать логи переводов<br/>
                      ⚠️ <strong>Админ</strong>: полный доступ к админ панели
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (targetUsername && changeUserRole(targetUsername, newRole)) {
                        setTargetUsername('');
                      }
                    }}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-lg"
                  >
                    👑 Изменить роль
                  </button>
                </div>
              </div>

              {/* Premium Info */}
              <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-lg border border-yellow-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span>⭐</span>
                  <span>Premium возможности</span>
                </h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Эмодзи в username (доступно в профиле)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Особый значок Premium в профиле</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Доступ к эксклюзивным функциям</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Префиксы перед username</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
