
const baseUrl = process.env.REACT_APP_API_URL;

export const fetchRequest = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const language = localStorage.getItem('language') || 'en';

    if( method === 'GET' ){
        return fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': language
            }
        });
    }else{
        return fetch(url, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': language
            },
            body: JSON.stringify( data )
        });
    }

}

export const fetchWithFile = data => {

    const language = localStorage.getItem('language') || 'en';

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('logo', data.logo);
    formData.append('rating', data.rating);
    data.food_type.forEach(foodType => {
        formData.append('food_type', foodType);
    });

    return fetch(`${baseUrl}/restaurants/${data.slug}/`,{
        method: 'PUT',
        headers: {
            'Accept-Language': language
        },
        body: formData
    });
}