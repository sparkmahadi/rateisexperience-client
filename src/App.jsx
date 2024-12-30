import { Route, Routes } from 'react-router-dom'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Navbar from './components/Navbar'
import ProtectedRoute from './routes/ProtectedRoute'
import Summary from './components/Summary'

function App() {

  return (
    <>
      <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/home" element={<FeedbackForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
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
    </div>
    </>
  )
}

export default App
