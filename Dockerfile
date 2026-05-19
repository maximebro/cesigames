FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules/.bin/vite ./node_modules/.bin/vite
COPY --from=build /app/node_modules/vite ./node_modules/vite
RUN npm ci --omit=dev
EXPOSE 4173
CMD ["npm", "run", "preview"]