# React Client Dockerfile (Vite Preview)
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Expose preview port
EXPOSE 8001

# Start preview server
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
