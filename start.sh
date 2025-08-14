#!/bin/bash

echo "🚀 Starting AI Resume Builder..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Install client dependencies if needed
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client && npm install && cd ..
fi

# Build the client if dist doesn't exist
if [ ! -d "client/dist" ]; then
    echo "🔨 Building frontend..."
    cd client && npm run build && cd ..
fi

# Start the server
echo "🌟 Starting server on http://localhost:3001"
echo "📝 Open your browser and visit: http://localhost:3001"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

node server.js