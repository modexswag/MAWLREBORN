import { useState } from 'react';
import { MarketItem, NFTGift, AdminMarketItem } from '../App';

interface MarketProps {
  gifts: NFTGift[];
  purchaseItem: (item: MarketItem) => boolean;
  tonBalance: number;
  marketPhones: AdminMarketItem[];
  marketUsernames: AdminMarketItem[];
}

export function Market({ gifts, purchaseItem, tonBalance, marketPhones, marketUsernames }: MarketProps) {
  const [activeTab, setActiveTab] = useState<'phones' | 'usernames' | 'gifts'>('phones');

  const phoneNumbers: MarketItem[] = marketPhones
    .filter(item => item.enabled)
    .map(item => ({
      id: item.id,
      type: item.type,
      name: item.name,
      price: item.price,
      icon: item.icon,
      description: item.description,
      value: item.value,
    }));

  const usernames: MarketItem[] = marketUsernames
    .filter(item => item.enabled)
    .map(item => ({
      id: item.id,
      type: item.type,
      name: item.name,
      price: item.price,
      icon: item.icon,
      description: item.description,
      value: item.value,
    }));

  const giftItems: MarketItem[] = gifts.filter(g => !g.owned).map(gift => ({
    id: gift.id,
    type: 'gift',
    name: gift.name,
    price: gift.rarity === 'common' ? 10 : 
           gift.rarity === 'rare' ? 25 :
           gift.rarity === 'epic' ? 50 : 100,
    icon: gift.emoji,
    description: `${gift.rarity.toUpperCase()} NFT Gift`,
    rarity: gift.rarity,
    color: gift.color,
  }));

  const handlePurchase = (item: MarketItem) => {
    if (confirm(`Купить "${item.name}" за ${item.price} TON?`)) {
      purchaseItem(item);
    }
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-slate-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'legendary': return 'from-yellow-500 to-orange-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl shadow-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">🛒 MDX Market</h2>
            <p className="text-purple-100">Покупайте номера, юзернеймы и NFT подарки за TON</p>
          </div>
          <div className="text-right bg-white/10 backdrop-blur-lg rounded-xl px-6 py-4">
            <p className="text-purple-100 text-sm mb-1">Ваш баланс</p>
            <p className="text-3xl font-bold text-white">{tonBalance.toFixed(2)} 💎</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('phones')}
            className={`flex-1 px-6 py-4 font-medium transition-all ${
              activeTab === 'phones'
                ? 'bg-purple-600 text-white'
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            📱 Номера телефонов
          </button>
          <button
            onClick={() => setActiveTab('usernames')}
            className={`flex-1 px-6 py-4 font-medium transition-all ${
              activeTab === 'usernames'
                ? 'bg-purple-600 text-white'
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            👤 Юзернеймы
          </button>
          <button
            onClick={() => setActiveTab('gifts')}
            className={`flex-1 px-6 py-4 font-medium transition-all ${
              activeTab === 'gifts'
                ? 'bg-purple-600 text-white'
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            🎁 NFT Подарки
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'phones' && (
            <div className="space-y-4">
              <p className="text-white/60 mb-4">
                Эксклюзивные номера телефонов. Станут частью вашего профиля.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {phoneNumbers.map(item => (
                  <div
                    key={item.id}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-3xl">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">{item.name}</h4>
                          <p className="text-white/60 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">
                        {item.price} 💎
                      </div>
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={tonBalance < item.price}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                          tonBalance < item.price
                            ? 'bg-white/10 text-white/40 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                        }`}
                      >
                        {tonBalance < item.price ? '❌ Не хватает' : '💳 Купить'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'usernames' && (
            <div className="space-y-4">
              <p className="text-white/60 mb-4">
                Премиум юзернеймы. Выделяйтесь среди других пользователей.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {usernames.map(item => (
                  <div
                    key={item.id}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">{item.name}</h4>
                          <p className="text-purple-300 text-lg font-mono">{item.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">
                        {item.price} 💎
                      </div>
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={tonBalance < item.price}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                          tonBalance < item.price
                            ? 'bg-white/10 text-white/40 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                        }`}
                      >
                        {tonBalance < item.price ? '❌ Не хватает' : '💳 Купить'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gifts' && (
            <div className="space-y-4">
              <p className="text-white/60 mb-4">
                NFT подарки из маркета Telegram. Улучшайте их за 1 TON в разделе NFT Gifts.
              </p>
              {giftItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Все подарки куплены!</h3>
                  <p className="text-white/60">Вы собрали всю коллекцию NFT подарков</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {giftItems.map(item => (
                    <div
                      key={item.id}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all"
                    >
                      <div className="text-center mb-4">
                        <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-5xl mb-3`}>
                          {item.icon}
                        </div>
                        <h4 className="text-white font-bold text-lg mb-1">{item.name}</h4>
                        <div className={`inline-block bg-gradient-to-r ${getRarityColor(item.rarity)} px-3 py-1 rounded-full`}>
                          <span className="text-white text-xs font-bold uppercase">{item.rarity}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-white">
                          {item.price} 💎
                        </div>
                        <button
                          onClick={() => handlePurchase(item)}
                          disabled={tonBalance < item.price}
                          className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                            tonBalance < item.price
                              ? 'bg-white/10 text-white/40 cursor-not-allowed'
                              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                          }`}
                        >
                          {tonBalance < item.price ? '❌' : '💳 Купить'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>ℹ️</span>
          <span>Информация о маркете</span>
        </h3>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Все покупки автоматически сохраняются в вашем профиле</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Все покупки производятся за TON cryptocurrency</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Номера телефонов +888 - эксклюзивные и более дорогие</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>NFT подарки можно улучшать в разделе NFT Gifts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Редкость подарков: Common → Rare → Epic → Legendary</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
