# 🚀 Инструкция по размещению на GitHub Pages

## 📦 Подготовка

Проект уже настроен для GitHub Pages! Все необходимые файлы созданы.

## 🎯 Пошаговая инструкция

### Шаг 1: Создание репозитория

1. Перейдите на [GitHub](https://github.com)
2. Нажмите "New repository"
3. Введите название (например: `modex-wallet`)
4. Выберите Public или Private
5. НЕ добавляйте README, .gitignore (они уже есть)
6. Нажмите "Create repository"

### Шаг 2: Загрузка кода

Выполните команды в терминале в папке проекта:

```bash
# Инициализация git (если еще не сделано)
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: Modex Wallet"

# Привязка к репозиторию (замените YOUR_USERNAME и YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Загрузка кода
git branch -M main
git push -u origin main
```

### Шаг 3: Настройка GitHub Pages

1. Откройте ваш репозиторий на GitHub
2. Перейдите в **Settings** (⚙️)
3. В боковом меню выберите **Pages**
4. В разделе **Source** выберите:
   - Source: **GitHub Actions**
5. Сохраните настройки

### Шаг 4: Деплой

После push в ветку `main`:
1. GitHub Actions автоматически запустит сборку
2. Перейдите во вкладку **Actions** чтобы увидеть процесс
3. Когда процесс завершится (зеленая галочка ✅)
4. Ваш сайт будет доступен по адресу:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

### Шаг 5: Проверка

1. Откройте ссылку на ваш сайт
2. Проверьте что все работает
3. Зарегистрируйтесь и проверьте функционал

## 🔄 Обновление сайта

Когда вы внесете изменения в код:

```bash
git add .
git commit -m "Описание изменений"
git push
```

Сайт автоматически обновится через 1-2 минуты!

## 🐛 Возможные проблемы

### 1. Сайт не открывается
- Проверьте что Actions успешно выполнились (вкладка Actions)
- Убедитесь что в Settings → Pages выбран "GitHub Actions"
- Подождите 2-3 минуты после деплоя

### 2. 404 ошибка
- Проверьте что base в vite.config.ts установлен в './'
- Очистите кеш браузера (Ctrl+Shift+R)

### 3. Actions не запускаются
- Проверьте что файл `.github/workflows/deploy.yml` существует
- В Settings → Actions → General → Workflow permissions
  - Выберите "Read and write permissions"
  - Сохраните

## 📱 Тестирование

После деплоя проверьте:
- ✅ Регистрация работает
- ✅ Данные сохраняются в localStorage
- ✅ Все вкладки открываются
- ✅ Покупки работают
- ✅ Переводы работают
- ✅ Админ-панель доступна (andrejkn27@gmail.com)

## 🎉 Готово!

Теперь ваш криптовалютный кошелек доступен онлайн!

Делитесь ссылкой:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

## 💡 Полезные команды

```bash
# Просмотр статуса
git status

# Просмотр изменений
git diff

# Откат изменений
git checkout -- .

# Просмотр истории
git log

# Создание новой ветки
git checkout -b feature-name

# Переключение веток
git checkout main
```

## 🔗 Полезные ссылки

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev/)

---

Удачи! 🚀
