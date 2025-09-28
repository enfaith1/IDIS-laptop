import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-lg sm:text-xl font-bold">👥 User List</h1>
        <div className="text-sm text-gray-600">
          {users.length} user{users.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">👤</div>
          <p className="text-gray-600">No users found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div 
              key={user.id} 
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {user.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {user.email}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}