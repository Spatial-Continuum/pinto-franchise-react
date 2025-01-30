import React from 'react'

import DiningMenu from '../../modules/restaurants/DiningMenu';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/GeneralComponent/Layout/MainLayout';
const Addmenu = () => {
    const {restaurantId} = useParams()
    return (
        <div>
            <MainLayout >
                <div>
                    <DiningMenu restaurantId={restaurantId}/>
                </div>
            </MainLayout>
        </div>
    )
}

export default Addmenu
