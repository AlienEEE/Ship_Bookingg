FROM node:14.17.1-alpine
ENV NODE_ENV=production
WORKDIR /app 
COPY . /app
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node","index.js"]
