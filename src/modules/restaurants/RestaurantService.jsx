import axios from 'axios';

//baseUrl

const apiclient = axios.create({
    baseURL:"https://139.5.189.164/",
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
    }
}

export default RestaurantService;