import axios from 'axios';
import { BASE_URL, UPLOAD_PRESET } from './const';
import path from './apiEndPoints';
import { request } from '../auth/client';
import { getAccessToken } from './token';

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

        throw new Error(Object.values(err.response.data)[0]);
    }
}

export async function getReq(path) {
    try {
        const res = await axios.get(
            `${BASE_URL}/${path}`,
            
            {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`
                }
            }
        )
        return res.data
    } catch (err) {
        console.log(err.response.data)
        if (!err.response) {
            throw new Error('Something went wrong');
        }

        if (err.response.status == 401) {
            try {
                await refreshToken();
                console.log('token refreshed');
                
                const res = await axios.get(
                    `${BASE_URL}/${path}`,
                    
                    {
                        headers: {
                            Authorization: `Bearer ${getAccessToken()}`
                        }
                    }
                )
                return res.data
            } catch (err) {
                if (!err.response) {
                    throw new Error('Something went wrong');
                }

                if (err.response.status == 401) {
                    console.log('auth problem')
                    const authError = new Error('TOKEN_EXPIRED');
                    authError.code = 401;
                    throw authError;
                }

                throw new Error(Object.values(err.response.data).join('\n'));
            }
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
            try {
                await refreshToken();
                console.log('token refreshed');
                
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
                    const authError = new Error('TOKEN_EXPIRED');
                    authError.code = 401;
                    throw authError;
                }

                throw new Error(Object.values(err.response.data).join('\n'));
            }
        }
        
        throw new Error(Object.values(err.response.data)
            .map(v => typeof v === 'object' ? JSON.stringify(v) : v)
            .join('\n'));

    }
}


export async function postReq(path, data) {
    try {
        const res = await axios.post(
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
        // console.log(err)
        if (!err.response) {
            throw new Error('Something went wrong');
        }

        if (err.response.status == 401) {
            try {
                await refreshToken();
                console.log('token refreshed');
                
                const res = await axios.post(
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
                    const authError = new Error('TOKEN_EXPIRED');
                    authError.code = 401;
                    throw authError;
                }

                throw new Error(Object.values(err.response.data).join('\n'));
            }
        }
        
        throw new Error(Object.values(err.response.data).join('\n'));
    }
}


export async function followUser(id) {
    try {
      const res = await postReq(path.followUser(id), {})
        return res;
    } catch (err) {
      throw new Error(err.message);
    }
}

export async function unFollowUser(id) {
    try {
        const res = await postReq(path.unfollowUser(id), {});
        return res;
    } catch (err) {
       throw new Error(err.message);
    }
}

export async function refreshToken() {
    try {
        const res = await axios.post(
            `${BASE_URL}/${path.refreshToken}`,
            {refresh: localStorage?.getItem('refresh')}
        )

        console.log('refreshed token');
        console.log(res);
        /* put new access token in localstorage */
        localStorage.setItem('access', res.data.access);

    } catch (err) {
        console.log(err);
        if (!err.response) {
            throw new Error('Something went wrong');
        }
        
        throw new Error(Object.values(err.response.data).join('\n'));
    }
}


export async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
        const res = await axios.post(
        path.uploadProfilePic,
        formData
        );

        console.log(`secure_url: ${res.data.secure_url}`)
        return res.data.secure_url;
    } catch (error) {
        throw new Error("upload failed");
    }
}


export function properDate(date) {
    return new Date(date).toLocaleTimeString();
}