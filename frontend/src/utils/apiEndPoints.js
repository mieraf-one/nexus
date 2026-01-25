import { CLOUD_NAME } from "./const";

const path = {
    login: 'token/',
    signup: 'signup/',
    followSuggestions: 'follow-suggestions/',
    followUser: (id) => `user/follow/${id}/`,
    unfollowUser: (id) => `user/unfollow/${id}/`,
    profile: (username) => `user/profile/${username}/`,
    searchUser: (value) => `user/?search=${value}`,
    notifications: 'notifications/',
    refreshToken: 'refresh/',
    uploadProfilePic: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    userFollowers: (username) => `user-followers/${username}/`,
    userFollowing: (username) => `user-following/${username}/`,
    posts: 'posts/',
    post: (postId) => `posts/${postId}/`,
    likePost: (postId) => `posts/${postId}/likes`,
    comments: (postId) => `posts/${postId}/comments`
}

export default path;