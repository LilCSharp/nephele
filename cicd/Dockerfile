FROM node:21-alpine

# Set the working directory
WORKDIR /app

# Copy and install the project dependencies
COPY package*.json ./
RUN npm install

# Copy and build the project
COPY src/ .
RUN npm run build

# Expose and run the app
EXPOSE 3000
CMD ["npm", "start"]