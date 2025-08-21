'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  AcademicCapIcon, 
  ClipboardDocumentListIcon, 
  UserGroupIcon, 
  StarIcon 
} from '@heroicons/react/24/outline';

interface FacultyDashboardProps {
  activeTab: string;
}

export default function FacultyDashboard({ activeTab }: FacultyDashboardProps) {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalFeedback: 0,
    averageRating: 0,
  });

  const [courses, setCourses] = useState<any[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchCourses();
    fetchRecentFeedback();
  }, []);

  const fetchStats = async () => {
    try {
      // In a real app, you'd fetch these from your API
      setStats({
        totalCourses: 4,
        totalStudents: 120,
        totalFeedback: 85,
        averageRating: 4.2,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      // Mock data - in real app, fetch from API
      setCourses([
        { id: 1, code: 'CS101', name: 'Introduction to Computer Science', students: 30, semester: 'Fall 2024' },
        { id: 2, code: 'CS201', name: 'Data Structures', students: 25, semester: 'Fall 2024' },
        { id: 3, code: 'CS301', name: 'Algorithms', students: 20, semester: 'Fall 2024' },
        { id: 4, code: 'CS401', name: 'Software Engineering', students: 15, semester: 'Fall 2024' },
      ]);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchRecentFeedback = async () => {
    try {
      // Mock data - in real app, fetch from API
      setRecentFeedback([
        { id: 1, course: 'CS101', rating: 4.5, comment: 'Great teaching style and clear explanations', date: '2024-01-15' },
        { id: 2, course: 'CS201', rating: 4.0, comment: 'Good course structure and helpful assignments', date: '2024-01-14' },
        { id: 3, course: 'CS301', rating: 4.8, comment: 'Excellent problem-solving approach', date: '2024-01-13' },
      ]);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Faculty Dashboard</h2>
        <p className="text-gray-600">Manage your courses, view feedback, and track attendance.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AcademicCapIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">My Courses</dt>
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
                <UserGroupIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalStudents}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Feedback Received</dt>
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
                <StarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.averageRating}/5.0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">My Courses</h3>
          <div className="space-y-4">
            {courses.map((course: any) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{course.code} - {course.name}</h4>
                    <p className="text-sm text-gray-500">{course.semester}</p>
                    <p className="text-sm text-gray-500">{course.students} students enrolled</p>
                  </div>
                  <Button className="text-blue-600 hover:text-blue-800 text-sm font-medium p-0 h-auto bg-transparent">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Feedback</h3>
          <div className="space-y-4">
            {recentFeedback.map((feedback: any) => (
              <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{feedback.course}</h4>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{feedback.rating}/5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{feedback.comment}</p>
                <p className="text-xs text-gray-500">{feedback.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left bg-white">
            <div className="font-medium text-gray-900">Mark Attendance</div>
            <div className="text-sm text-gray-500">Record student attendance</div>
          </Button>
          <Button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left bg-white">
            <div className="font-medium text-gray-900">View Feedback</div>
            <div className="text-sm text-gray-500">Check student feedback</div>
          </Button>
          <Button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left bg-white">
            <div className="font-medium text-gray-900">Course Materials</div>
            <div className="text-sm text-gray-500">Upload course content</div>
          </Button>
          <Button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left bg-white">
            <div className="font-medium text-gray-900">Generate Reports</div>
            <div className="text-sm text-gray-500">View detailed analytics</div>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardOverview();
      case 'courses':
        return <div className="bg-white shadow rounded-lg p-6"><h2 className="text-xl font-semibold">My Courses</h2><p className="text-gray-600 mt-2">Manage your course assignments and materials.</p></div>;
      case 'attendance':
        return <div className="bg-white shadow rounded-lg p-6"><h2 className="text-xl font-semibold">Attendance Management</h2><p className="text-gray-600 mt-2">Mark and track student attendance.</p></div>;
      case 'feedback':
        return <div className="bg-white shadow rounded-lg p-6"><h2 className="text-xl font-semibold">Student Feedback</h2><p className="text-gray-600 mt-2">View and analyze student feedback.</p></div>;
      default:
        return renderDashboardOverview();
    }
  };

  return renderContent();
}
