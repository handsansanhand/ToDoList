#stage 1: build the react app
FROM node:18-alpine as frontend_build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#stage 2: Serve with nginx + proxy config
FROM nginx:alpine
#copy custom nginx config into container
COPY nginx.conf /etc/nginx/nginx.conf
#copy built React files into nginx served directory
COPY --from=frontend_build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
