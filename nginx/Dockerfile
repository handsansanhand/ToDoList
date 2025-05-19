FROM nginx:alpine

# Copy nginx.conf into container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built React files from frontend build container
COPY --from=frontend_build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]