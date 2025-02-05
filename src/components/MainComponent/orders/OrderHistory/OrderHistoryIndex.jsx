import React from 'react'
import MainLayout from '../../../GeneralComponent/Layout/MainLayout'
import OrderHistoryTable from './OrderHistoryTable'
import SearchBox from '../../../GeneralComponent/SearchBox/SearchBox'
import FilterDropdown from '../../../GeneralComponent/Dropdown/FilterDropdown'

const OrderHistoryIndex = () => {
  return (
    <MainLayout headerName="Order History">
      
      <div className='flex flex-row justify-between'>
        <div>
          <SearchBox placeholder="search by name" onSearch="" />
        </div>
        <div >
          
        </div>
      </div>
      <div className='mt-5'>
        <OrderHistoryTable/>
      </div>
    </MainLayout>
  )
}

export default OrderHistoryIndex
