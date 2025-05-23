FROM python:3.10-slim

# Install dependencies
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs build-essential

# Create app directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app files
COPY . .

# Install node dependencies and build assets
RUN npm install && npm run build

# Use waitress for serving Flask
EXPOSE 5000
CMD ["waitress-serve", "--port=5000", "app:app"]
