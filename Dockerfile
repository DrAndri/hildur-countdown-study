FROM node:alpine:latest AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

FROM node:alpine:latest
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
