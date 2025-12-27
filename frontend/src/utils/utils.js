import axios from 'axios';
import { BASE_URL } from './const';

export async function SignupPost(data) {
    try {
        const res = await axios.post(
            `${BASE_URL}/signup/`,
            data
        )

        return res.data

    } catch (err) {
        if (!err.response) {
            throw new Error('Something went wrong');
        }

        throw new Error(Object.values(err.response.data).join('\n'));
    }
}