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
}

export default RestaurantService;