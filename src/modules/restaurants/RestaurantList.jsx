import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRestaurants } from '../../state/slices/franchiseSlice';
import RestaurantService from './RestaurantService'


const RestaurantList =() =>{
    const dispatch = useDispatch()
    const restaurants = useSelector((state) => state.franchise.restaurants);

    useEffect(() => {
      RestaurantService.getAllRestaurants().then((data) => {
        dispatch(setRestaurants(data));
      });
    }, [dispatch]);
  
    return (
      <div>
        <h1>Restaurants</h1>
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>{restaurant.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RestaurantList;