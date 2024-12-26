import React from 'react'
import Main from '../../layouts/Main'
import DiningMenu from '../../modules/menu/DiningMenu'
import { useParams } from 'react-router-dom'
const Addmenu = () => {
    const {restaurantId} = useParams()
    return (
        <div>
            <Main>
                <div>
                    <DiningMenu restaurantId={restaurantId}/>
                </div>
            </Main>
        </div>
    )
}

export default Addmenu
