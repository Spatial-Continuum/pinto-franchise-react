import { Routes, Route } from "react-router";

import React, { Suspense } from "react";
import MainLayout from "../components/GeneralComponent/Layout/MainLayout.jsx";
import ShowAuthentic from "../components/MainComponent/Menu/ManageScreen/Authentic/ShowAuthentic.jsx";
import Onboarding from "../pages/Merchant/Onboarding.jsx";
import OnboardingForm from "../pages/Merchant/NewMerchantForm/OnboardingForm.jsx";
import MarketingScreen from "../pages/Marketing/MarketingScreen.jsx";
import Restaurants from "../pages/Menu/Restaurants.jsx";
import Addmenu from "../pages/Menu/Addmenu.jsx";
import QuickSearch from "../components/MainComponent/Menu/QuickSearch/index.jsx";
import CustomerDetail from "../components/MainComponent/orders/PhoneOrders/restaurants/CustomerDetail.jsx";
import ManageMerchant from "../pages/Merchant/ManageMerchant/ManageMerchant.jsx";
import OnboardingFormView from "../pages/Merchant/MerchantViewForm/OnboardingFormView.jsx";
import ManagePartners from "../pages/DeliveryPartner/ManagePartners.jsx";
import OrderHistoryIndex from "../components/MainComponent/orders/OrderHistory/OrderHistoryIndex.jsx";
import Dashboard from "../components/MainComponent/Dashboard";
import LoginPage from "../components/MainComponent/Login/login";
const GenerateOtp = React.lazy(() =>
  import("../components/MainComponent/Login/generateOtp.jsx")
);
const SetNewPassword = React.lazy(() =>
  import("../components/MainComponent/Login/setNewPassword.jsx")
);
// import Login from "../../../src/pages/Auth/Login.jsx";
import OrderCategory from "../components/MainComponent/orders/PhoneOrders/customers/OrderCategory.jsx";
import OrderTable from "../components/MainComponent/orders/PhoneOrders/restaurants/OrderTable.jsx";
const ManageScreen = React.lazy(() =>
  import("../components/MainComponent/Menu/index")
);
const ShowCategory = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/Category/ShowCategory.jsx"
  )
);
const CategoryForm = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/Category/CategoryForm.jsx"
  )
);
const ShowQuickFilter = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/QuickFilter/showQuickFilter.jsx"
  )
);
const PhoneOrder = React.lazy(() =>
  import("../components/MainComponent/orders/PhoneOrders/PhoneOrder.jsx")
);
const NewOrders = React.lazy(() =>
  import("../components/MainComponent/orders/PhoneOrders/customers/NewOrder.jsx")
);
const ManageOrder = React.lazy(() =>
  import("../components/MainComponent/orders/ManageOrders/ManageIndex.jsx")
);
const QuickFilterForm = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/QuickFilter/QuickFilterForm.jsx"
  )
);
const ShowCitySpot = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/CitySpotLight/showCitySpotLight.jsx"
  )
);
const ShowSubCategory = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/SubCategory/ShowSubCategory.jsx"
  )
);
const ShowCuisine = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/Cuisine/ShowCuisine.jsx"
  )
);
const ShowAuthenticStyle = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/Authentic/ShowAuthentic.jsx"
  )
);
const ShowTopBrand = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/TopBrand/showTopBrand.jsx"
  )
);
const ShowQuickRestaurant = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/QuickRestaurant/showQuickRestaurant.jsx"
  )
);
const QuickRestaurantForm = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/QuickRestaurant/QuickRestaurantForm.jsx"
  )
);
const AuthenticForm = React.lazy(() =>
  import(
    "../components/MainComponent/Menu/ManageScreen/Authentic/AuthenticForm.jsx"
  )
);

const Routers = (props) => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}></Route>

      <Route
        path="/menu/manage-screen"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ManageScreen />
          </Suspense>
        }
      />

      <Route
        path="/menu/manage-screen/show-category"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ShowCategory />
          </Suspense>
        }
      />

      <Route
        path="/menu/manage-screen/categoty-form"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <CategoryForm />
          </Suspense>
        }
      />

      <Route
        path="/"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/login/generate-otp"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <GenerateOtp />
          </Suspense>
        }
      />
      <Route
        path="login/set-new-password"
        element={
          <Suspense fallback={<div>Loading....</div>}>
            <SetNewPassword />
          </Suspense>
        }
      />
      <Route
        path="/orders/new-orders/:id"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <NewOrders />
          </Suspense>
        }
      />
      <Route
        path="/orders/category/:userid/:restaurantid"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <OrderCategory />
          </Suspense>
        }
      />
      <Route
        path="/menu/manage-screen/show-quick-filter"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ShowQuickFilter />
          </Suspense>
        }
      />

      <Route
        path="/menu/manage-screen/quick-filter-form"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <QuickFilterForm />
          </Suspense>
        }
      />

      <Route
        path="/menu/manage-screen/show-city-sopts"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ShowCitySpot />
          </Suspense>
        }
      />

      <Route
        path="/menu/manage-screen/show-subcategory"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ShowSubCategory />
          </Suspense>
        }
      />

      <Route
        path="/menu/manage-screen/show-subcuisine"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ShowCuisine />
          </Suspense>
        }
      />
      <Route
        path="/menu/manage-screen/show-authentic"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ShowAuthenticStyle />
          </Suspense>
        }
      />

      <Route
        path="/menu/manage-screen/show-topbrand"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ShowTopBrand />
          </Suspense>
        }
      />
      <Route
        path="/menu/manage-screen/show-quick-restaurant"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ShowQuickRestaurant />
          </Suspense>
        }
      />

      <Route
        path="/menu/manage-screen/quick-restaurant-form"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <QuickRestaurantForm />
          </Suspense>
        }
      />
      <Route
        path="menu/manage-screen/authentic-form"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <AuthenticForm />
          </Suspense>
        }
      />

      <Route
        path="/merchant/onboarding"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <Onboarding />
          </Suspense>
        }
      />
      <Route
        path="/onboardingform"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <OnboardingForm />
          </Suspense>
        }
      />
      <Route
        path="/onboarding-form-view/:restaurantId"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <OnboardingFormView />
          </Suspense>
        }
      />
      <Route
        path="/marketing"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <MarketingScreen />
          </Suspense>
        }
      />

      <Route
        path="/deliverypartner/manage-partners"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ManagePartners />
          </Suspense>
        }
      />

      <Route
        path="/menu/quick-search"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <QuickSearch />
          </Suspense>
        }
      />
      <Route
        path="/menu/restaurant-item"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <Restaurants />
          </Suspense>
        }
      />

      <Route
        path="/menu/restaurant-item/addmenu/:restaurantId"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <Addmenu />
          </Suspense>
        }
      />
      <Route
        path="/orders/phone-orders"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <PhoneOrder/>
          </Suspense>
        }
      />
      <Route
        path="/orders/phone-orders/searchrestaurant/customerdetail/:id"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <CustomerDetail />
          </Suspense>
        }
      />

      <Route
        path="/orders/order-history"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <OrderHistoryIndex />
          </Suspense>
        }
      />

      <Route
        path="/merchant/managemerchant"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ManageMerchant />
          </Suspense>
        }
      />
      <Route
        path="/orders/manage-orders"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <ManageOrder />
          </Suspense>
        }
      />
      <Route
        path="/orders/restaurant_customer/:restaurantid/:userid"
        element={
          <Suspense
            fallback={<div className="text-center m-t-15">Loading...</div>}
          >
            <OrderTable />
          </Suspense>
        }
      />
    </Routes>
  );
};
export default Routers;
