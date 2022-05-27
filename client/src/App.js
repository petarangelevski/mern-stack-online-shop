import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import UserRoute from './components/UserRoute';

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/signin' element={<Signin/>}/>
          <Route exact path='/user/dashboard'
           element={
             <UserRoute>
               <UserDashboard/>
             </UserRoute>
           } />
          <Route exact path='/admin/dashboard'
           element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>} />
          <Route element={<NotFound/>}/>
        </Routes>
      </main>
    </Router>
  );
}
export default App;
