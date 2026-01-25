import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import UsersProfilePage from './pages/UsersProfilePage'
import './index.css'
import NotificationPage from './pages/NotificationPage'
import CreatePost from './pages/CreatePostPage'
import ViewPostPage from './pages/ViewPostPage'

function App() {

  return (
      <Routes>
        <Route path='/' element={ <LandingPage /> } />
        
        <Route path='/signup' element={ 
                                  
                                        <SignupPage />
                            
                                }/>
        <Route path='/login' element={ 
                                        <LoginPage />
                                    }
        />
        
        <Route path='/dashboard' element={
                                          <ProtectedRoute>
                                                    <DashboardPage />
                                          </ProtectedRoute> } />
        <Route path='/profile' element={
                                          <ProtectedRoute>
                                                    <ProfilePage />
                                          </ProtectedRoute>
        } />

        <Route path='/profile/edit' element={
                                          <ProtectedRoute>
                                                  <EditProfilePage />
                                          </ProtectedRoute>
        }/>

        <Route path='user/:username' element={ 
                                    <ProtectedRoute>
                                                <UsersProfilePage />
                                    </ProtectedRoute>
        }
        />

        <Route path='/notifications' element={ 
                                    <ProtectedRoute>
                                                <NotificationPage />
                                    </ProtectedRoute>
                                }
        />

        <Route path='/create' element={
                                    <ProtectedRoute>
                                        <CreatePost />
                                    </ProtectedRoute>
                                  }
        />

        <Route path='/post/:id' element={
                                    <ProtectedRoute>
                                        <ViewPostPage />
                                    </ProtectedRoute>
                                  }
        />
        
      </Routes>
  )
}

export default App
