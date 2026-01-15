import { CLOUD_NAME } from "./const";

const path = {
    login: 'token/',
    signup: 'signup/',
    followSuggestions: 'follow-suggestions/',
    followUser: (id) => `user/follow/${id}/`,
    unfollowUser: (id) => `user/unfollow/${id}/`,
    profile: (username) => username ? `user/profile/${username}/` : 'user/profile/',
    searchUser: (value) => `user/?search=${value}`,
    notifications: 'notifications/',
    refreshToken: 'refresh/',
    uploadProfilePic: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
}

export default path;