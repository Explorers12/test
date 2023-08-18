import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/header';
import Footer from './component/footer';
import Login from './page/Login';

import Ask from './page/ask';
import Question from './page/question';

import Mypage from './page/Mypage/Mypage'

import Signup from './page/Signup';
import Main from './page/main';


const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <Header onSidebarToggle={toggleSidebar} />
      <main
        className={`flex flex-col flex-grow transition-all w-full h-full ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Main />} />
            <Route path="/ask" element={<Ask />} />
            <Route path="/question" element={<Question />} />
            <Route path='/mypage' element={<Mypage />} />

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;