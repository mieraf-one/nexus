import axios from 'axios';
import { BASE_URL } from './const';

export async function AuthPost(endPoint, data) {
    try {
        const res = await axios.post(
            `${BASE_URL}/${endPoint}`,
            data,
        )

        return res.data

    } catch (err) {
        if (!err.response) {
            throw new Error('Something went wrong');
        }

        throw new Error(Object.values(err.response.data).join('\n'));
    }
}

export async function getReq(path) {
    try {
        const res = await axios.get(
            `${BASE_URL}/${path}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                }
            }
        )
        return res.data
    } catch (err) {
        if (!err.response) {
            throw new Error('Something went wrong');
        }

        if (err.response.status == 401) {
            throw new Error(401);
        }
        
        throw new Error(Object.values(err.response.data).join('\n'));
    }
}

export async function patchReq(path, data) {
    try {
        const res = await axios.patch(
            `${BASE_URL}/${path}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                }
            }
        )
        return res.data
    } catch (err) {
        if (!err.response) {
            throw new Error('Something went wrong');
        }

        if (err.response.status == 401) {
            throw new Error(401);
        }
        
        throw new Error(Object.values(err.response.data)
            .map(v => typeof v === 'object' ? JSON.stringify(v) : v)
            .join('\n'));

    }
}