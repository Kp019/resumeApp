import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import ResumeShortlisters from './Components/ResumeShortlisters'
import Resume_Builder from './pages/Resume_Builder'
import ResumeAnalyser from './Components/ResumeAnalyser'
import Modal from './Components/Modal'
import ViewResult from './pages/ViewResult'
import Profile from './Components/Profile'
import LoginButton from './Components/UI/LoginButton'
import Admin from './pages/Admin'


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<LoginButton/>}/>
        <Route path='/ResumeShortlister' element={<ResumeShortlisters/>}/>
        <Route path='/ResumeBuilder' element={<Resume_Builder/>}/>
        <Route path='/ResumeAnalyser' element={<ResumeAnalyser/>}/>
        <Route path="/view/:url" element={<Modal/>} />
        <Route path='/candidates' element={<ViewResult/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
