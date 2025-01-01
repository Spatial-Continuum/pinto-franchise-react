import React from 'react'
import MainLayout from '../../../GeneralComponent/Layout/MainLayout.jsx'
import Category from './Category/index.jsx'

import SearchInput from '../../../GeneralComponent/SearchBox/SearchInput.jsx'
import QuickFilter from './QuickFilter/index.jsx'
import CitySpot from "./CitySpotLight/index.jsx"
import Cuisine from "./Cuisine/index.jsx" 
import SubCategory from './SubCategory/index.jsx'
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
                    <Cuisine/>
                    {/* <div className='mb-8 mt-4'>
                        <ShowCategory />
                    </div>
                    <div className='mb-8 mt-4'>
                        <ShowFilter />    
                    </div>
                    <div className='mb-8 mt-4'>
                        <ShowSpotLight />
                    </div>
                    <div className='mb-8 mt-4'>
                        <ShowPopularDish />
                    </div>
                    <div className='mb-8 mt-4'>
                        <ShowTopBrand />
                    </div>

                    <div className='mb-8 mt-4'>
                        <ShowCityBanquets />
                    </div>
                    <div className='mb-8 mt-4'>
                        <QuickFilterRestaurant />
                    </div>
                    <div className='mb-8 mt-4'>
                        <ShowCuisine />
                    </div>
                    <div className='mb-8 mt-4'>
                        <AuthenticCookingStyle />
                    </div> */}
                </div>
            </MainLayout>
        </div>
    )
}

export default HomeScreen