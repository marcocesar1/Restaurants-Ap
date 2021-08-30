
export const parseRestaurants = restaurants => 
    restaurants.map(restaurant => 
        restaurant.rating ? 
            {
                ...restaurant, 
                rating: restaurant.rating.toFixed(2),
                reviews: restaurant.reviews ? restaurant.reviews : []
            } : restaurant 
    );

export const parseFoodType = food_type => food_type.map(food => ({
    ...food,
    isEdit: false
}))