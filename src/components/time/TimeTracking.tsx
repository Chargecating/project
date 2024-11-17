import React, { useState } from 'react';
import { Clock, Calendar, Play, Pause, StopCircle } from 'lucide-react';
import DateRangePicker from '../common/DateRangePicker';

interface TimeTrackingEntry {
  id: string;
  project: string;
  task: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: 'in_progress' | 'completed' | 'paused';
}

const timeEntries: TimeTrackingEntry[] = [
  {
    id: 'TT001',
    project: 'Website Redesign',
    task: 'Homepage Layout',
    startTime: '09:00 AM',
    endTime: '11:30 AM',
    duration: '2h 30m',
    status: 'completed'
  },
  {
    id: 'TT002',
    project: 'Mobile App',
    task: 'User Authentication',
    startTime: '01:00 PM',
    endTime: '04:15 PM',
    duration: '3h 15m',
    status: 'completed'
  }
];

const TimeTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleStartTracking = () => {
    if (currentTask && currentProject) {
      setIsTracking(true);
      setIsPaused(false);
    }
  };

  const handlePauseTracking = () => {
    setIsPaused(!isPaused);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    setIsPaused(false);
    setCurrentTask('');
    setCurrentProject('');
  };

  const handleDateRangeSelect = (startDate: string, endDate: string) => {
    console.log('Selected date range:', { startDate, endDate });
    // TODO: Implement date range filtering
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Time Tracking</h2>
          <button
            onClick={() => setIsDatePickerOpen(true)}
            className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <Calendar className="h-5 w-5" />
            Select Period
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Hours</p>
                <p className="text-xl font-semibold">5h 45m</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-xl font-semibold">28h 15m</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-semibold">120h 30m</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Project Name"
              value={currentProject}
              onChange={(e) => setCurrentProject(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTracking}
            />
            <input
              type="text"
              placeholder="Task Description"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTracking}
            />
          </div>
          <div className="flex justify-center gap-4">
            {!isTracking ? (
              <button
                onClick={handleStartTracking}
                disabled={!currentTask || !currentProject}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Start Tracking
              </button>
            ) : (
              <>
                <button
                  onClick={handlePauseTracking}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
                >
                  {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button
                  onClick={handleStopTracking}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <StopCircle className="h-5 w-5" />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project/Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{entry.project}</div>
                    <div className="text-sm text-gray-500">{entry.task}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.startTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.endTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${entry.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        entry.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {entry.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DateRangePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onSelect={handleDateRangeSelect}
      />
    </div>
  );
};

export default TimeTracking;