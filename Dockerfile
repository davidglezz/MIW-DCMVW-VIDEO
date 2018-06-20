FROM node:alpine

WORKDIR /app
COPY package.json .
COPY app.js .
COPY dist dist
COPY presentacion dist/presentacion

RUN npm install --production

EXPOSE 8010
#VOLUME ["/app/dist"]

CMD ["node", "app.js"]
