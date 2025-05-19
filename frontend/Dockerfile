#fetching the latest node image on apline linux
FROM node:alpine AS builder

#declaring env
ENV NODE_ENV production

#setting up the work directory
WORKDIR /app

#installing dependencies
COPY ./package.json ./
RUN npm install

#copying all the files in our project
COPY . .

#building our application
RUN npm run build

#fetching the latest nginx image
FROM nginx

#copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

#copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf