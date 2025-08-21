'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'admin' | 'faculty' | 'student',
    department: '',
    studentId: '',
    facultyId: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'faculty' && { department: formData.department, facultyId: formData.facultyId }),
        ...(formData.role === 'student' && { studentId: formData.studentId }),
      };

      await register(userData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
       <Input
         id="name"
         name="name"
         type="text"
         required
         value={formData.name}
         onChange={handleChange}
         placeholder="Enter your full name"
       />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
       <Input
         id="email"
         name="email"
         type="email"
         required
         value={formData.email}
         onChange={handleChange}
         placeholder="Enter your email"
       />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          id="role"
          name="role"
          required
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {formData.role === 'faculty' && (
        <>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
       <Input
         id="department"
         name="department"
         type="text"
         required
         value={formData.department}
         onChange={handleChange}
         placeholder="Enter department"
       />
          </div>
          <div>
            <label htmlFor="facultyId" className="block text-sm font-medium text-gray-700">
              Faculty ID
            </label>
       <Input
         id="facultyId"
         name="facultyId"
         type="text"
         required
         value={formData.facultyId}
         onChange={handleChange}
         placeholder="Enter faculty ID"
       />
          </div>
        </>
      )}

      {formData.role === 'student' && (
        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
            Student ID
          </label>
       <Input
         id="studentId"
         name="studentId"
         type="text"
         required
         value={formData.studentId}
         onChange={handleChange}
         placeholder="Enter student ID"
       />
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
       <Input
         id="password"
         name="password"
         type="password"
         required
         value={formData.password}
         onChange={handleChange}
         placeholder="Enter password"
       />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
       <Input
         id="confirmPassword"
         name="confirmPassword"
         type="password"
         required
         value={formData.confirmPassword}
         onChange={handleChange}
         placeholder="Confirm password"
       />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  );
}
