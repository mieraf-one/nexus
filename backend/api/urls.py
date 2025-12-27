from django.urls import path
from .views import SignupView
from user.views import FollowView, ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('user/follow/<int:pk>/', FollowView.as_view(), name='follow'),
    path('user/profile/', ProfileView.as_view(), name='profile')
]
