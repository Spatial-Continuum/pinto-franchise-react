import React,{useEffect} from "react";
import './App.css'

 import Routers from "./config/Routers.jsx"

const App = () => { 
  useEffect (()=>{
    Update()


  },[]) 
  const Update = async()=>{

  }
  return ( 

    <React.Fragment>
      <Routers/>
  
    </React.Fragment>

    

  );
};

export default App;
