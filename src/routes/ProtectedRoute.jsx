    // ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Adjust the path to your Firebase config
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is logged in
      } else {
        setIsAuthenticated(false); // User is not logged in
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  // While the authentication status is loading, show nothing (or a loading spinner)
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the children (protected content)
  return <>{children}</>;
};

export default ProtectedRoute;
