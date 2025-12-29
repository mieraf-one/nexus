import axios from 'axios';
import { BASE_URL } from './const';

export async function AuthPost(endPoint, data) {
    try {
        const res = await axios.post(
            `${BASE_URL}/${endPoint}`,
            data,
            {timeout: 7000}
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
        console.log(res);
        return res.data
    } catch (err) {
        if (!err.response) {
            throw new Error('Something went wrong');
        }
        
        throw new Error(Object.values(err.response.data).join('\n'));
    }
}