# Base image with Python
FROM python:3.10

# Set working directory
WORKDIR /app

# Install system dependencies for Node.js
RUN apt-get update && apt-get install -y curl

# Install Node.js (16.x LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Copy Node.js dependency files first
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Build frontend
RUN npm run build

# Copy Python requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install waitress
RUN pip install waitress

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the app using Waitress
CMD ["waitress-serve", "--port=5000", "app:app"]
