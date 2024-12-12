import React from "react";

import SalariedTable from '../../modules/deliveryPartners/Salaried/SalariedTable';
import Main from "../../layouts/Main";

const DeliveryPartnerSalaried = () => {
  return (
    <Main>
      <div className="delivery-partner-salaried">
        <SalariedTable />
      </div>
    </Main>
  );
};

export default DeliveryPartnerSalaried;
