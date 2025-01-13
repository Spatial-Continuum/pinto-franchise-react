import React from 'react'
import M_lovedDishes from './M_lovedDishes'
import MainLayout from '../../../GeneralComponent/Layout/MainLayout'
import M_lovedRestaurant from '../QuickSearch/M_lovedRestaurant'
import PropsSearchBox from '../../../GeneralComponent/SearchBox/PropsSearchBox'
import search from '../../../../assets/images/prime_search.svg'


const index = () => {
    return (
        <div>
            <MainLayout>
                <div className='flex justify-between items-center p-6' >
                    <PropsSearchBox img={search} placeholder="search Restaurant name,Id,menu,item" />
                    <button className='bg-orange-500  text-white  px-4 py-2 rounded-lg font-medium'>+NEW DISH</button>
                </div>
                <div>
                    <M_lovedDishes />
                </div>
                <div>
                    <M_lovedRestaurant />
                </div>
            </MainLayout>

        </div>
    )
}

export default index
