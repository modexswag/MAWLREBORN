import { useState } from 'react';

export interface User {
  email: string;
  password: string;
  isAdmin: boolean;
  role: 'user' | 'moderator' | 'admin';
  profile: {
    avatar: string;
    username: string;
    phoneNumber: string;
    isPremium: boolean;
    premiumUntil?: number;
    prefix?: string;
    emojiInUsername?: string;
  };
  cryptos: any[];
  gifts: any[];
  inventory: any[];
}

interface AuthProps {
  onLogin: (user: User) => void;
}

const ADMIN_EMAIL = 'andrejkn27@gmail.com';
const ADMIN_PASSWORD = '04042014an';

const getInitialCryptos = (isAdmin: boolean) => {
  if (isAdmin) {
    return [
      { id: '1', name: 'Bitcoin', symbol: 'BTC', amount: 0.5, price: 65000, icon: '₿', color: 'from-orange-500 to-yellow-500' },
      { id: '2', name: 'Ethereum', symbol: 'ETH', amount: 2.5, price: 3500, icon: 'Ξ', color: 'from-purple-500 to-blue-500' },
      { id: '3', name: 'Solana', symbol: 'SOL', amount: 10, price: 150, icon: '◎', color: 'from-purple-600 to-pink-500' },
      { id: '4', name: 'Toncoin', symbol: 'TON', amount: 500, price: 5.5, icon: '💎', color: 'from-blue-500 to-cyan-500' },
      { id: '5', name: 'Cardano', symbol: 'ADA', amount: 1000, price: 0.65, icon: '₳', color: 'from-blue-600 to-indigo-500' },
      { id: '6', name: 'Ripple', symbol: 'XRP', amount: 500, price: 0.55, icon: '✕', color: 'from-gray-600 to-slate-500' },
      { id: '7', name: 'Polkadot', symbol: 'DOT', amount: 100, price: 8.5, icon: '●', color: 'from-pink-500 to-rose-500' },
      { id: '8', name: 'Dogecoin', symbol: 'DOGE', amount: 5000, price: 0.15, icon: 'Ð', color: 'from-yellow-500 to-amber-500' },
    ];
  } else {
    return [
      { id: '1', name: 'Bitcoin', symbol: 'BTC', amount: 0, price: 65000, icon: '₿', color: 'from-orange-500 to-yellow-500' },
      { id: '2', name: 'Ethereum', symbol: 'ETH', amount: 0, price: 3500, icon: 'Ξ', color: 'from-purple-500 to-blue-500' },
      { id: '3', name: 'Solana', symbol: 'SOL', amount: 0, price: 150, icon: '◎', color: 'from-purple-600 to-pink-500' },
      { id: '4', name: 'Toncoin', symbol: 'TON', amount: 18.18, price: 5.5, icon: '💎', color: 'from-blue-500 to-cyan-500' },
      { id: '5', name: 'Cardano', symbol: 'ADA', amount: 0, price: 0.65, icon: '₳', color: 'from-blue-600 to-indigo-500' },
      { id: '6', name: 'Ripple', symbol: 'XRP', amount: 0, price: 0.55, icon: '✕', color: 'from-gray-600 to-slate-500' },
      { id: '7', name: 'Polkadot', symbol: 'DOT', amount: 0, price: 8.5, icon: '●', color: 'from-pink-500 to-rose-500' },
      { id: '8', name: 'Dogecoin', symbol: 'DOGE', amount: 0, price: 0.15, icon: 'Ð', color: 'from-yellow-500 to-amber-500' },
      { id: '9', name: 'USDT', symbol: 'USDT', amount: 100, price: 1, icon: '💵', color: 'from-green-500 to-emerald-500' },
    ];
  }
};

const initialGifts = [
  { id: '1', name: 'Delicious Cake', emoji: '🎂', rarity: 'common' as const, level: 1, owned: false, color: 'from-pink-500 to-rose-500', bonus: 10 },
  { id: '2', name: 'Green Star', emoji: '⭐', rarity: 'common' as const, level: 1, owned: false, color: 'from-green-500 to-emerald-500', bonus: 15 },
  { id: '3', name: 'Blue Star', emoji: '🌟', rarity: 'rare' as const, level: 1, owned: false, color: 'from-blue-500 to-cyan-500', bonus: 25 },
  { id: '4', name: 'Red Heart', emoji: '❤️', rarity: 'rare' as const, level: 1, owned: false, color: 'from-red-500 to-pink-500', bonus: 30 },
  { id: '5', name: 'Golden Trophy', emoji: '🏆', rarity: 'epic' as const, level: 1, owned: false, color: 'from-yellow-500 to-orange-500', bonus: 50 },
  { id: '6', name: 'Diamond Ring', emoji: '💍', rarity: 'epic' as const, level: 1, owned: false, color: 'from-purple-500 to-pink-500', bonus: 60 },
  { id: '7', name: 'Crown', emoji: '👑', rarity: 'legendary' as const, level: 1, owned: false, color: 'from-yellow-600 to-amber-600', bonus: 100 },
  { id: '8', name: 'Unicorn', emoji: '🦄', rarity: 'legendary' as const, level: 1, owned: false, color: 'from-purple-600 to-pink-600', bonus: 120 },
];

export function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [adminSessions] = useState<User[]>(() => {
    const sessions = localStorage.getItem('modex-admin-sessions');
    return sessions ? JSON.parse(sessions) : [];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('modex-users') || '[]');

    if (isLogin) {
      const user = users.find(u => u.email === email);
      
      if (!user) {
        setError('Пользователь не найден');
        return;
      }

      if (user.password !== password) {
        setError('Неверный пароль');
        return;
      }

      onLogin(user);
    } else {
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        setError('Пользователь с таким email уже существует');
        return;
      }

      const isAdmin = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
      
      const initialProfile = {
        avatar: '👤',
        username: 'user' + Math.floor(Math.random() * 10000),
        phoneNumber: '',
        isPremium: isAdmin,
        premiumUntil: 0,
        prefix: '',
        emojiInUsername: '',
      };

      const newUser: User = {
        email,
        password,
        isAdmin,
        role: isAdmin ? 'admin' : 'user',
        profile: initialProfile,
        cryptos: getInitialCryptos(isAdmin),
        gifts: initialGifts,
        inventory: [],
      };

      users.push(newUser);
      localStorage.setItem('modex-users', JSON.stringify(users));
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-2xl">
            <span className="text-5xl">💼</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Modex Wallet</h1>
          <p className="text-purple-300">Криптовалютный кошелек</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                isLogin
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                !isLogin
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-300 text-sm">❌ {error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {isLogin ? '🔓 Войти' : '✨ Зарегистрироваться'}
            </button>
          </form>

          {adminSessions.length > 0 && (
            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-300 text-sm font-medium mb-3">
                🔄 Быстрый вход в админ-сессии:
              </p>
              <div className="space-y-2">
                {adminSessions.map((session) => (
                  <button
                    key={session.email}
                    onClick={() => onLogin(session)}
                    className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm transition-all"
                  >
                    👑 {session.profile.username} ({session.email})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-white/40 text-sm">
          <p>🔒 Безопасное хранение данных в браузере</p>
        </div>
      </div>
    </div>
  );
}
