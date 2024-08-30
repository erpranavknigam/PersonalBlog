import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './Home/Home';
import Article from './Home/Article'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/article/:id' element={<Article/>}/>
      </Routes>
    </>
  )
}

export default App