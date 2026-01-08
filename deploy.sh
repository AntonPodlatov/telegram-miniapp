#!/bin/bash

echo "🚀 Начинаем деплой Telegram Mini App на Yandex Cloud"

# 1. Сборка проекта
echo "📦 Сборка проекта..."
npm run build

# 2. Проверка наличия YC CLI
if ! command -v yc &> /dev/null; then
    echo "❌ YC CLI не установлен. Установите: https://cloud.yandex.ru/docs/cli/quickstart"
    exit 1
fi

# 3. Авторизация в Yandex Cloud
echo "🔐 Проверка авторизации в Yandex Cloud..."
yc config list &> /dev/null
if [ $? -ne 0 ]; then
    echo "Требуется авторизация в Yandex Cloud..."
    yc init
fi

# 4. Загрузка в Object Storage
echo "📤 Загрузка файлов в Object Storage..."
BUCKET_NAME="telegram-mini-app"

# Создаем бакет если не существует
if ! yc storage bucket get $BUCKET_NAME &> /dev/null; then
    echo "Создаем бакет $BUCKET_NAME..."
    yc storage bucket create \
        --name $BUCKET_NAME \
        --default-storage-class standard \
        --max-size 1073741824 \
        --public-read
fi

# Загружаем файлы
echo "Загружаем файлы..."
yc storage object upload \
    --bucket-name $BUCKET_NAME \
    --path "dist/" \
    --recursive \
    --source "dist/"

# 5. Настраиваем хостинг
echo "⚙️ Настраиваем статический хостинг..."
yc storage bucket update \
    --name $BUCKET_NAME \
    --index-page "index.html" \
    --error-page "index.html"

# 6. Получаем публичный URL
echo "🌐 Публичный URL вашего приложения:"
yc storage bucket get $BUCKET_NAME --full | grep -o 'https://.*\.website\.yandexcloud\.net'

echo "✅ Деплой завершен!"