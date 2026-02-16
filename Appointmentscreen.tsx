
import React from 'react';
import { Appointment, ServiceItem } from '../types';
import { SERVICES } from '../constants';

interface AppointmentsScreenProps {
  appointments: Appointment[];
  checkIn: (id: string) => void;
}

const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({ appointments, checkIn }) => {
  const getService = (id: string): ServiceItem | undefined => SERVICES.find(s => s.id === id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Today's Appointments</h2>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all">
          <i className="fas fa-plus mr-2"></i> New Booking
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {appointments.map(app => {
          const service = getService(app.serviceId);
          return (
            <div key={app.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{app.customerName}</h3>
                  <p className="text-pink-600 font-medium">{service?.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  app.status === 'Checked-in' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {app.status}
                </span>
              </div>
              
              <div className="flex items-center text-slate-500 text-sm">
                <i className="far fa-clock mr-2"></i>
                {app.startTime} (Est. {service?.duration} mins)
              </div>

              <div className="pt-4 flex space-x-2">
                {app.status === 'Scheduled' && (
                  <button 
                    onClick={() => checkIn(app.id)}
                    className="flex-1 bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition-all"
                  >
                    Check In
                  </button>
                )}
                {app.status === 'Checked-in' && (
                  <button className="flex-1 bg-pink-100 text-pink-700 py-2 rounded-lg font-semibold hover:bg-pink-200 transition-all">
                    Move to POS
                  </button>
                )}
                <button className="px-4 bg-slate-100 text-slate-600 py-2 rounded-lg hover:bg-slate-200">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentsScreen;
