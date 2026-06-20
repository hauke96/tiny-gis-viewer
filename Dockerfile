# Stage 1: Build
#
# https://hub.docker.com/_/node
#
FROM node:26-alpine AS builder

RUN mkdir /app
COPY src /app/src
COPY public /app/public
COPY *.json /app/
WORKDIR /app/

RUN npm install
RUN npm run build

# Stage 2: Run
#
# https://hub.docker.com/_/nginx
#
FROM nginx:1.31-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/tiny-gis-viewer/browser /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
