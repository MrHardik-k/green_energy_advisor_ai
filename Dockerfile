# Use Node.js LTS image
FROM node:22.12.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "dev"]
