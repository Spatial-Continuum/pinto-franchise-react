import React from 'react'
import BannerSection from '../../modules/Marketing/bannerSection/BannerSection';
import DealSection from '../../modules/Marketing/DealSection/DealSection'
import Main from '../../layouts/Main';
import PropsSearchBox from '../../components/SearchBox/PropsSearchBox';
import search from "../../assets/images/prime_search.svg";

const MarketingScreen = () => {
    return (
        <div>
            <Main>
                <div>
                    <div className='flex justify-between mx-4 mt-5'>
                        <PropsSearchBox  placeholder="Search here" img={search} />
                        <button className='flex bg-[#008B0E] justify-center items-center rounded-md px-5 text-white text-sm '>Place Holder</button>
                    </div>
                    <div className='mt-10'>
                    <BannerSection />
                    </div>
                    <div className='mt-10'>
                    <DealSection />
                    </div>

                </div>
            </Main >
        </div >
    )
}

export default MarketingScreen
