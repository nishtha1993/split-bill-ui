FROM node:16 as builder
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn start

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html

