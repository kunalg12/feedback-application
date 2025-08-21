# Quick Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create `.env.local` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/faculty-feedback-system
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

3. **Start MongoDB** (if using local MongoDB)
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

4. **Seed the database** (optional)
   ```bash
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Default Login Credentials

If you ran the database seed script, you can use these credentials:

### Admin Access
- **Email**: admin@university.edu
- **Password**: admin123

### Faculty Access
- **Email**: john.smith@university.edu
- **Password**: faculty123

### Student Access
- **Email**: alice.johnson@student.university.edu
- **Password**: student123

## Features Overview

### 🔐 Authentication
- Multi-role user system (Admin, Faculty, Student)
- Secure JWT-based authentication
- Role-based access control

### 👨‍🏫 Faculty Features
- Course management
- Student attendance tracking
- View student feedback
- Analytics dashboard

### 👨‍🎓 Student Features
- Course enrollment
- Attendance tracking
- Submit feedback
- Personal dashboard

### 👨‍💼 Admin Features
- User management
- Course administration
- System-wide analytics
- Reports generation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database (clear all data)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   └── ui/                # Reusable UI components
├── contexts/              # React contexts
├── lib/                   # Utility functions
└── models/                # MongoDB models
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/courses` - Get courses
- `POST /api/courses` - Create course
- `GET /api/attendance` - Get attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/feedback` - Get feedback
- `POST /api/feedback` - Submit feedback

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string in `.env.local`
- For MongoDB Atlas, use the connection string from your cluster

### Port Already in Use
- Change the port in `package.json` scripts
- Or kill the process using port 3000

### TypeScript Errors
- Run `npm run type-check` to see specific errors
- Ensure all dependencies are installed

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Support

For issues and questions:
1. Check the README.md for detailed documentation
2. Review the console for error messages
3. Ensure all prerequisites are met
4. Verify environment variables are set correctly
