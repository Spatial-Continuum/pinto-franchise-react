import React from "react";


import Main from "../../layouts/Main";
import OnboardingTable from "../../modules/deliveryPartners/Onboarding/OnboardingTable";

const DeliveryPartnerOnboarding = () => {
  return (
    <Main>
      <div className="delivery-partner-onboarding">
        <OnboardingTable />
      </div>
    </Main>
  );
};

export default DeliveryPartnerOnboarding;
