import React from 'react'
import MainLayout from '../../../GeneralComponent/Layout/MainLayout'
import MetricsCard from '../../../GeneralComponent/MetricsCard/MetricsCard'
import SearchBox from '../../../GeneralComponent/SearchBox/SearchBox'
import FilterDropdown from '../../../GeneralComponent/Dropdown/FilterDropdown'
import ManageTable from './ManageTable'
import { useNavigate, } from 'react-router-dom'
import { useState } from 'react'
const ManageIndex = () => {
    const [onboarding, setOnboarding] = useState('Pending');
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();
    const filterOptions = [
        // { label: 'success', value: "Success" },
        { label: 'live orders', value: "Pending" },
        { label: 'rejected', value: "Rejected" },
    ]
    const cardsData = [
        { value: '50', label: 'Live Orders', textColor: 'text-[#008BFF]', borderColor: 'border-[#008BFF]',text1:'10% increased', text2:'avcc', text3:'bdjh',text1Color:'text-[#585858]', text2Color:'text-[#585858]', text3Color:'text-[#585858]' },
        { value: '1.5k', label: 'Completed', textColor: 'text-[#008B0E]', borderColor: 'border-[#008B0E]' ,text1:'10% increased', text2:'avcc', text3:'bdjh' , text1Color:'text-[#585858]', text2Color:'text-[#585858]', text3Color:'text-[#585858]'},
        { value: '05', label: 'Cancelled', textColor: 'text-[#FF0000]', borderColor: 'border-[#FF0000]',text1:'10% increased', text2:'avcc', text3:'bdjh',text1Color:'text-[#585858]',  text2Color:'text-[#585858]', text3Color:'text-[#585858]' },
        { value: '10', label: 'Delayed', textColor: 'text-[#720F3D]', borderColor: 'border-[#720F3D]',text1:'10% increased', text2:'avcc', text3:'bdjh' ,text1Color:'text-[#585858]',  text2Color:'text-[#585858]', text3Color:'text-[#585858]'}, 
        { value: '1.52K', label: 'Total Orders', textColor: 'text-[#020D6E]', borderColor: 'border-[#020D6E]', text1:'10% increased', text2:'avcc', text3:'bdjh',text1Color:'text-[#585858]',  text2Color:'text-[#585858]', text3Color:'text-[#585858]'},
        { value: '20%', label: 'Order Ratio', textColor: 'text-[#FF00C7]', borderColor: 'border-[#FF00C7]',text1:'10% increased', text2:'avcc', text3:'bdjh',text1Color:'text-[#585858]',  text2Color:'text-[#585858]', text3Color:'text-[#585858]' },
        //{ value: '20%', label: 'Order Ratio', textColor: 'text-gray-500', borderColor: 'border-gray-300', route: '/onboardingform' },

    ];

    const handleCardClick = (card) => {
        if (card.route) {
            navigate(card.route)
        }
    }
    const handleSearch = (term) => {
        setSearchTerm(term)
    }
    return (
        <MainLayout>
            <div>
                <MetricsCard cards={cardsData} onCardClick={handleCardClick} />
                {/* Add your component here */}
            </div>
            <div className='flex flex-row justify-between'>
                <div>
                    <SearchBox placeholder="search by name" onSearch={handleSearch} />
                </div>
                <div >
                    <FilterDropdown value={onboarding}
                        onChange={(value) => setOnboarding(value)}
                        options={filterOptions} />
                </div>
            </div>
            <div className='mt-5'>
                <ManageTable />
            </div>
        </MainLayout>
    )
}

export default ManageIndex
