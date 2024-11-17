import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Calendar,
  Clock,
  FileText,
  Settings,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import EmployeeProfile from '../components/employee/EmployeeProfile';
import LeaveRequests from '../components/employee/LeaveRequests';
import TimeSheet from '../components/employee/TimeSheet';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/employee/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/employee/dashboard' },
    { icon: User, label: 'My Profile', path: '/employee/profile' },
    { icon: Calendar, label: 'Leave Requests', path: '/employee/leave' },
    { icon: Clock, label: 'Time Sheet', path: '/employee/timesheet' },
    { icon: FileText, label: 'Documents', path: '/employee/documents' },
    { icon: Settings, label: 'Settings', path: '/employee/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Employee Portal</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 w-full"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/dashboard" element={<DashboardContent />} />
          <Route path="/profile" element={<EmployeeProfile />} />
          <Route path="/leave" element={<LeaveRequests />} />
          <Route path="/timesheet" element={<TimeSheet />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardContent = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back, John!</h1>
        <p className="text-gray-600">{today}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Time Sheet</h2>
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">08:45</div>
          <p className="text-sm text-gray-600">Hours Today</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Leave Balance</h2>
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">15</div>
          <p className="text-sm text-gray-600">Days Available</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Pending Tasks</h2>
            <FileText className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">3</div>
          <p className="text-sm text-gray-600">To Complete</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Announcements</h2>
            <Settings className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">2</div>
          <p className="text-sm text-gray-600">New Updates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center py-2 border-b">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-800">Leave request approved</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center py-2 border-b">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-800">Checked in for the day</p>
                <p className="text-xs text-gray-500">8 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="flex items-center py-2 border-b">
              <div className="bg-purple-100 p-2 rounded-full mr-4">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-800">Team Meeting</p>
                <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center py-2 border-b">
              <div className="bg-yellow-100 p-2 rounded-full mr-4">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-800">Project Deadline</p>
                <p className="text-xs text-gray-500">Friday, 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;