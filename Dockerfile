FROM node:16-alpine as builder

ENV PORT=3000

WORKDIR /split-bill-ui
COPY . /split-bill-ui
RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "start"]


FROM nginx:1.22.1-alpine as prod-stage
COPY --from=builder /split-bill-ui/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]