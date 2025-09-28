import { useEffect, useState } from 'react';
import useStyles from './../styles/Styles';
import { useLocation } from 'wouter';

interface User {
  id: number;
  name: string;
  user_name: string;
  email: string;
  password: string;
}

export default function Login() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const styles = useStyles();
  const [_, navigate] = useLocation(); // navigate is used to redirect

  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then((res) => res.json())
    .then((data) => {
      setUsers(data); 
    })
    .catch((err) => console.error('Error fetching users:', err));

  }, []);

  const handleLogin = async () => {
    console.log('[DEBUG] Handling Login')
    console.log(users[0]?.password)
    console.log(users[0]?.user_name)
    console.log(users[0]?.email)

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    if (users[0]?.email == email || users[0]?.user_name == email && users[0]?.password == password) {
      alert('Login Successful!')
      navigate('/dashboard'); 

    } else {
      alert('Please enter the right email or password!')
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Logo/Image Section */}
        <div className="h-32 sm:h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-blue-600">L</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Sign in to your account</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email or Username
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                placeholder="Enter your email or username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}