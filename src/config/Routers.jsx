import { Routes, Route } from "react-router";
import React, { Suspense } from "react"
import MainLayout from "../components/GeneralComponent/Layout/MainLayout.jsx"
const ManageScreen = React.lazy(() => import('../components/MainComponent/Menu/index'));
const Routers =(props)=>{ 
  return(
    <Routes>
    <Route path="/" element={<MainLayout />}></Route>
    <Route path='/menu/manage-screen'  
    element={
        <Suspense fallback={ <div className="text-center m-t-15">Loading...</div>}>
          <ManageScreen />
        </Suspense>
}
   /> 
    
    {/* <Route path="/homescreen/authenticstyle" element={<ManageScreen />} /> */}
</Routes>
  )
}
export default Routers;
