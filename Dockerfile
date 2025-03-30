# Stage 1: Buil
FROM node:22-alpine AS builder

RUN mkdir /app
COPY src /app/src
COPY public /app/public
COPY *.json /app/
WORKDIR /app/

RUN npm install
RUN npm run build

# Stage 2: Run
FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/tiny-gis-viewer/browser /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
