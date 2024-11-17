import { API } from "../apis";

export const getList = async (token) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.LIST_CARS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error in fetching list: ', err);
        throw new Error(err);
    }
}