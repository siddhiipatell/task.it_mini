import './App.css'
// import React from 'react'
import { BrowserRouter as Router,Routes,Route ,Navigate} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Todo from './Pages/Todo'
import UserPrivateRoute from './Components/Layout/UserPrivateRoute'
import Profile from './Pages/Profile'
import LandingPage from './Pages/landingpage';
import Project from './Pages/Project';
import Users from './Pages/Users';
import Home from './Pages/home';



function App() {
  const token = localStorage.getItem('token');
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={token ? <Navigate to="/tasks" /> : <Login />} />
            <Route path="/home" exact element={<UserPrivateRoute component={Home} />} />   
            <Route path="/projects" exact element={<UserPrivateRoute component={Project} />} />  
            <Route path="/users" exact element={<UserPrivateRoute component={Users} />} />   
            <Route path="/tasks" exact element={<UserPrivateRoute component={Todo} />} />           
            <Route path="/profile" exact element={<UserPrivateRoute component={Profile} />} />           
          </Routes>
        </Router>
    </>
  )
}

export default App
