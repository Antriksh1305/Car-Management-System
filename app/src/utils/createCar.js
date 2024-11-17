import { API } from "../apis";

export const createCar = async (car) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.CREATE_CAR}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.log('Error in creating car: ', err);
        throw new Error(err);
    }
}