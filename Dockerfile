FROM node:16 as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm start

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html

