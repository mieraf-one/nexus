import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import UserProvider from './context/UserContext'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import PublicRoute from './components/PublicRoute'
import UsersProfilePage from './pages/UsersProfilePage'
import './index.css'

function App() {

  return (
      <Routes>
        <Route path='/' element={ <LandingPage /> } />
        <Route path='/signup' element={ 
                                    <PublicRoute>
                                        <SignupPage />
                                    </PublicRoute>
                                }/>
        <Route path='/login' element={ 
                                    <PublicRoute>
                                        <LoginPage />
                                    </PublicRoute>
                                }
        />
        
        <Route path='/dashboard' element={
                                          <ProtectedRoute>
                                              <UserProvider>
                                                    <DashboardPage />
                                              </UserProvider>
                                          </ProtectedRoute> } />
        <Route path='/profile' element={
                                          <ProtectedRoute>
                                              <UserProvider>
                                                    <ProfilePage />
                                              </UserProvider>
                                          </ProtectedRoute>
        } />

        <Route path='/profile/edit' element={
                                          <ProtectedRoute>
                                              <UserProvider>
                                                  <EditProfilePage />
                                              </UserProvider>
                                          </ProtectedRoute>
        }/>

        <Route path='user/:username' element={ 
                                    <PublicRoute>
                                                <UsersProfilePage />
                                    </PublicRoute>
                                }
        />
        
      </Routes>
  )
}

export default App
