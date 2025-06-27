import { Link } from 'react-router-dom';

export default function MustLogin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="mb-6">You must be logged in to view this page.</p>
        <Link
          to="/login"
          className="text-blue-500 hover:underline text-lg"
        >
          You can here
        </Link>
      </div>
    </div>
  );
}
