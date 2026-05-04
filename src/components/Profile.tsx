import { useState } from 'react';
import { UserProfile, NFTGift } from '../App';

interface ProfileProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  gifts?: NFTGift[];
}

const avatarOptions = ['👤', '😀', '😎', '🤓', '🥳', '😇', '🤠', '👽', '🤖', '🐱', '🐶', '🐼', '🦊', '🐯', '🦁', '🐸', '🐵', '🦄', '🐲', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍🚀', '👩‍🚀'];

export function Profile({ profile, updateProfile, gifts = [] }: ProfileProps) {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(profile.username);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  const ownedGiftsCount = gifts.filter(g => g.owned).length;

  const handleUsernameChange = () => {
    const newUsername = tempUsername.trim();
    
    if (!newUsername || newUsername === profile.username) {
      return;
    }

    // Проверка на длину (минимум 5 символов для обычных пользователей)
    if (newUsername.length < 5) {
      alert('❌ Username должен быть минимум 5 символов! Купите короткий username в MDX Market.');
      return;
    }

    // Проверка на занятость username
    const users = JSON.parse(localStorage.getItem('modex-users') || '[]');
    const isTaken = users.some((u: any) => 
      u.profile.username.toLowerCase() === newUsername.toLowerCase() && 
      u.email !== localStorage.getItem('modex-current-user') ? JSON.parse(localStorage.getItem('modex-current-user') || '{}').email : ''
    );

    if (isTaken) {
      alert('❌ Этот username уже занят!');
      return;
    }

    updateProfile({ username: newUsername });
    setIsEditingUsername(false);
  };

  const handleAvatarChange = (avatar: string) => {
    updateProfile({ avatar });
    setShowAvatarPicker(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl shadow-purple-500/30">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-7xl shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                 onClick={() => setShowAvatarPicker(!showAvatarPicker)}>
              {profile.avatar}
            </div>
            <button
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="absolute bottom-0 right-0 w-10 h-10 bg-purple-700 hover:bg-purple-800 rounded-full flex items-center justify-center text-xl shadow-lg transition-all"
            >
              ✏️
            </button>
          </div>

          {showAvatarPicker && (
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 mb-4 max-w-md">
              <p className="text-white text-sm font-medium mb-3">Выберите аватар:</p>
              <div className="grid grid-cols-8 gap-2">
                {avatarOptions.map((avatar, index) => (
                  <button
                    key={index}
                    onClick={() => handleAvatarChange(avatar)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl hover:bg-white/20 transition-all ${
                      profile.avatar === avatar ? 'bg-white/30 ring-2 ring-white' : 'bg-white/10'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isEditingUsername ? (
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white mb-1 break-words">
                {profile.prefix && <span className="text-yellow-400">{profile.prefix} </span>}
                {profile.emojiInUsername && profile.isPremium && <span>{profile.emojiInUsername} </span>}
                @{profile.username}
              </h2>
              <button
                onClick={() => {
                  setIsEditingUsername(true);
                  setTempUsername(profile.username);
                }}
                className="text-purple-100 hover:text-white text-sm underline"
              >
                Изменить username
              </button>
            </div>
          ) : (
            <div className="mb-4 w-full max-w-md">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="username"
                  maxLength={32}
                />
                <button
                  onClick={handleUsernameChange}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                >
                  ✓
                </button>
                <button
                  onClick={() => setIsEditingUsername(false)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                >
                  ✕
                </button>
              </div>
              <p className="text-purple-100 text-xs mt-2">Только буквы, цифры и _</p>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3 mb-4">
            <p className="text-purple-100 text-sm mb-1">Номер телефона</p>
            <p className="text-white text-xl font-bold">
              {profile.phoneNumber || 'Не куплен'}
            </p>
          </div>

          {profile.isPremium && (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-6 py-2 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-white font-bold">Premium User</span>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3">
                <label className="block text-purple-100 text-sm mb-2">Эмодзи в username (Premium)</label>
                <input
                  type="text"
                  value={profile.emojiInUsername || ''}
                  onChange={(e) => updateProfile({ emojiInUsername: e.target.value })}
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-center text-2xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="😎"
                  maxLength={2}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Информация профиля</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <div>
                <p className="text-white/60 text-sm">Username</p>
                <p className="text-white font-medium">@{profile.username}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditingUsername(true)}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              Изменить
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <p className="text-white/60 text-sm">Номер телефона</p>
                <p className="text-white font-medium">
                  {profile.phoneNumber || 'Купите в MDX Market'}
                </p>
              </div>
            </div>
            {profile.phoneNumber && (
              <span className="text-green-400 text-sm">✓ Куплен</span>
            )}
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{profile.avatar}</span>
              <div>
                <p className="text-white/60 text-sm">Аватар</p>
                <p className="text-white font-medium">Нажмите чтобы изменить</p>
              </div>
            </div>
            <button
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              Выбрать
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-2">👤</div>
          <p className="text-2xl font-bold text-white truncate">@{profile.username}</p>
          <p className="text-white/60 text-sm">Username</p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-2">🎁</div>
          <p className="text-2xl font-bold text-white">
            {ownedGiftsCount}
          </p>
          <p className="text-white/60 text-sm">NFT Подарков</p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-2">📱</div>
          <p className="text-2xl font-bold text-white">
            {profile.phoneNumber ? '✓' : '✕'}
          </p>
          <p className="text-white/60 text-sm">Номер телефона</p>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>💾</span>
          <span>Информация об аккаунте</span>
        </h3>
        <div className="space-y-2 text-white/80 text-sm">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span>Сохранено NFT подарков:</span>
            <span className="text-white font-bold">{ownedGiftsCount} шт.</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span>Username:</span>
            <span className="text-white font-bold">@{profile.username}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span>Номер телефона:</span>
            <span className="text-white font-bold">
              {profile.phoneNumber || 'Не куплен'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span>Статус:</span>
            <span className="text-white font-bold">
              {profile.isPremium ? '⭐ Premium' : 'Free'}
            </span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>Подсказки</span>
        </h3>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Все данные автоматически сохраняются в вашем браузере</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Купите эксклюзивный номер телефона в MDX Market</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Собирайте NFT подарки и улучшайте их за TON</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Username и аватар можно менять бесплатно</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
