'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  UsersIcon, 
  AcademicCapIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

interface AdminDashboardProps {
  activeTab: string;
}

export default function AdminDashboard({ activeTab }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalFeedback: 0,
    totalAttendance: 0,
  });

  useEffect(() => {
    // Fetch dashboard statistics
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // In a real app, you'd fetch these from your API
      setStats({
        totalUsers: 150,
        totalCourses: 25,
        totalFeedback: 1200,
        totalAttendance: 5000,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
        <p className="text-gray-600">Welcome to the Faculty Feedback System administration panel.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalUsers}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AcademicCapIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Courses</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalCourses}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardDocumentListIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Feedback</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalFeedback}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Attendance Records</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalAttendance}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full text-left p-3 border border-gray-200 bg-white hover:bg-gray-50">
              <div className="font-medium text-gray-900">Add New User</div>
              <div className="text-sm text-gray-500">Create faculty or student accounts</div>
            </Button>
            <Button className="w-full text-left p-3 border border-gray-200 bg-white hover:bg-gray-50">
              <div className="font-medium text-gray-900">Create Course</div>
              <div className="text-sm text-gray-500">Add new courses to the system</div>
            </Button>
            <Button className="w-full text-left p-3 border border-gray-200 bg-white hover:bg-gray-50">
              <div className="font-medium text-gray-900">Generate Reports</div>
              <div className="text-sm text-gray-500">View feedback and attendance reports</div>
            </Button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">New feedback submitted for CS101</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">Attendance marked for Mathematics</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">New course added: Advanced Physics</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardOverview();
      case 'users':
        return <div className="bg-white shadow rounded-lg p-6"><h2 className="text-xl font-semibold">User Management</h2><p className="text-gray-600 mt-2">Manage faculty and student accounts.</p></div>;
      case 'courses':
        return <div className="bg-white shadow rounded-lg p-6"><h2 className="text-xl font-semibold">Course Management</h2><p className="text-gray-600 mt-2">Manage courses and assignments.</p></div>;
      case 'reports':
        return <div className="bg-white shadow rounded-lg p-6"><h2 className="text-xl font-semibold">Reports & Analytics</h2><p className="text-gray-600 mt-2">View detailed reports and analytics.</p></div>;
      default:
        return renderDashboardOverview();
    }
  };

  return renderContent();
}
