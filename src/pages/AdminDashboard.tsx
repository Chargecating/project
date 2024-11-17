import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  UserPlus, 
  LogOut,
  LayoutDashboard,
  Clock,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import EmployeeList from '../components/employees/EmployeeList';
import PayrollList from '../components/payroll/PayrollList';
import AttendanceTracker from '../components/attendance/AttendanceTracker';
import TimeTracking from '../components/time/TimeTracking';
import StaffManagement from '../components/staff/StaffManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Employees', path: '/admin/employees' },
    { icon: DollarSign, label: 'Payroll', path: '/admin/payroll' },
    { icon: Calendar, label: 'Attendance', path: '/admin/attendance' },
    { icon: Clock, label: 'Time Tracking', path: '/admin/time-tracking' },
    { icon: UserPlus, label: 'Manage Staff', path: '/admin/manage-staff' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">HR Admin</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/payroll" element={<PayrollList />} />
          <Route path="/attendance" element={<AttendanceTracker />} />
          <Route path="/time-tracking" element={<TimeTracking />} />
          <Route path="/manage-staff" element={<StaffManagement />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardContent = () => {
  const stats = [
    { label: 'Total Employees', value: '156', color: 'bg-blue-500' },
    { label: 'Present Today', value: '142', color: 'bg-green-500' },
    { label: 'On Leave', value: '14', color: 'bg-yellow-500' },
    { label: 'New Requests', value: '5', color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-gray-600 text-sm">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center py-3 border-b">
            <div className="bg-blue-100 p-2 rounded-full mr-4">
              <UserPlus className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-800">New employee John Doe added to the system</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;