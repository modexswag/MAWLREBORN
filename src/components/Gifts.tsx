import { NFTGift } from '../App';

interface GiftsProps {
  gifts: NFTGift[];
  upgradeGift: (giftId: string) => boolean;
  tonBalance: number;
}

export function Gifts({ gifts, upgradeGift, tonBalance }: GiftsProps) {
  const ownedGifts = gifts.filter(g => g.owned);
  const upgradeCost = 1;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-slate-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'legendary': return 'from-yellow-500 to-orange-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  const getRarityName = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Обычный';
      case 'rare': return 'Редкий';
      case 'epic': return 'Эпический';
      case 'legendary': return 'Легендарный';
      default: return rarity;
    }
  };

  const handleUpgrade = (giftId: string, giftName: string) => {
    if (confirm(`Улучшить "${giftName}" за ${upgradeCost} TON?`)) {
      upgradeGift(giftId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl shadow-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">🎁 NFT Подарки</h2>
            <p className="text-purple-100">Ваша коллекция подарков из Telegram</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-lg rounded-xl px-6 py-4">
            <p className="text-purple-100 text-sm mb-1">Собрано</p>
            <p className="text-4xl font-bold text-white">{ownedGifts.length}/{gifts.length}</p>
          </div>
        </div>
      </div>

      {ownedGifts.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center">
          <div className="text-8xl mb-4">🎁</div>
          <h3 className="text-3xl font-bold text-white mb-4">У вас пока нет подарков</h3>
          <p className="text-white/60 text-lg mb-6">
            Купите NFT подарки в MDX Market, чтобы начать свою коллекцию
          </p>
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-xl">
            <p className="text-white font-medium">
              💡 Подарки можно улучшать за 1 TON каждый
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">⚪</div>
              <p className="text-2xl font-bold text-white">
                {ownedGifts.filter(g => g.rarity === 'common').length}
              </p>
              <p className="text-white/60 text-sm">Обычных</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🔵</div>
              <p className="text-2xl font-bold text-white">
                {ownedGifts.filter(g => g.rarity === 'rare').length}
              </p>
              <p className="text-white/60 text-sm">Редких</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🟣</div>
              <p className="text-2xl font-bold text-white">
                {ownedGifts.filter(g => g.rarity === 'epic').length}
              </p>
              <p className="text-white/60 text-sm">Эпических</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🟡</div>
              <p className="text-2xl font-bold text-white">
                {ownedGifts.filter(g => g.rarity === 'legendary').length}
              </p>
              <p className="text-white/60 text-sm">Легендарных</p>
            </div>
          </div>

          {/* Gift Collection */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Моя коллекция</h3>
                <p className="text-white/60 text-sm mt-1">Улучшайте подарки за {upgradeCost} TON</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2">
                <p className="text-white/60 text-xs">Баланс TON</p>
                <p className="text-white font-bold">{tonBalance.toFixed(2)} 💎</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {ownedGifts.map(gift => (
                <div
                  key={gift.id}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all group"
                >
                  <div className="text-center mb-4">
                    <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${gift.color} rounded-2xl flex items-center justify-center text-6xl mb-3 group-hover:scale-110 transition-transform shadow-xl`}>
                      {gift.emoji}
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">{gift.name}</h4>
                    <div className={`inline-block bg-gradient-to-r ${getRarityColor(gift.rarity)} px-4 py-1 rounded-full mb-2`}>
                      <span className="text-white text-xs font-bold uppercase">
                        {getRarityName(gift.rarity)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Level */}
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60 text-sm">Уровень</span>
                        <span className="text-white font-bold text-lg">{gift.level}</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${gift.color} transition-all`}
                          style={{ width: `${Math.min(gift.level * 10, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Upgrade Button */}
                    <button
                      onClick={() => handleUpgrade(gift.id, gift.name)}
                      disabled={tonBalance < upgradeCost}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${
                        tonBalance < upgradeCost
                          ? 'bg-white/10 text-white/40 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {tonBalance < upgradeCost ? (
                        '❌ Не хватает TON'
                      ) : (
                        <>⬆️ Улучшить за {upgradeCost} 💎</>
                      )}
                    </button>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-white/60">Бонус</p>
                        <p className="text-white font-bold">+{(gift.bonus || 10) + (gift.level - 1) * 10}%</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-white/60">Ценность</p>
                        <p className="text-white font-bold">⭐ {gift.level}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Level Benefits */}
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>⭐</span>
              <span>Преимущества улучшений</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">1</div>
                  <span>Увеличение ценности подарка</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">2</div>
                  <span>Визуальный прогресс коллекции</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">3</div>
                  <span>Бонусы за каждый уровень</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">4</div>
                  <span>Престиж и статус</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>Подсказки</span>
        </h3>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>NFT подарки вдохновлены маркетом Telegram Gifts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Каждое улучшение стоит {upgradeCost} TON независимо от редкости</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Легендарные подарки - самые редкие и ценные</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Покупайте новые подарки в MDX Market</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
