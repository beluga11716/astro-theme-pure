FROM node:24-bookworm AS build

WORKDIR /web

RUN apt-get update && \
    apt-get install -y --no-install-recommends fontconfig && \
    rm -rf /var/lib/apt/lists/*
    
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV ASTRO_TELEMETRY_DISABLED=1

EXPOSE 4321