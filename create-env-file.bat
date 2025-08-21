@echo off
echo Creating .env.local file for Faculty Feedback System...
echo.

echo MONGODB_URI=mongodb+srv://kunal2923:kunal2923@cluster0.lcpy4sq.mongodb.net/faculty-feedback-system?retryWrites=true^&w=majority > .env.local
echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production >> .env.local

echo ✅ .env.local file created successfully!
echo.
echo File contents:
type .env.local
echo.
echo Now you can run: npm run db:seed
pause
