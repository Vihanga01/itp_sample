
import './App.css';
import React,{useContext} from 'react';
import Header from './components/Header';
import Addcustomer from './components/Addcustomer';
import Allcustomer from './components/Allcustomer';
import { AuthContext } from "./Context/AuthContext";
import {BrowserRouter as Router, Route} from 'react-router-dom'



function App() {

  const {user,setUser,isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);
  return (
    <Router>
      <div>
        <navbar/>
        <Header/>
        
        <Route path ="/add" exact component={Addcustomer}/>
        <Route path ="/all" exact component={Allcustomer}/>
        
     
      </div>
    </Router>
  );
}

export default App;
