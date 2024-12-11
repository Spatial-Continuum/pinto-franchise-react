import React from "react";

import SalariedTable from '../../modules/deliveryPartners/Salaried/SalariedTable';
import Main from "../../layouts/Main";

const DeliveryPartnerSalaried = () => {
  return (
    <Main>
      <div className="delivery-partner-salaried">
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
          Salaried Delivery Partners
        </h1>
        <SalariedTable />
      </div>
    </Main>
  );
};

export default DeliveryPartnerSalaried;
