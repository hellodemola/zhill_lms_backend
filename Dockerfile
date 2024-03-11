FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./prisma ./prisma/
COPY .env.local ./
COPY . .
RUN npm install
RUN npx prisma generate
EXPOSE 8001
CMD ["yarn", "start"]
