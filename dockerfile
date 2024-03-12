# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app
# Install Linux kernel headers
RUN npm install v4l2camera
# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app will run on (adjust as needed)
EXPOSE 3000

# Define the command to start your Node.js application
CMD ["npm", "start"]
