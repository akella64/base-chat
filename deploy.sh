#!/bin/bash

# Загружаем переменные из файла .env
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '#' | awk '/=/ {print $1}')
else
  echo ".env file not found!"
  exit 1
fi

# Проверяем, что все необходимые переменные заданы
if [ -z "$DEPLOY_USER" ] || [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_PATH" ]; then
  echo "One or more required environment variables are not set (DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH)."
  exit 1
fi

# Очищаем директорию на удаленном сервере
ssh $DEPLOY_USER@$DEPLOY_HOST << EOF
  rm -rf $DEPLOY_PATH/*
EOF

# Синхронизация файлов с помощью rsync
rsync -avz --delete dist/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH

echo "Deployment completed successfully!"