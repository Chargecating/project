import React from 'react';
import { Mail, Phone, MapPin, Calendar, Building2, Briefcase } from 'lucide-react';

const EmployeeProfile = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
            JD
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
            <p className="text-gray-600">Software Engineer</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Building2 className="h-4 w-4 mr-2" />
              Engineering Department
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-800">john.doe@company.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-gray-800">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-gray-800">123 Main St, City, State 12345</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Employment Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Join Date</p>
                <p className="text-gray-800">January 15, 2023</p>
              </div>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Employee ID</p>
                <p className="text-gray-800">EMP001</p>
              </div>
            </div>
            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="text-gray-800">Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'React', 'Node.js', 'TypeScript', 'Git', 'AWS'].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;