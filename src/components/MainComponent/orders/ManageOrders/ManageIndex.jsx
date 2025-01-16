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
        { value: 75, label: 'Active Restaurants', textColor: 'text-blue-600', borderColor: 'border-[#1E99FF]' },
        { value: '2k', label: 'Total Orders', textColor: 'text-orange-600', borderColor: 'border-[#FF6B00]' },
        { value: 200, label: 'New Signups', textColor: 'text-green-700', borderColor: 'border-[#008B0E]' },
        { value: '+', label: 'New Restaurant', textColor: 'text-gray-500', borderColor: 'border-gray-300', route: '/onboardingform' },
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
