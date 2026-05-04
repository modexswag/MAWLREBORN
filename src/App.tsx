import { useState, useEffect } from 'react';
import { Wallet } from './components/Wallet';
import { Settings } from './components/Settings';
import { Profile } from './components/Profile';
import { Market } from './components/Market';
import { Gifts } from './components/Gifts';
import { Auth } from './components/Auth';
import { AdminPanel } from './components/AdminPanel';
import { Inventory } from './components/Inventory';
import { Transfers } from './components/Transfers';
import { Chat } from './components/Chat';

export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  icon: string;
  color: string;
}

export interface UserProfile {
  avatar: string;
  username: string;
  phoneNumber: string;
  isPremium: boolean;
  premiumUntil?: number;
  prefix?: string;
  emojiInUsername?: string;
}

export interface NFTGift {
  id: string;
  name: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  level: number;
  owned: boolean;
  color: string;
  bonus?: number;
}

export interface MarketItem {
  id: string;
  type: 'phone' | 'username' | 'gift';
  name: string;
  price: number;
  icon: string;
  description: string;
  value?: string;
  rarity?: string;
  color?: string;
}

export interface InventoryItem {
  id: string;
  type: 'phone' | 'username';
  value: string;
  name: string;
  icon: string;
}

export interface TransferLog {
  id: string;
  from: string;
  to: string;
  crypto: string;
  amount: number;
  timestamp: number;
}

export type UserRole = 'user' | 'moderator' | 'admin';

export interface User {
  email: string;
  password: string;
  isAdmin: boolean;
  role: UserRole;
  profile: UserProfile;
  cryptos: Crypto[];
  gifts: NFTGift[];
  inventory: InventoryItem[];
}

export interface AdminMarketItem extends MarketItem {
  enabled: boolean;
  sold: boolean;
  soldTo?: string;
}

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: number;
  avatar: string;
  prefix?: string;
}

const initialCryptos: Crypto[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', amount: 0.5, price: 65000, icon: '₿', color: 'from-orange-500 to-yellow-500' },
  { id: '2', name: 'Ethereum', symbol: 'ETH', amount: 2.5, price: 3500, icon: 'Ξ', color: 'from-purple-500 to-blue-500' },
  { id: '3', name: 'Solana', symbol: 'SOL', amount: 10, price: 150, icon: '◎', color: 'from-purple-600 to-pink-500' },
  { id: '4', name: 'Toncoin', symbol: 'TON', amount: 500, price: 5.5, icon: '💎', color: 'from-blue-500 to-cyan-500' },
  { id: '5', name: 'Cardano', symbol: 'ADA', amount: 1000, price: 0.65, icon: '₳', color: 'from-blue-600 to-indigo-500' },
  { id: '6', name: 'Ripple', symbol: 'XRP', amount: 500, price: 0.55, icon: '✕', color: 'from-gray-600 to-slate-500' },
  { id: '7', name: 'Polkadot', symbol: 'DOT', amount: 100, price: 8.5, icon: '●', color: 'from-pink-500 to-rose-500' },
  { id: '8', name: 'Dogecoin', symbol: 'DOGE', amount: 5000, price: 0.15, icon: 'Ð', color: 'from-yellow-500 to-amber-500' },
  { id: '9', name: 'USDT', symbol: 'USDT', amount: 100, price: 1, icon: '💵', color: 'from-green-500 to-emerald-500' },
];

const initialProfile: UserProfile = {
  avatar: '👤',
  username: 'user' + Math.floor(Math.random() * 10000),
  phoneNumber: '',
  isPremium: false,
  premiumUntil: 0,
  prefix: '',
  emojiInUsername: '',
};

const initialGifts: NFTGift[] = [
  { id: '1', name: 'Delicious Cake', emoji: '🎂', rarity: 'common', level: 1, owned: false, color: 'from-pink-500 to-rose-500', bonus: 10 },
  { id: '2', name: 'Green Star', emoji: '⭐', rarity: 'common', level: 1, owned: false, color: 'from-green-500 to-emerald-500', bonus: 15 },
  { id: '3', name: 'Blue Star', emoji: '🌟', rarity: 'rare', level: 1, owned: false, color: 'from-blue-500 to-cyan-500', bonus: 25 },
  { id: '4', name: 'Red Heart', emoji: '❤️', rarity: 'rare', level: 1, owned: false, color: 'from-red-500 to-pink-500', bonus: 30 },
  { id: '5', name: 'Golden Trophy', emoji: '🏆', rarity: 'epic', level: 1, owned: false, color: 'from-yellow-500 to-orange-500', bonus: 50 },
  { id: '6', name: 'Diamond Ring', emoji: '💍', rarity: 'epic', level: 1, owned: false, color: 'from-purple-500 to-pink-500', bonus: 60 },
  { id: '7', name: 'Crown', emoji: '👑', rarity: 'legendary', level: 1, owned: false, color: 'from-yellow-600 to-amber-600', bonus: 100 },
  { id: '8', name: 'Unicorn', emoji: '🦄', rarity: 'legendary', level: 1, owned: false, color: 'from-purple-600 to-pink-600', bonus: 120 },
];

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('modex-current-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [allGifts, setAllGifts] = useState<NFTGift[]>(() => {
    const saved = localStorage.getItem('modex-all-gifts');
    return saved ? JSON.parse(saved) : initialGifts;
  });

  const [marketPhones, setMarketPhones] = useState<AdminMarketItem[]>(() => {
    const saved = localStorage.getItem('modex-market-phones');
    return saved ? JSON.parse(saved) : [];
  });

  const [marketUsernames, setMarketUsernames] = useState<AdminMarketItem[]>(() => {
    const saved = localStorage.getItem('modex-market-usernames');
    return saved ? JSON.parse(saved) : [];
  });

  const [cryptos, setCryptos] = useState<Crypto[]>(() => {
    if (currentUser) return currentUser.cryptos;
    const saved = localStorage.getItem('modex-wallet-cryptos');
    return saved ? JSON.parse(saved) : initialCryptos;
  });
  
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (currentUser) return currentUser.profile;
    const saved = localStorage.getItem('modex-wallet-profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [gifts, setGifts] = useState<NFTGift[]>(() => {
    if (currentUser) return currentUser.gifts;
    const saved = localStorage.getItem('modex-wallet-gifts');
    return saved ? JSON.parse(saved) : allGifts;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    if (currentUser) return currentUser.inventory;
    return [];
  });

  const [transferLogs, setTransferLogs] = useState<TransferLog[]>(() => {
    const saved = localStorage.getItem('modex-transfer-logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentView, setCurrentView] = useState<'wallet' | 'settings' | 'profile' | 'market' | 'gifts' | 'admin' | 'inventory' | 'transfers' | 'chat'>('wallet');

  useEffect(() => {
    if (currentUser) {
      const updatedUser = { ...currentUser, cryptos, profile, gifts, inventory };
      setCurrentUser(updatedUser);
      localStorage.setItem('modex-current-user', JSON.stringify(updatedUser));
      
      // Update in users list
      const users = JSON.parse(localStorage.getItem('modex-users') || '[]');
      const updatedUsers = users.map((u: User) => 
        u.email === currentUser.email ? updatedUser : u
      );
      localStorage.setItem('modex-users', JSON.stringify(updatedUsers));
    }
  }, [cryptos, profile, gifts, inventory]);

  useEffect(() => {
    localStorage.setItem('modex-transfer-logs', JSON.stringify(transferLogs));
  }, [transferLogs]);

  useEffect(() => {
    localStorage.setItem('modex-all-gifts', JSON.stringify(allGifts));
  }, [allGifts]);

  useEffect(() => {
    localStorage.setItem('modex-market-phones', JSON.stringify(marketPhones));
  }, [marketPhones]);

  useEffect(() => {
    localStorage.setItem('modex-market-usernames', JSON.stringify(marketUsernames));
  }, [marketUsernames]);

  const updateCrypto = (id: string, amount: number, price: number) => {
    setCryptos(prev => prev.map(crypto => 
      crypto.id === id ? { ...crypto, amount, price } : crypto
    ));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const purchaseItem = (item: MarketItem) => {
    const tonCrypto = cryptos.find(c => c.symbol === 'TON');
    if (!tonCrypto || tonCrypto.amount < item.price) {
      alert('Недостаточно TON для покупки!');
      return false;
    }

    // Deduct TON
    updateCrypto('4', tonCrypto.amount - item.price, tonCrypto.price);

    // Apply purchase
    if (item.type === 'phone' && item.value) {
      // Move current phone to inventory if exists
      if (profile.phoneNumber) {
        const inventoryItem: InventoryItem = {
          id: Date.now().toString(),
          type: 'phone',
          value: profile.phoneNumber,
          name: 'Phone Number',
          icon: '📱',
        };
        setInventory(prev => [...prev, inventoryItem]);
      }
      updateProfile({ phoneNumber: item.value });
      alert(`✅ Номер ${item.value} успешно куплен и установлен!`);
    } else if (item.type === 'username' && item.value) {
      // Check if username already exists
      const users: User[] = JSON.parse(localStorage.getItem('modex-users') || '[]');
      const isTaken = users.some(u => u.profile.username.toLowerCase() === item.value!.toLowerCase());
      
      if (isTaken) {
        alert('❌ Этот username уже занят другим пользователем!');
        return false;
      }

      // Mark as sold
      if (item.type === 'username') {
        const marketIndex = marketUsernames.findIndex(u => u.id === item.id);
        if (marketIndex !== -1) {
          updateMarketUsername(item.id, { sold: true, soldTo: profile.username });
        }
      }

      // Add current username to inventory if length >= 5
      if (profile.username.length >= 5) {
        const inventoryItem: InventoryItem = {
          id: Date.now().toString(),
          type: 'username',
          value: profile.username,
          name: 'Username',
          icon: '👤',
        };
        setInventory(prev => [...prev, inventoryItem]);
      }
      
      updateProfile({ username: item.value });
      alert(`✅ Username @${item.value} успешно куплен и установлен!`);
    } else if (item.type === 'gift') {
      const gift = gifts.find(g => g.id === item.id);
      if (gift) {
        setGifts(prev => prev.map(g => 
          g.id === item.id ? { ...g, owned: true } : g
        ));
        alert(`✅ NFT подарок "${item.name}" успешно куплен!`);
      }
    }

    return true;
  };

  const upgradeGift = (giftId: string) => {
    const tonCrypto = cryptos.find(c => c.symbol === 'TON');
    const upgradeCost = 1;

    if (!tonCrypto || tonCrypto.amount < upgradeCost) {
      alert('Недостаточно TON для улучшения!');
      return false;
    }

    updateCrypto('4', tonCrypto.amount - upgradeCost, tonCrypto.price);
    setGifts(prev => prev.map(g => 
      g.id === giftId ? { ...g, level: g.level + 1 } : g
    ));
    alert('✅ NFT подарок улучшен!');
    return true;
  };

  const handleLogin = (user: User) => {
    // Check premium expiration
    if (user.profile.isPremium && user.profile.premiumUntil && user.profile.premiumUntil !== -1) {
      if (Date.now() > user.profile.premiumUntil) {
        user.profile.isPremium = false;
        user.profile.premiumUntil = 0;
      }
    }
    
    setCurrentUser(user);
    setCryptos(user.cryptos);
    setProfile(user.profile);
    setGifts(user.gifts);
    setInventory(user.inventory || []);
    localStorage.setItem('modex-current-user', JSON.stringify(user));
  };

  const handleLogout = () => {
    if (currentUser?.isAdmin) {
      // Admin can switch accounts
      if (confirm('Выйти из аккаунта? Админы могут войти в другой аккаунт одновременно.')) {
        setCurrentUser(null);
        localStorage.removeItem('modex-current-user');
      }
    } else {
      setCurrentUser(null);
      localStorage.removeItem('modex-current-user');
    }
  };

  const handleSwitchAccount = () => {
    if (!currentUser?.isAdmin) return;
    
    // Save current session
    const sessions = JSON.parse(localStorage.getItem('modex-admin-sessions') || '[]');
    if (!sessions.find((s: User) => s.email === currentUser.email)) {
      sessions.push(currentUser);
      localStorage.setItem('modex-admin-sessions', JSON.stringify(sessions.slice(-2))); // Max 2 sessions
    }
    
    setCurrentUser(null);
    localStorage.removeItem('modex-current-user');
  };

  const addGift = (gift: NFTGift) => {
    setAllGifts(prev => [...prev, gift]);
  };

  const updateGift = (giftId: string, updates: Partial<NFTGift>) => {
    setAllGifts(prev => prev.map(g => g.id === giftId ? { ...g, ...updates } : g));
    setGifts(prev => prev.map(g => g.id === giftId ? { ...g, ...updates } : g));
  };

  const deleteGift = (giftId: string) => {
    setAllGifts(prev => prev.filter(g => g.id !== giftId));
    setGifts(prev => prev.filter(g => g.id !== giftId));
  };

  const addMarketPhone = (item: AdminMarketItem) => {
    setMarketPhones(prev => [...prev, item]);
  };

  const updateMarketPhone = (itemId: string, updates: Partial<AdminMarketItem>) => {
    setMarketPhones(prev => prev.map(i => i.id === itemId ? { ...i, ...updates } : i));
  };

  const deleteMarketPhone = (itemId: string) => {
    setMarketPhones(prev => prev.filter(i => i.id !== itemId));
  };

  const addMarketUsername = (item: AdminMarketItem) => {
    setMarketUsernames(prev => [...prev, item]);
  };

  const updateMarketUsername = (itemId: string, updates: Partial<AdminMarketItem>) => {
    setMarketUsernames(prev => prev.map(i => i.id === itemId ? { ...i, ...updates } : i));
  };

  const deleteMarketUsername = (itemId: string) => {
    setMarketUsernames(prev => prev.filter(i => i.id !== itemId));
  };

  const transferCrypto = (toUsername: string, cryptoSymbol: string, amount: number) => {
    if (!currentUser) return false;

    // Find recipient
    const users: User[] = JSON.parse(localStorage.getItem('modex-users') || '[]');
    const recipient = users.find(u => u.profile.username === toUsername);

    if (!recipient) {
      alert('❌ Пользователь не найден!');
      return false;
    }

    if (recipient.email === currentUser.email) {
      alert('❌ Нельзя переводить самому себе!');
      return false;
    }

    const crypto = cryptos.find(c => c.symbol === cryptoSymbol);
    if (!crypto || crypto.amount < amount) {
      alert('❌ Недостаточно средств!');
      return false;
    }

    // Update sender
    updateCrypto(crypto.id, crypto.amount - amount, crypto.price);

    // Update recipient
    const recipientCrypto = recipient.cryptos.find(c => c.symbol === cryptoSymbol);
    if (recipientCrypto) {
      recipient.cryptos = recipient.cryptos.map(c =>
        c.symbol === cryptoSymbol ? { ...c, amount: c.amount + amount } : c
      );
      const updatedUsers = users.map(u => u.email === recipient.email ? recipient : u);
      localStorage.setItem('modex-users', JSON.stringify(updatedUsers));
    }

    // Add log
    const log: TransferLog = {
      id: Date.now().toString(),
      from: currentUser.profile.username,
      to: toUsername,
      crypto: cryptoSymbol,
      amount,
      timestamp: Date.now(),
    };
    setTransferLogs(prev => [log, ...prev]);

    alert(`✅ Перевод ${amount} ${cryptoSymbol} → @${toUsername} выполнен!`);
    return true;
  };

  const grantPremium = (username: string, duration: number) => {
    const users: User[] = JSON.parse(localStorage.getItem('modex-users') || '[]');
    const user = users.find(u => u.profile.username === username);

    if (!user) {
      alert('❌ Пользователь не найден!');
      return false;
    }

    const premiumUntil = duration === -1 ? -1 : Date.now() + duration;
    user.profile.isPremium = true;
    user.profile.premiumUntil = premiumUntil;

    const updatedUsers = users.map(u => u.email === user.email ? user : u);
    localStorage.setItem('modex-users', JSON.stringify(updatedUsers));

    if (user.email === currentUser?.email) {
      updateProfile({ isPremium: true, premiumUntil });
    }

    alert(`✅ Premium выдан пользователю @${username}!`);
    return true;
  };

  const grantPrefix = (username: string, prefix: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('modex-users') || '[]');
    const user = users.find(u => u.profile.username === username);

    if (!user) {
      alert('❌ Пользователь не найден!');
      return false;
    }

    user.profile.prefix = prefix;
    const updatedUsers = users.map(u => u.email === user.email ? user : u);
    localStorage.setItem('modex-users', JSON.stringify(updatedUsers));

    if (user.email === currentUser?.email) {
      updateProfile({ prefix });
    }

    alert(`✅ Префикс "${prefix}" выдан пользователю @${username}!`);
    return true;
  };

  const changeUserRole = (username: string, role: UserRole) => {
    const users: User[] = JSON.parse(localStorage.getItem('modex-users') || '[]');
    const user = users.find(u => u.profile.username === username);

    if (!user) {
      alert('❌ Пользователь не найден!');
      return false;
    }

    user.role = role;
    user.isAdmin = role === 'admin';
    const updatedUsers = users.map(u => u.email === user.email ? user : u);
    localStorage.setItem('modex-users', JSON.stringify(updatedUsers));

    alert(`✅ Роль "${role}" выдана пользователю @${username}!`);
    return true;
  };

  const swapInventoryItem = (inventoryItem: InventoryItem) => {
    if (inventoryItem.type === 'phone') {
      // Swap phone
      const currentPhone = profile.phoneNumber;
      if (currentPhone) {
        const newInventoryItem: InventoryItem = {
          id: Date.now().toString(),
          type: 'phone',
          value: currentPhone,
          name: 'Phone Number',
          icon: '📱',
        };
        setInventory(prev => [...prev.filter(i => i.id !== inventoryItem.id), newInventoryItem]);
      } else {
        setInventory(prev => prev.filter(i => i.id !== inventoryItem.id));
      }
      updateProfile({ phoneNumber: inventoryItem.value });
    } else if (inventoryItem.type === 'username') {
      // Swap username
      const currentUsername = profile.username;
      const newInventoryItem: InventoryItem = {
        id: Date.now().toString(),
        type: 'username',
        value: currentUsername,
        name: 'Username',
        icon: '👤',
      };
      setInventory(prev => [...prev.filter(i => i.id !== inventoryItem.id), newInventoryItem]);
      updateProfile({ username: inventoryItem.value });
    }
  };

  const totalBalance = cryptos.reduce((sum, crypto) => sum + (crypto.amount * crypto.price), 0);
  const tonBalance = cryptos.find(c => c.symbol === 'TON')?.amount || 0;

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Modex Wallet</h1>
                <p className="text-xs text-purple-300">@{profile.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-white/60">TON Balance</p>
                <p className="text-lg font-bold text-white">{tonBalance.toFixed(2)} 💎</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                {profile.avatar}
              </div>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setCurrentView('wallet')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                currentView === 'wallet'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              💰 Wallet
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                currentView === 'profile'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              👤 Profile
            </button>
            <button
              onClick={() => setCurrentView('market')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                currentView === 'market'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              🛒 MDX Market
            </button>
            <button
              onClick={() => setCurrentView('gifts')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                currentView === 'gifts'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              🎁 NFT Gifts
            </button>
            <button
              onClick={() => setCurrentView('inventory')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                currentView === 'inventory'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              🎒 Инвентарь
            </button>
            <button
              onClick={() => setCurrentView('transfers')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                currentView === 'transfers'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              💸 Переводы
            </button>
            <button
              onClick={() => setCurrentView('chat')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                currentView === 'chat'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              💬 Чат
            </button>
            {currentUser.isAdmin && (
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  currentView === 'admin'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/50'
                    : 'bg-red-600/50 text-white hover:bg-red-600/70'
                }`}
              >
                🔧 Admin Panel
              </button>
            )}
            {currentUser.isAdmin && (
              <button
                onClick={() => setCurrentView('settings')}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  currentView === 'settings'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                ⚙️ Settings
              </button>
            )}
            {currentUser.isAdmin && (
              <button
                onClick={handleSwitchAccount}
                className="px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap bg-yellow-600/50 text-white hover:bg-yellow-600/70"
              >
                🔄 Switch Account
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap bg-white/10 text-white/70 hover:bg-red-600/50"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'wallet' && <Wallet cryptos={cryptos} totalBalance={totalBalance} />}
        {currentView === 'profile' && <Profile profile={profile} updateProfile={updateProfile} gifts={gifts} />}
        {currentView === 'market' && (
          <Market 
            gifts={allGifts} 
            purchaseItem={purchaseItem} 
            tonBalance={tonBalance}
            marketPhones={marketPhones}
            marketUsernames={marketUsernames}
          />
        )}
        {currentView === 'gifts' && <Gifts gifts={gifts} upgradeGift={upgradeGift} tonBalance={tonBalance} />}
        {currentView === 'inventory' && (
          <Inventory 
            inventory={inventory}
            swapInventoryItem={swapInventoryItem}
            currentPhone={profile.phoneNumber}
            currentUsername={profile.username}
          />
        )}
        {currentView === 'transfers' && (
          <Transfers
            cryptos={cryptos}
            transferCrypto={transferCrypto}
            transferLogs={transferLogs}
            userRole={currentUser.role}
            currentUsername={profile.username}
          />
        )}
        {currentView === 'chat' && <Chat currentUser={profile} />}
        {currentView === 'settings' && <Settings cryptos={cryptos} updateCrypto={updateCrypto} isAdmin={currentUser.isAdmin} />}
        {currentView === 'admin' && currentUser.isAdmin && (
          <AdminPanel
            allGifts={allGifts}
            addGift={addGift}
            updateGift={updateGift}
            deleteGift={deleteGift}
            marketPhones={marketPhones}
            addMarketPhone={addMarketPhone}
            updateMarketPhone={updateMarketPhone}
            deleteMarketPhone={deleteMarketPhone}
            marketUsernames={marketUsernames}
            addMarketUsername={addMarketUsername}
            updateMarketUsername={updateMarketUsername}
            deleteMarketUsername={deleteMarketUsername}
            grantPremium={grantPremium}
            grantPrefix={grantPrefix}
            changeUserRole={changeUserRole}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 pb-8 text-center text-white/40 text-sm">
        <p>⚠️ This is a demo wallet. Not real cryptocurrency.</p>
      </footer>
    </div>
  );
}

export default App;
