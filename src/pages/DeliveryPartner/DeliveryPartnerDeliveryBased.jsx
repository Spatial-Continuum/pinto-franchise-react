import React from 'react'
import Main from '../../layouts/Main'
import SalariedTable from '../../modules/deliveryPartners/Salaried/SalariedTable'

const DeliveryPartnerDeliveryBased = () => {
  return (
    <div>
      <Main>
      <div className="delivery-partner-salaried">
        <SalariedTable />
      </div>
    </Main>
    </div>
  )
}

export default DeliveryPartnerDeliveryBased
