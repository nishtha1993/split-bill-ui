FROM node:14 as builder
WORKDIR /split-bill-ui
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE ${PORT}
CMD ["npm", "start"]


FROM nginx
EXPOSE 80
COPY --from=builder /split-bill-ui/build /usr/share/nginx/html