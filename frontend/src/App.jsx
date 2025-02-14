import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Personalpg from './components/Personalpg';
import Resume from './components/Resume';
import Homepage from './components/Homepage';
import Homepg from './components/Homepg';
import Educationpg from './components/Educationpg';
import Skillpg from './components/Skillpg';
import Projectpg from './components/Projectpg';
// import DownloadPDF from './components/DownloadPDF';
import ExperiencePage from './components/ExperiencePage';









const App = () => {
  return (
    <Router>
      <Routes>
       
      
        
        <Route path="/Personalpg" element={<Personalpg />} />
        <Route path="/Resume" element={<Resume />} />
        <Route path="/" element={< Homepage/>} />
        <Route path="/Homepg" element={< Homepg/>} />
        <Route path="/Educationpage" element={<Educationpg/>} />
        <Route path="/Skillpg" element={<Skillpg/>} />
        <Route path="/Projectpg" element={<Projectpg/>} />
        {/* <Route path="/pdf" element={<DownloadPDF/>} /> */}
        <Route path="/experiencepg" element={<ExperiencePage/>} />
        

      
       
       
        
      </Routes>
    </Router>
  );
};

export default App;