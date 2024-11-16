import { API } from '../apis';

export const Login = async (email, password) => {
    try {
        const response = await fetch(`${API.BASE_URL}${API.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
        throw new Error(err);
    }
}