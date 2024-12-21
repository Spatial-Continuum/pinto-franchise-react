import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Main from "./layouts/Main";
import DeliveryPartnerSalaried from "./pages/DeliveryPartner/DeliveryPartnerSalaried";
import DeliveryPartnerDeliveryBased from "./pages/DeliveryPartner/DeliveryPartnerDeliveryBased";
import DeliveryPartnerOnboarding from "./pages/DeliveryPartner/DeliveryPartnerOnboarding";
import Restaurants from "./pages/Menu/Restaurants";
import Addmenu from "./pages/Menu/Addmenu";
import HomeScreen from "./pages/Menu/HomeScreen";
import MarketingScreen from "./pages/Marketing/MarketingScreen";
import AuthenticViewAllPage from "./pages/viewallPages/AuthenticViewAllPage";

const App = () => {
  return (
    <Router>
      {/* <Routes>
      
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/delivery-partner/salaried" element={<DeliveryPartnerSalaried />} />
          <Route path="/delivery-partner/deliverybased" element={<DeliveryPartnerDeliveryBased />} />
          <Route path="/delivery-partner/onboarding" element={<DeliveryPartnerOnboarding />} />
        </Route>



        <Route path="*" element={<NotFound />} />
      </Routes> */}


      <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/delivery-partner/salaried" element={<DeliveryPartnerSalaried />}></Route>
        <Route path="/delivery-partner/deliveryBased" element={<DeliveryPartnerDeliveryBased />}></Route>
        <Route path="/delivery-partner/onboarding" element={<DeliveryPartnerOnboarding />}></Route>
        <Route path="/menu/restaurants" element={<Restaurants />}></Route>
        <Route path="/menu/homescreen" element={<HomeScreen />}></Route>
        <Route path="/restaurant/addmenu/:restaurantId" element={<Addmenu />}></Route>
        <Route path="/marketing" element={<MarketingScreen />}></Route>
        <Route path="/homescreen/authenticstyle" element={<AuthenticViewAllPage />} />
      </Routes>
    </Router>
  );
};

export default App;
