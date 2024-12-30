// Signup.tsx
import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Import your firebase configuration
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/summary'); // Redirect to summary page after successful signup
    } catch (error) {
      setError('Signup failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input input-bordered input-primary w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input input-bordered input-primary w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
