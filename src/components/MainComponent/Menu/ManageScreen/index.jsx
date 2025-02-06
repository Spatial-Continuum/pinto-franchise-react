import React from 'react'
import MainLayout from '../../../GeneralComponent/Layout/MainLayout.jsx'
import Category from './Category/index.jsx'

import SearchInput from '../../../GeneralComponent/SearchBox/SearchInput.jsx'
import QuickFilter from './QuickFilter/index.jsx'
import CitySpot from "./CitySpotLight/index.jsx"
import Cuisine from "./Cuisine/index.jsx" 
import SubCategory from './SubCategory/index.jsx' 
import TopBrand from "./TopBrand/index.jsx"
import Authentic from "./Authentic/index.jsx" 
import QuickRestaurant from "./QuickRestaurant/index.jsx"
const HomeScreen = () => {

    return (
        <div>
            <MainLayout headerName={"Menu"} >
                <div className='p-8'>
                   
                   <SearchInput/> 
             
                   <Category/> 
                   <SubCategory/>
                    <QuickFilter/>
                    <CitySpot/>
                    <TopBrand/> 
                    <QuickRestaurant/>
                    <Cuisine/>
                    <Authentic/> 
                    
                    
                </div>
            </MainLayout>
        </div>
    )
}

export default HomeScreen