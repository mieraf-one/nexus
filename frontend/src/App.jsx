import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import UserProvider from './context/UserContext'

function App() {

  return (
      <Routes>
        <Route path='/' element={ <LandingPage /> } />
        <Route path='/signup' element={ <SignupPage /> }/>
        <Route path='/login' element={ <LoginPage /> } />
        
        <Route path='/dashboard' element={
                                          <ProtectedRoute>
                                              <UserProvider>
                                                    <DashboardPage />
                                              </UserProvider>
                                          </ProtectedRoute> } />
      </Routes>
  )
}

export default App
