const path = {
    login: 'token/',
    signup: 'signup/',
    followSuggestions: 'follow-suggestions/',
    followUser: (id) => `user/follow/${id}/`,
    unfollowUser: (id) => `user/unfollow/${id}/`,
    profile: (username) => username ? `user/profile/${username}/` : 'user/profile/',
    searchUser: (value) => `user/?search=${value}`
}

export default path;