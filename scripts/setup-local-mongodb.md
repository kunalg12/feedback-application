# Local MongoDB Setup Guide

If you're experiencing SSL/TLS issues with MongoDB Atlas, you can use a local MongoDB installation instead.

## Option 1: MongoDB Community Server

### Windows Installation:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. Install MongoDB as a service
4. MongoDB will be available at: `mongodb://localhost:27017`

### macOS Installation (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Linux Installation (Ubuntu):
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Option 2: Docker MongoDB

If you have Docker installed:

```bash
# Pull and run MongoDB container
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Or with persistent storage
docker run -d --name mongodb -p 27017:27017 -v mongodb_data:/data/db mongo:latest
```

## Update Environment Variables

Once MongoDB is running locally, update your `.env.local` file:

```env
# Local MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/faculty-feedback-system

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Test Connection

After setting up local MongoDB:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Seed the database:
   ```bash
   npm run db:seed
   ```

## Benefits of Local MongoDB:
- No SSL/TLS issues
- Faster development
- No network dependencies
- Full control over the database

## Switching Back to Atlas

When you're ready to deploy or want to use Atlas again, simply update the `MONGODB_URI` in your `.env.local` file with your Atlas connection string.
