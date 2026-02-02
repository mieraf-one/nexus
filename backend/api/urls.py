from django.urls import path
from .views import SignupView
from user import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('user/follow/<int:pk>/', views.FollowView.as_view(), name='follow'),
    path('user/unfollow/<int:pk>/', views.UnFollowView.as_view(), name='follow'),
    path('user/profile/', views.ProfileView.as_view(), name='profile'),
    path('user/profile/<str:username>/', views.ProfileView.as_view(), name='profile'),
    path('follow-suggestions/', views.FollowSuggestionView.as_view(), name='follow-suggestion'),
    path('user/', views.SearchUserView.as_view(), name='search-user'),
    path('notifications/', views.NotificationView.as_view(), name='notification'),
    path('user-followers/<str:username>/', views.FollowersView.as_view(), name='followers'),
    path('user-following/<str:username>/', views.FollowingView.as_view(), name='following'),
    path('posts/', views.PostView.as_view(), name='post'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:pk>/likes', views.LikeView.as_view(), name='like'),
    path('posts/<int:pk>/comments', views.CommentView.as_view(), name='comments')
]
