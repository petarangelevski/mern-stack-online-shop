import Axios from 'axios';

export const signup = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await Axios.post('/api/auth/signup', data, config);

    return response;
}

export const signin = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await Axios.post('/api/auth/signin', data, config);

    return response;
}