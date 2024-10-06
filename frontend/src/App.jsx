import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import VisitingCardOCR from './pages/VisitingCardOCR'
import Home from './pages/Home'
import Users from './pages/Users'

function App() {

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element= <Home /> />
        <Route path='/upload' element= <VisitingCardOCR /> />
        <Route path='/users' element= <Users />  />
      </Routes>
    </div>
  )
}

export default App
