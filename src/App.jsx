import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Auth/signup'
import Login from './pages/Auth/login'
import Tasks from './pages/task'
import DeletedTask from './pages/taskDeleted'
import CompletedTask from './pages/taskCompleted'
import Home from './pages/home'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} exact />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/tasks' element={<Tasks />} />
      <Route path='/deleted' element={<DeletedTask />} />
      <Route path='/completed' element={<CompletedTask />} />
    </Routes>
  )
}

export default App