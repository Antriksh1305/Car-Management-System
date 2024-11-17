import { API } from '../apis';

export const deleteCar = async (productId, token) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.DELETE_CAR}/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error deleting car:', err.message);
        throw err;
    }
};
