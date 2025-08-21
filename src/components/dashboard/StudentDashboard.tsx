'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  AcademicCapIcon, 
  ClipboardDocumentListIcon, 
  ClockIcon, 
  StarIcon 
} from '@heroicons/react/24/outline';

interface StudentDashboardProps {
  activeTab: string;
}

export default function StudentDashboard({ activeTab }: StudentDashboardProps) {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    attendanceRate: 0,
    feedbackSubmitted: 0,
    averageGrade: 0,
  });

  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [recentAttendance, setRecentAttendance] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchEnrolledCourses();
    fetchRecentAttendance();
  }, []);

  const fetchStats = async () => {
    try {
      // In a real app, you'd fetch these from your API
      setStats({
        enrolledCourses: 5,
        attendanceRate: 92,
        feedbackSubmitted: 3,
        averageGrade: 85,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      // Mock data - in real app, fetch from API
      setEnrolledCourses([
        { id: 1, code: 'CS101', name: 'Introduction to Computer Science', faculty: 'Dr. Smith', attendance: 95, nextClass: '2024-01-16 10:00 AM' },
        { id: 2, code: 'MATH201', name: 'Calculus II', faculty: 'Dr. Johnson', attendance: 88, nextClass: '2024-01-16 2:00 PM' },
        { id: 3, code: 'PHYS101', name: 'Physics I', faculty: 'Dr. Brown', attendance: 92, nextClass: '2024-01-17 9:00 AM' },
        { id: 4, code: 'ENG101', name: 'English Composition', faculty: 'Dr. Davis', attendance: 90, nextClass: '2024-01-17 1:00 PM' },
        { id: 5, code: 'HIST101', name: 'World History', faculty: 'Dr. Wilson', attendance: 85, nextClass: '2024-01-18 11:00 AM' },
      ]);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchRecentAttendance = async () => {
    try {
      // Mock data - in real app, fetch from API
      setRecentAttendance([
        { id: 1, course: 'CS101', date: '2024-01-15', status: 'present' },
        { id: 2, course: 'MATH201', date: '2024-01-15', status: 'present' },
        { id: 3, course: 'PHYS101', date: '2024-01-14', status: 'present' },
        { id: 4, course: 'ENG101', date: '2024-01-14', status: 'late' },
        { id: 5, course: 'HIST101', date: '2024-01-13', status: 'absent' },
      ]);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Dashboard</h2>
        <p className="text-gray-600">Track your courses, attendance, and submit feedback.</p>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Enrolled Courses</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.enrolledCourses}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Attendance Rate</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.attendanceRate}%</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Feedback Submitted</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.feedbackSubmitted}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Grade</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.averageGrade}%</dd>
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
            {enrolledCourses.map((course: any) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{course.code} - {course.name}</h4>
                    <p className="text-sm text-gray-500">Faculty: {course.faculty}</p>
                    <p className="text-sm text-gray-500">Attendance: {course.attendance}%</p>
                    <p className="text-sm text-gray-500">Next Class: {course.nextClass}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="text-blue-600 hover:text-blue-800 text-sm font-medium p-0 h-auto bg-transparent">
                      View Details
                    </Button>
                    <Button className="text-green-600 hover:text-green-800 text-sm font-medium p-0 h-auto bg-transparent">
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Attendance</h3>
          <div className="space-y-4">
            {recentAttendance.map((record: any) => (
              <div key={record.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{record.course}</h4>
                  <p className="text-sm text-gray-500">{record.date}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left bg-white">
            <div className="font-medium text-gray-900">Submit Feedback</div>
            <div className="text-sm text-gray-500">Rate your courses and faculty</div>
          </Button>
          <Button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left bg-white">
            <div className="font-medium text-gray-900">View Schedule</div>
            <div className="text-sm text-gray-500">Check your class schedule</div>
          </Button>
          <Button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left bg-white">
            <div className="font-medium text-gray-900">Attendance History</div>
            <div className="text-sm text-gray-500">View your attendance records</div>
          </Button>
          <Button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left bg-white">
            <div className="font-medium text-gray-900">Course Materials</div>
            <div className="text-sm text-gray-500">Access course content</div>
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
        return <div className="bg-white shadow rounded-lg p-6"><h2 className="text-xl font-semibold">My Courses</h2><p className="text-gray-600 mt-2">View your enrolled courses and materials.</p></div>;
      case 'attendance':
        return <div className="bg-white shadow rounded-lg p-6"><h2 className="text-xl font-semibold">My Attendance</h2><p className="text-gray-600 mt-2">Track your attendance records.</p></div>;
      case 'feedback':
        return <div className="bg-white shadow rounded-lg p-6"><h2 className="text-xl font-semibold">Submit Feedback</h2><p className="text-gray-600 mt-2">Provide feedback for your courses and faculty.</p></div>;
      default:
        return renderDashboardOverview();
    }
  };

  return renderContent();
}
