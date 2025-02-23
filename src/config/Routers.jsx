import { Routes, Route } from "react-router";
import React, { Suspense } from "react";
import MainLayout from "../components/GeneralComponent/Layout/MainLayout.jsx";
import ShowAuthentic from "../components/MainComponent/Menu/ManageScreen/Authentic/ShowAuthentic.jsx";
// import Onboarding from '../pages/Merchant/Onboarding.jsx';
// import MarketingScreen from "../pages/Marketing/MarketingScreen.jsx";
// import DeliveryPartnerSalaried from "../pages/DeliveryPartner/DeliveryPartnerSalaried.jsx";
// import DeliveryPartnerDeliveryBased from "../pages/DeliveryPartner/DeliveryPartnerDeliveryBased.jsx";
// import DeliveryPartnerOnboarding from "../pages/DeliveryPartner/DeliveryPartnerOnboarding.jsx";
// import Restaurants from "../pages/Menu/Restaurants.jsx";
// import AddItem from "../modules/restaurants/AddItem.jsx";
// import Addmenu from "../pages/Menu/Addmenu.jsx";
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
      <Route path="/" element={<MainLayout />}></Route>
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
      {/* <Route path="/homescreen/authenticstyle" element={<ManageScreen />} /> */}

      {/* <Route path='/merchant/onboarding'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <Onboarding/>
          </Suspense>
        
        }

        />
        <Route path='/onboardingform'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <OnboardingForm/>
          </Suspense>
        }
        />

        <Route path='/marketing'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <MarketingScreen/>
          </Suspense>
        }
        />


        <Route path='/deliverypartner/salaried'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            < DeliveryPartnerSalaried/>
          </Suspense>
        }
        />
        <Route path='/deliverypartner/deliverybased'
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
        />
        <Route path='/menu/quick-search'
        element={
          <Suspense fallback={<div className="text-center m-t-15">Loading...</div>}>
            <QuickSearch/>
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
            <Addmenu />
          </Suspense>
        }
        />    */}
    </Routes>
  );
};
export default Routers;
