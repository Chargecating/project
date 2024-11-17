import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, UserCheck, UserX } from 'lucide-react';
import DateRangePicker from '../common/DateRangePicker';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half_day';
}

const attendanceRecords: AttendanceRecord[] = [
  {
    id: 'ATT001',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    date: '2024-03-14',
    checkIn: '09:00',
    checkOut: '17:00',
    status: 'present'
  },
  {
    id: 'ATT002',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    date: '2024-03-14',
    checkIn: '09:30',
    checkOut: '17:00',
    status: 'late'
  }
];

const AttendanceTracker = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState({ startDate: '', endDate: '' });

  const handleDateRangeSelect = (startDate: string, endDate: string) => {
    setSelectedPeriod({ startDate, endDate });
    // TODO: Implement filtering based on date range
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Today's Attendance</h2>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsDatePickerOpen(true)}
              className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50"
            >
              <CalendarIcon className="h-5 w-5" />
              {selectedPeriod.startDate 
                ? `${selectedPeriod.startDate} - ${selectedPeriod.endDate}`
                : 'Select Date'}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Download Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-xl font-semibold">142</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-xl font-semibold">8</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Late</p>
                <p className="text-xl font-semibold">6</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">On Leave</p>
                <p className="text-xl font-semibold">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                    <div className="text-sm text-gray-500 ml-2">({record.employeeId})</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.checkIn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.checkOut}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${record.status === 'present' ? 'bg-green-100 text-green-800' : 
                      record.status === 'absent' ? 'bg-red-100 text-red-800' : 
                      record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'}`}>
                    {record.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DateRangePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onSelect={handleDateRangeSelect}
      />
    </div>
  );
};

export default AttendanceTracker;