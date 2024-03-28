FROM node:16-alpine as builder

WORKDIR /split-bill-ui
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /split-bill-ui/build /usr/share/nginx/html