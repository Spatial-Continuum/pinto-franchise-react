import React from 'react'
import Main from '../../layouts/Main'
import ShowCategory from '../../modules/menu/category/ShowCategory'
import ShowCuisine from '../../modules/menu/cuisine/ShowCuisine'
import ShowFilter from '../../modules/menu/QuickFilterDish/ShowFilter'
import ShowTopBrand from '../../modules/menu/TopBrand/ShowTopBrand'
import QuickFilterRestaurant from '../../modules/menu/QuickFilterRestaurant/QuickFilterRestaurant'
import AuthenticCookingStyle from '../../modules/menu/AuthenticCooking/AuthenticCookingStyle'
import PropsSearchBox from '../../components/SearchBox/PropsSearchBox'
import search from '../../assets/images/prime_search.svg'
import ShowSpotLight from '../../modules/menu/spotlight/ShowSpotLight'
import ShowCityBanquets from '../../modules/menu/Banquets/ShowCityBanquets'
import ShowPopularDish from '../../modules/menu/PopularDish/ShowPopularDish'
const HomeScreen = () => {

    return (
        <div>
            <Main>
                <div className='mb-36 p-10'>
                    <div className='flex justify-between mt-5 mx-4'>
                        <PropsSearchBox placeholder="Search here" img={search} />
                        <button className='flex bg-[#2D5FDD] justify-center items-center rounded-md px-5 text-white text-sm '>Place Holder</button>

                    </div>
                    <div className='mt-14'>
                        <ShowCategory />
                    </div>
                    <div className='mt-14'>
                        <ShowFilter />     {/*dish filter */}
                    </div>
                    <div className='mt-14'>
                        <ShowSpotLight />
                    </div>
                    <div className='mt-14'>
                        <ShowPopularDish />
                    </div>
                    <div className='mt-14'>
                        <ShowTopBrand />
                    </div>

                    <div className='mt-14'>
                        <ShowCityBanquets />
                    </div>
                    <div className='mt-14'>
                        <QuickFilterRestaurant />
                    </div>
                    <div className='mt-14'>
                        <ShowCuisine />
                    </div>
                    <div className='mt-14'>
                        <AuthenticCookingStyle />
                    </div>
                </div>
            </Main>
        </div>
    )
}

export default HomeScreen
