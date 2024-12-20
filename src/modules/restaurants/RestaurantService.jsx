    import axios from 'axios';

    //baseUrl

    const apiclient = axios.create({
        baseURL:"http://139.5.189.164/",
        timeout:10000,
        headers:{
            "Content-Type":"application/json"
        },
    })


    const RestaurantService ={
        getallRestaurants: async () =>{
            try{
                const response = await apiclient.get('/restaurant/merchant');
                return response.data;

            
            }catch(error){
                console.error("Error fetching restaurant:",error);
                throw error;    
            }
        },
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
        }
    }

    export default RestaurantService;