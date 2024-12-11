import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Sample page (Dashboard)
import NotFound from './pages/NotFound'; // 404 Page
import '../src/App.css';
import Main from './layouts/Main';
import DeliveryPartnerSalaried from './pages/DeliveryPartner/DeliveryPartnerSalaried';
import FilterDropdown from './components/Dropdown/FilterDropdown';
import DeliveryPartnerDeliveryBased from './pages/DeliveryPartner/DeliveryPartnerDeliveryBased';


const App = () => {
  return (
   <>
    <Router>
      <Routes>
       
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/delivery-partner/salaried" element={<DeliveryPartnerSalaried />} /> */}
          
        </Route>
        
       
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Routes>
        <Route path="/delivery-partner/salaried" element={<DeliveryPartnerSalaried />} />
        <Route path="/delivery-partner/deliverybased" element={<DeliveryPartnerDeliveryBased />} />
        
      </Routes>
    </Router>
   </> 
  );
};

export default App;
