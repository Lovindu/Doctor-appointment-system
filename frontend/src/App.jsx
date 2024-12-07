import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Search from './pages/Search';
import {BrowserRouter, Routes, Route} from 'react-router';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/contactus' element={<Contact />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
