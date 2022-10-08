FROM node:latest
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps --quiet
ENTRYPOINT npm start