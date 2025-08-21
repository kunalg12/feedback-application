@echo off
echo Installing MongoDB for Faculty Feedback System...
echo.

echo Step 1: Downloading MongoDB Community Server...
echo Please download MongoDB Community Server from:
echo https://www.mongodb.com/try/download/community
echo.
echo After downloading, run the installer and follow these steps:
echo 1. Choose "Complete" installation
echo 2. Install MongoDB as a service
echo 3. Complete the installation
echo.

echo Step 2: After installation, create .env.local file with:
echo MONGODB_URI=mongodb://localhost:27017/faculty-feedback-system
echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
echo.

echo Step 3: Start the application:
echo npm run dev
echo.

echo Step 4: Seed the database:
echo npm run db:seed
echo.

pause
