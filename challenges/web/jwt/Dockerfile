# base image
FROM node:18-slim
# Set working directory
WORKDIR /app
COPY ./challenge . 
RUN npm install
CMD ["node","server.js"]