import axios from 'axios';
import Onboarding from '../../pages/Merchant/Onboarding';

//baseUrl

const apiclient = axios.create({
    baseURL: "https://service.pintogroups.in",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
})


const RestaurantService = {
    // getallRestaurants: async () => {
    //     try {
    //         const response = await apiclient.get('/restaurant/merchant');
    //         return response.data;


    //     } catch (error) {
    //         console.error("Error fetching restaurant:", error);
    //         throw error;
    //     }
    // },
    // getRestaurantList : async () => {
    //     try{
    //         const response = await apiclient.get('/restaurant/merchant/list');
    //         return response.data;
    //         console.log(response.data)
    //     } catch (error) {
    //         console.error("Error fetching restaurant list:", error);
    //         throw error;
    //     }
    //     },
    getRestaurantById: async (restaurantId) => {
        try {
            const response = await apiclient.get(`/restaurant/merchant/${restaurantId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching restaurant by item ID ${restaurantId}:`, error);
            throw error;
        }
    },
    getAllCategories: async () => {
        try {
            const response = await apiclient.get('/menu/category');
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    },
    getAllCuisines: async () => {
        try {
            const response = await apiclient.get('/menu/cuisine');
            return response.data;
        } catch (error) {
            console.error("Error fetching cuisines:", error);
            throw error;
        }
    },
    getAllDishFilters: async () => {
        try {
            const response = await apiclient.get('/menu/quick_filters');
            return response.data;
        } catch (error) {
            console.error("Error fetching dish filters:", error);
            throw error;
        }
    },
    getTopBrands: async () => {
        try {
            const response = await apiclient.get('/restaurant/merchant/toprestaurants');
            return response.data;
        } catch (error) {
            console.error("Error fetching top brands:", error);
            throw error;
        }
    },
    getQuickFilterRestaurants: async () => {
        try {
            const response = await apiclient.get('/restaurant/menu/quickfilterrestaurant');
            return response.data;
        } catch (error) {
            console.error("Error fetching quick filter restaurants:", error);
            throw error;
        }
    },
    getAllAuthenticCookingStyle: async () => {
        try {
            const response = await apiclient.get('/restaurant/merchant/authentic-restaurants');
            return response.data;
        } catch (error) {
            console.error("Error fetching authentic cooking style restaurants:", error);
            throw error;
        }
    },
    createRestaurant: async (restaurantData) => {
        try {
            const response = await apiclient.post('/restaurant/merchant', restaurantData);
            return response.data;
        } catch (error) {
            console.error("Error creating restaurant:", error);
            throw error;
        }
    },
    createItemNew: async (itemData) => {
        try {
            const response = await apiclient.post('/restaurant/item', itemData,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure JSON is sent
                },
            
            });
            return response.data;
        } catch (error) {
            console.error("Error creating item:", error);
            throw error;
        }
    },
    searchSubcategory: async (searchTerm) => {
        try {
            // Make an API call to search for subcategories based on subcategory_title
            const response = await apiclient.get(`/menu/subcategory/by-name?subcategory_title=${searchTerm}`);
            return response.data;
        } catch (error) {
            console.error("Error searching subcategories:", error);
            throw error;
        }
    },
    editItem: async (itemId, itemData) => {
        try {
            // Make an API call to update the item
            const response = await apiclient.put(`/restaurant/item/${itemId}`, itemData);
            return response.data;
        } catch (error) {
            console.error(`Error editing item with ID ${itemId}:`, error);
            throw error;
        }
    },
    postNewRestaurant: async (dataToSubmit) => {
        try {
            // Log the data being sent to the API for verification
            console.log("Submitting restaurant data:", dataToSubmit)

            // Make an API call to post new restaurant
            const response = await apiclient.post('/restaurant/merchant', dataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for form-data submission
                },
            })



            // Log the successful response data
            console.log("Restaurant created successfully:", response.data);
            return response.data;

        } catch (error) {
            // Handle the error and log detailed information
            if (error.response) {
                // Log the detailed error response from the API
                console.error("API Error response:", error.response.data);
                console.error("API Error status:", error.response.status);
                console.error("API Error headers:", error.response.headers);
            } else {
                // Handle other errors (e.g., network errors)
                console.error("Error posting new restaurant:", error.message);
            }

            // Rethrow the error to propagate it further
            throw error;
        }
    },
    getMenuCategory: async (restaurantId) => {
        try {
            // Make a GET request with query params
            console.log("Restarantid", restaurantId);
            const response = await apiclient.get(`/restaurant/menucategory?restaurant_id=${restaurantId}`);
            
            // Return the response data
            return response.data;
        } catch (error) {
            console.error(`Error fetching menu category for restaurant ID ${restaurantId}:`, error);
            throw error;
        }
    },
    createAddon: async (restaurantId, addonData) => {
        try {
            
            const response = await apiclient.post(
                `/restaurant/merchant/addons/${restaurantId}`,
                addonData
            );
            return response.data;
        } catch (error) {
            console.error("Error creating addon:", error);
            throw error;
        }
    },
    getAllAddon: async (restaurantId) => {
        try {
            // Replace `merchantId` with the actual ID you need
            const response = await apiclient.get(
                `/restaurant/merchant/addons/${restaurantId}`
            );
            return response.data;
        } catch (error) {
            console.error(`Error fetching addons for merchant ID ${merchantId}:`, error);
            throw error;
        }
    },
    updateRestaurantSuccess: async (restaurantId) => {
        try {
            const response = await apiclient.put(
               `/restaurant/merchant/${restaurantId}/update-onboarding`,
               {onboarding_status: "Success"}
            );
            return response.data;
        } catch (error) {
            console.error(
                `Error updating onboarding status for restaurant ID ${restaurantId}:`,
                error)
        }
    },
    updateRestaurantRejected: async (restaurantId) => {
        try {
            const response = await apiclient.put(
               `/restaurant/merchant/${restaurantId}/update-onboarding`,
               {onboarding_status: "Rejected"}
            );
            return response.data;
        } catch (error) {
            console.error(
                `Error updating onboarding status for restaurant ID ${restaurantId}:`,
                error)
        }
    },
    updateRestaurant: async (restaurantId, dataToSubmit) => {
        try {
          const response = await apiclient.put(`/restaurant/merchant/${restaurantId}`, dataToSubmit, {
            headers: {
              'Content-Type': 'multipart/form-data',  // Required for form-data submission
            },
          });
          return response.data;
        } catch (error) {
          console.error(`Error updating restaurant with ID ${restaurantId}:`, error);
          throw error;
        }
      },



}





export default RestaurantService;

