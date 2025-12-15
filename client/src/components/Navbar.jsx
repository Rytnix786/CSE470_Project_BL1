import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">BRACU Health</span>
            </Link>
            
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {user.role === 'PATIENT' && (
                  <>
                    <Link to="/doctors" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                      Find Doctors
                    </Link>
                    <Link to="/appointments" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                      My Appointments
                    </Link>
                    <Link to="/prescriptions" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                      Prescriptions
                    </Link>
                    <Link to="/health-records" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                      Health Records
                    </Link>
                  </>
                )}
                
                {user.role === 'DOCTOR' && (
                  <>
                    <Link to="/doctor/profile" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                      My Profile
                    </Link>
                    <Link to="/doctor/slots" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                      Manage Slots
                    </Link>
                    <Link to="/doctor/appointments" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                      Appointments
                    </Link>
                  </>
                )}
                
                {user.role === 'ADMIN' && (
                  <Link to="/admin/verify-doctors" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                    Verify Doctors
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
