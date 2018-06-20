FROM mhart/alpine-node:8

WORKDIR /app
COPY dist .
COPY presentacion dist/presentacion
COPY app.js .
COPY package.json .

RUN npm install --production

EXPOSE 8010
CMD ["node", "app.js"]
