import { Routes, Route } from "react-router";
import React, { Suspense } from "react"
import MainLayout from "../components/GeneralComponent/Layout/MainLayout.jsx"
const ManageScreen = React.lazy(() => import('../components/MainComponent/Menu/index')); 
const ShowCategory = React.lazy(()=>import('../components/MainComponent/Menu/ManageScreen/Category/ShowCategory.jsx'))
const CategoryForm = React.lazy(()=>import("../components/MainComponent/Menu/ManageScreen/Category/CategoryForm.jsx"))
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
    <Route path='/menu/manage-screen/show-category'  
    element={
        <Suspense fallback={ <div className="text-center m-t-15">Loading...</div>}>
          <ShowCategory />
        </Suspense> 
}
   /> 
      <Route path='/menu/manage-screen/categoty-form'  
    element={
        <Suspense fallback={ <div className="text-center m-t-15">Loading...</div>}>
          <CategoryForm />
        </Suspense> 
}
   /> 
    {/* <Route path="/homescreen/authenticstyle" element={<ManageScreen />} /> */}
</Routes>
  )
}
export default Routers;
