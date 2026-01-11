from django.urls import path
from .views import SignupView
from user.views import FollowView, ProfileView, UnFollowView, FollowSuggestionView, SearchUserView, NotificationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('user/follow/<int:pk>/', FollowView.as_view(), name='follow'),
    path('user/unfollow/<int:pk>/', UnFollowView.as_view(), name='follow'),
    path('user/profile/', ProfileView.as_view(), name='profile'),
    path('user/profile/<str:username>/', ProfileView.as_view(), name='profile'),
    path('follow-suggestions/', FollowSuggestionView.as_view(), name='follow-suggestion'),
    path('user/', SearchUserView.as_view(), name='search-user'),
    path('notifications/', NotificationView.as_view(), name='notification')
]
