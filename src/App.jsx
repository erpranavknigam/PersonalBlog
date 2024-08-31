import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './Home/Home';
import Article from './Home/Article'
import Header from './components/Header';
import AdminHome from './Admin/AdminHome';
import AddArticle from './Admin/AddArticle';
import EditArticle from './Admin/EditArticle';

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/article/:id' element={<Article/>}/>
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/admin/Add' element={<AddArticle/>}/>
        <Route path='/admin/Edit/:id' element={<EditArticle/>}/>
      </Routes>
    </>
  )
}

export default App