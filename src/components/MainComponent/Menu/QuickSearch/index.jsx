import React from 'react'
import M_lovedDishes from './M_lovedDishes'
import MainLayout from '../../../GeneralComponent/Layout/MainLayout'
import M_lovedRestaurant from '../QuickSearch/M_lovedRestaurant'

import search from '../../../../assets/images/prime_search.svg'
import SearchBox from '../../../GeneralComponent/SearchBox/SearchBox'


const index = () => {
    return (
        <div>
            <MainLayout>
                <div className='flex justify-between items-center mb-6' >
                    <SearchBox img={search} placeholder="search Restaurant name,Id,menu,item" />
                    <button className='bg-orange-500  text-white  px-4 py-2 rounded-lg font-medium'>+NEW DISH</button>
                </div>
                <div className='mb-6'>
                    <M_lovedDishes />
                </div>
                <div className='mb-6'>
                    <M_lovedRestaurant />
                </div>
            </MainLayout>

        </div>
    )
}

export default index
