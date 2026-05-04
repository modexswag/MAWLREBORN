import { useState, useEffect, useRef } from 'react';
import { ChatMessage, UserProfile } from '../App';

interface ChatProps {
  currentUser: UserProfile;
}

export function Chat({ currentUser }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('modex-chat-messages');
    if (!saved) return [];
    
    const allMessages: ChatMessage[] = JSON.parse(saved);
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    // Filter messages older than 1 day
    const recentMessages = allMessages.filter(m => m.timestamp > oneDayAgo);
    
    // Save filtered messages
    if (recentMessages.length !== allMessages.length) {
      localStorage.setItem('modex-chat-messages', JSON.stringify(recentMessages));
    }
    
    return recentMessages;
  });

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('modex-chat-messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      username: currentUser.username,
      message: newMessage.trim(),
      timestamp: Date.now(),
      avatar: currentUser.avatar,
      prefix: currentUser.prefix,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleString('ru-RU', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const getTimeUntilDeletion = () => {
    if (messages.length === 0) return null;
    const oldestMessage = messages[0];
    const deleteAt = oldestMessage.timestamp + 24 * 60 * 60 * 1000;
    const hoursLeft = Math.floor((deleteAt - Date.now()) / (60 * 60 * 1000));
    return hoursLeft;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 shadow-2xl shadow-blue-500/30">
        <h2 className="text-4xl font-bold text-white mb-2">💬 Глобальный чат</h2>
        <p className="text-blue-100">Общайтесь с другими пользователями Modex Wallet</p>
        {getTimeUntilDeletion() !== null && (
          <p className="text-blue-200 text-sm mt-2">
            ⏰ Старые сообщения удалятся через {getTimeUntilDeletion()}ч
          </p>
        )}
      </div>

      {/* Chat Container */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-white/40 text-lg">Чат пуст</p>
              <p className="text-white/30 text-sm">Напишите первое сообщение!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwn = msg.username === currentUser.username;
              
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div className={`flex-1 ${isOwn ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {!isOwn && msg.prefix && (
                        <span className="text-yellow-400 text-xs font-bold">{msg.prefix}</span>
                      )}
                      <span className={`font-bold text-sm ${isOwn ? 'text-purple-300' : 'text-white'}`}>
                        @{msg.username}
                      </span>
                      <span className="text-white/40 text-xs">{formatTime(msg.timestamp)}</span>
                      {isOwn && msg.prefix && (
                        <span className="text-yellow-400 text-xs font-bold">{msg.prefix}</span>
                      )}
                    </div>
                    <div
                      className={`inline-block px-4 py-2 rounded-2xl ${
                        isOwn
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <p className="break-words whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Написать сообщение..."
              maxLength={500}
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                newMessage.trim()
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              📤 Отправить
            </button>
          </div>
          <p className="text-white/40 text-xs mt-2">
            💡 Enter для отправки • Макс. {newMessage.length}/500 символов
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>ℹ️</span>
          <span>Правила чата</span>
        </h3>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Сообщения автоматически удаляются через 24 часа</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Будьте вежливы и уважительны к другим пользователям</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Максимальная длина сообщения - 500 символов</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            <span>Префиксы отображаются только у тех, кому они выданы</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
