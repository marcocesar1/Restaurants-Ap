import { useSelector } from "react-redux"

export default function useFoodTypes() {

    const { isLoading, types } = useSelector(state => state.food_types);

    return {
        food_types: types,
        isLoading
    }
}
