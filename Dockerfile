
FROM node:alpine

# Установите рабочую директорию в контейнере
WORKDIR /app

# Установите зависимости (файл package.json и package-lock.json)
COPY package.json .
COPY package-lock.json .

RUN npm install

# Скопируйте все файлы проекта в контейнер
COPY . .

# Установите порт, на котором будет работать приложение
EXPOSE 5000

# Запустите разработку Next.js приложения
CMD ["npm", "run", "dev"]

