import React from 'react'
import Main from '../../layouts/Main'
import DeliveryBasedTable from '../../modules/deliveryPartners/DeliveryBased/DeliveryBasedTable'
import '../../assets/styles/DeliveryPartnerDeliveryBased.css'
const DeliveryPartnerDeliveryBased = () => {
  return (
    <div className='app'>
      <Main>
      <div className="delivery-partner-salaried">
        <DeliveryBasedTable />
      </div>
    </Main>
    </div>
  )
}

export default DeliveryPartnerDeliveryBased
