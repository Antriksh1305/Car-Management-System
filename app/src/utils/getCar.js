import { API } from '../apis';

export const getCar = async (productId, token) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.GET_CAR}/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error getting car:', err.message);
        throw err;
    }
};
