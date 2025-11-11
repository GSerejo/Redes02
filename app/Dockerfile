FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# Copia a pasta 'public' para dentro da imagem
COPY public ./public
EXPOSE 3000
CMD [ "npm", "start" ]