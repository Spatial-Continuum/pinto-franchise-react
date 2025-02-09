import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard.jsx";
import MainLayout from "../../../../GeneralComponent/Layout/MainLayout.jsx";
import { Menu as MenuIcon, Search } from "lucide-react";

import {
  fetchAuthenticateApi,
  selectAutheticate,
  selectApiLoading,
  selectApiError,
} from "../../../../../redux/slices/menu.js";

function ShowAuthentic() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Authentic, setAuthentic] = useState(location?.state?.Authentic || []);
  const [categoryName, setCategoryName] = useState("");
  const [singleCategory, setSinlgeCategory] = useState({});

  useEffect(() => {
    console.log("Dispatching fetchAuthenticateApi");
    dispatch(fetchAuthenticateApi()).then((response) => {
      if (response && response.payload) {
        setCategories(response.payload); // Updates cuisines
      }
    });
  }, [dispatch]);
  const handleSubcategory = (singleCat, categories) => {
    setCategoryName(singleCat.category_title);
    setSinlgeCategory(singleCat);
  };

  return (
    <MainLayout
      headerName={"Back"}
      headerClick={() =>
        navigate("/menu/manage-screen", { state: { Authentic } })
      }
    >
      <div className="p-6">
        <div>
          <div className="relative mb-8">
            <h2 className="text-lg font-semibold">
              {" "}
              Authentic Style of cooking
            </h2>
            <div className="flex justify-between items-center">
              <div>
                <input
                  type="text"
                  placeholder="Search here"
                  className="border border-gray-300 mt-2 rounded-lg px-2 py-1 pl-10 w-80 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <Search className="w-5 h-5 absolute left-3 top-10 text-gray-400" />
              </div>
              <button
                onClick={() =>
                  navigate("/menu/manage-screen/show-authentic", {
                    state: { Authentic },
                  })
                }
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add Restaurant
              </button>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex flex-wrap gap-5">
              {Authentic.map((authentic) => (
                <CategoryCard
                  key={authentic.authentic_id}
                  {...authentic}
                  style="w-56 h-50"
                  imagestyle="w-56 h-28 border rounded-t-lg"
                  title={authentic.authentic_title}
                  AdditonalText={
                    <div className="p-2">
                      {" "}
                      <h5 className="text-sm bold">{authentic.name}</h5>
                      <p style={{ fontSize: "10px" }}>
                        {authentic.short_description}
                      </p>
                    </div>
                  }
                  onEdit={() => {
                    navigate("/menu/manage-screen/categoty-form", {
                      state: { category, categories },
                    });
                  }}
                />
              ))}
            </div>

            {/* {categoryName? 
                <div className="my-8">   
                <h2 className="text-lg font-semibold">Sub Categories in {categoryName} </h2>  
                   <div className="border border-gray-200 rounded-lg">  
                    <div className="flex flex-wrap gap-4  m-4"> 
                    {singleCategory.subcategories?.map((subcategory) => (
                   <ShowFlexElements 
                   category={subcategory}  
                   title={subcategory.subcategory_title}
                   topName={true} 
                   style={"w-36 h-30"}
                   />
                  ))}
                      
                       </div>
                   
                    </div>
                  </div>
           : ''

           }
        */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
export default ShowAuthentic;
