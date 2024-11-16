import { API } from '../apis';

export const Register = async (name, email, password) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.REGISTER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
        throw new Error(err);
    }
}