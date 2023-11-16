# Stage 1
FROM node:18.15.0 as node

WORKDIR /src/app

COPY . .

RUN npm install
RUN npm run build --prod

# Stage 2
FROM nginx:alpine

COPY --from=node /src/app/dist/devops-test-front /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200