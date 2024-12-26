import React from 'react'
import Banner from '../../../assets/images/Banner.svg'
import gala from '../../../assets/images/gala_add.svg'
import Banner2 from '../../../assets/images/Banner2.svg'

const BannerSection = () => {
  return (
    <div>
      <div className='flex justify-between mx-4 mt-3'>
        <h2 className='text-lg font-semibold'> Banner section</h2>
        <p className='text-md '>view all</p>
      </div>
      <div className='flex     gap-5 ml-4 mt-3'>
        <div className='flex flex-row gap-4 bg-[#FFFFFF] border-[1px] rounded-lg border-[#9D9D9D] px-2 '>
          <img src={Banner} alt="banner1" className='w-36 h-48' />
        </div>
        <div className='flex flex-row gap-4 bg-[#FFFFFF] border-[1px] rounded-lg border-[#9D9D9D] px-2'>
          <img src={Banner2} alt="banner2"  className='w-36 h-48 rounded-xl' />
        </div>
        <div className='flex   flex-col gap-4 bg-[#FFFFFF] border-[1px] items-center justify-center rounded-lg w-36 h-48 border-[#9D9D9D] px-2'>
          <img src={gala} alt="Add new" className=' rounded-xl mt-5' />
          <p className=''>Add New</p>
        </div>
      </div>
    </div>
  )
}

export default BannerSection
