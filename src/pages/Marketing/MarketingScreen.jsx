import React from 'react'
import BannerSection from '../../modules/Marketing/bannerSection/BannerSection';
import DealSection from '../../modules/Marketing/DealSection/DealSection';

import PropsSearchBox from '../../components/GeneralComponent/SearchBox/PropsSearchBox';
import search from "../../assets/images/prime_search.svg";
import MainLayout from '../../components/GeneralComponent/Layout/MainLayout';
import SearchBox from '../../components/GeneralComponent/SearchBox/SearchBox';

const MarketingScreen = () => {
    return (
        <div>
            <MainLayout>
                <div>
                    <div className='flex justify-between mx-4 mt-5'>
                        <SearchBox  placeholder="Search here" img={search} />
                        <button className='flex bg-[#008B0E] justify-center items-center rounded-md px-5 text-white text-sm '>Place Holder</button>
                    </div>
                    <div className='mt-16'>
                    <BannerSection />
                    </div>
                    <div className='mt-16'>
                    <DealSection />
                    </div>

                </div>
            </MainLayout >
        </div >
    )
}

export default MarketingScreen
