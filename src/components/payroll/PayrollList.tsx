import React, { useState } from 'react';
import { DollarSign, Download, Calendar } from 'lucide-react';
import DateRangePicker from '../common/DateRangePicker';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  salary: number;
  bonus: number;
  deductions: number;
  paymentDate: string;
  status: 'paid' | 'pending' | 'processing';
}

const payrollRecords: PayrollRecord[] = [
  {
    id: 'PAY001',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    salary: 85000,
    bonus: 5000,
    deductions: 7500,
    paymentDate: '2024-03-01',
    status: 'paid'
  },
  {
    id: 'PAY002',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    salary: 95000,
    bonus: 7500,
    deductions: 9000,
    paymentDate: '2024-03-01',
    status: 'processing'
  }
];

const PayrollList = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState({ startDate: '', endDate: '' });

  const handleDateRangeSelect = (startDate: string, endDate: string) => {
    setSelectedPeriod({ startDate, endDate });
    // TODO: Implement filtering based on date range
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Payroll Overview</h2>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsDatePickerOpen(true)}
              className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50"
            >
              <Calendar className="h-5 w-5" />
              {selectedPeriod.startDate 
                ? `${selectedPeriod.startDate} - ${selectedPeriod.endDate}`
                : 'Select Period'}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Payroll</p>
                <p className="text-xl font-semibold">{formatCurrency(4525000)}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-xl font-semibold">{formatCurrency(3280000)}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-semibold">{formatCurrency(1245000)}</p>
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
                Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bonus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deductions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Pay
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrollRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                    <div className="text-sm text-gray-500 ml-2">({record.employeeId})</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(record.salary)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(record.bonus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(record.deductions)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(record.salary + record.bonus - record.deductions)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${record.status === 'paid' ? 'bg-green-100 text-green-800' : 
                      record.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                    {record.status}
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

export default PayrollList;