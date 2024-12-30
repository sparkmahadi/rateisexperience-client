import { Route, Routes } from 'react-router-dom'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Navbar from './components/Navbar'
import ProtectedRoute from './routes/ProtectedRoute'
import Summary from './components/Summary'
import Dashboard from './components/Dashboard'
import { Toaster } from 'react-hot-toast'
import ResetPassword from './components/ResetPassword'
import AboutUs from './components/AboutUs'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/home" element={<FeedbackForm />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* Protect the Summary route */}
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <Summary />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </div>
    </>
  )
}

export default App
