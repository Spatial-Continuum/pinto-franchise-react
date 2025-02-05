import { Routes, Route } from "react-router";
import React, { Suspense } from "react"
import MainLayout from "../components/GeneralComponent/Layout/MainLayout.jsx"
import Onboarding from '../pages/Merchant/Onboarding.jsx';
import OnboardingForm from "../pages/Merchant/NewMerchantForm/OnboardingForm.jsx";
import MarketingScreen from "../pages/Marketing/MarketingScreen.jsx";

import Restaurants from "../pages/Menu/Restaurants.jsx";
import Addmenu from '../pages/Menu/Addmenu.jsx'
import QuickSearch from '../components/MainComponent/Menu/QuickSearch/index.jsx';
import CustomerDetail from "../components/MainComponent/orders/PhoneOrders/restaurants/CustomerDetail.jsx";
import ManageMerchant from "../pages/Merchant/ManageMerchant/ManageMerchant.jsx";
import OnboardingFormView from "../pages/Merchant/MerchantViewForm/OnboardingFormView.jsx";
import ManagePartners from "../pages/DeliveryPartner/ManagePartners.jsx";
import OrderHistoryIndex from "../components/MainComponent/orders/OrderHistory/OrderHistoryIndex.jsx";
const ManageScreen = React.lazy(() => import('../components/MainComponent/Menu/index'));
const ShowCategory = React.lazy(() => import('../components/MainComponent/Menu/ManageScreen/Category/ShowCategory.jsx'))
const CategoryForm = React.lazy(() => import("../components/MainComponent/Menu/ManageScreen/Category/CategoryForm.jsx"))
const ShowQuickFilter = React.lazy(() => import("../components/MainComponent/Menu/ManageScreen/QuickFilter/showQuickFilter.jsx"))
const QuickFilterForm = React.lazy(() => import("../components/MainComponent/Menu/ManageScreen/QuickFilter/QuickFilterForm.jsx"))
const ShowCitySpot = React.lazy(() => import("../components/MainComponent/Menu/ManageScreen/CitySpotLight/showCitySpotLight.jsx"))
const ShowSubCategory = React.lazy(() => import("../components/MainComponent/Menu/ManageScreen/SubCategory/ShowSubCategory.jsx"))
const PhoneOrder = React.lazy(() => import("../components/MainComponent/orders/PhoneOrders/index.jsx"))
const ManageOrder = React.lazy(() => import("../components/MainComponent/orders/ManageOrders/ManageIndex.jsx"));
const Routers = (props) => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}></Route>

      <Route path='/menu/manage-screen'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <ManageScreen />
          </Suspense>
        }
      />
      <Route path='/menu/manage-screen/show-category'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <ShowCategory />
          </Suspense>
        }
      />
      <Route path='/menu/manage-screen/categoty-form'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <CategoryForm />
          </Suspense>
        }
      />
      <Route path='/menu/manage-screen/show-quick-filter'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <ShowQuickFilter />
          </Suspense>
        }
      />
      <Route path='/menu/manage-screen/quick-filter-form'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <QuickFilterForm />
          </Suspense>
        }
      />
      <Route path='/menu/manage-screen/show-city-sopts'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <ShowCitySpot />
          </Suspense>
        }
      />
      <Route path='/menu/manage-screen/show-subcategory'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <ShowSubCategory />
          </Suspense>
        }
      />
      {/* <Route path="/homescreen/authenticstyle" element={<ManageScreen />} /> */}

      <Route path='/merchant/onboarding'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <Onboarding />
          </Suspense>

        }

      />
      <Route path='/onboardingform'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <OnboardingForm />
          </Suspense>
        }
      />
      <Route path="/onboarding-form-view/:restaurantId"
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <OnboardingFormView />
          </Suspense>
        }
      />
      <Route path='/marketing'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <MarketingScreen />
          </Suspense>
        }
      />


      <Route path='/deliverypartner/manage-partners'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            < ManagePartners />
          </Suspense>
        }
      />
      {/* <Route path='/deliverypartner/deliverybased'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            < DeliveryPartnerDeliveryBased/>
          </Suspense>
        }
        />
        <Route path='/deliverypartner/onboarding'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            < DeliveryPartnerOnboarding/>
          </Suspense>
        }
        /> */}
      <Route path='/menu/quick-search'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <QuickSearch />
          </Suspense>
        }
      />
      <Route path='/menu/restaurant-item'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <Restaurants />
          </Suspense>
        }
      />


      <Route path='/menu/restaurant-item/addmenu/:restaurantId'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            < Addmenu />
          </Suspense>
        }
      />
      <Route path='/orders/phone-orders'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <PhoneOrder />
          </Suspense>
        }
      />
      <Route path='/orders/phone-orders/searchrestaurant/customerdetail/:id'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <CustomerDetail />
          </Suspense>
        }
      />

      <Route path='/orders/order-history'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <OrderHistoryIndex />
          </Suspense>
        }/>
        
         <Route path='/merchant/managemerchant'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <ManageMerchant />
          </Suspense>
        }
      />
      <Route path='/orders/manage-orders'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <ManageOrder />
          </Suspense>
        }
      />

    </Routes>
  )
}
export default Routers;
