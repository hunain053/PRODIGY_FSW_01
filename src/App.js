import React from "react";
import {Routes , Route} from 'react-router-dom';
import Home from "./components/Home";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


export default function App(){
  return(
    <>

      <div>
        <Routes>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/Home" element={<Home/>}/>
        
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/SignIn" element={<SignIn/>}/>
        </Routes>
      </div>

    </>
  );
}