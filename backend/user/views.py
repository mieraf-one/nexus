from rest_framework import generics
from rest_framework.response import Response
from . import serializers, paginations, models
from rest_framework import status
from rest_framework.filters import SearchFilter
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class FollowView(generics.CreateAPIView):
    serializer_class = serializers.FollowSerializer

    def post(self, request, pk):
        serializer = self.get_serializer(data={"user_id": pk}, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.UserSerializer
    lookup_field = 'username'

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        return CustomUser.objects.prefetch_related('posts').all()

class UnFollowView(generics.CreateAPIView):
    serializer_class = serializers.UnFollowSerializer

    def post(self, request, pk):
        serializer = self.get_serializer(data={'user_id': pk}, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        response = serializer.save()

        return Response(response, status=status.HTTP_201_CREATED)

class FollowSuggestionView(generics.ListAPIView):
    serializer_class = serializers.FollowSuggestionSerializer
    pagination_class = paginations.FollowSuggestionPagination

    def get_queryset(self):
        print(f'request: {self.request.user}')
        user = self.request.user

        following_ids = models.Follow.objects.filter(
            follower=user
        ).values_list('following_id', flat=True)

        return CustomUser.objects.exclude(
            id__in=following_ids
        ).exclude(
            username=user.username
        ).order_by('-id')  

class SearchUserView(generics.ListAPIView):
    serializer_class = serializers.FollowSuggestionSerializer
    filter_backends = [SearchFilter]
    search_fields = ['username']

    def get_queryset(self):
        search = self.request.query_params.get('search')
        
        if not search:
            return CustomUser.objects.none()
        return CustomUser.objects.all()

class NotificationView(generics.ListAPIView):
    serializer_class = serializers.NotificationSerializer

    def get_queryset(self):
        user = self.request.user
        return models.Notification.objects.select_related('sender', 'receiver') \
                                            .filter(receiver=user) \
                                            .order_by('-created_at')

class FollowersView(generics.RetrieveAPIView):
    serializer_class = serializers.FollowersSerializer
    queryset = CustomUser.objects.all()
    lookup_field = 'username'

class FollowingView(generics.RetrieveAPIView):
    serializer_class = serializers.FollowingSerializer
    queryset = CustomUser.objects.all()
    lookup_field = 'username'

class PostView(generics.ListCreateAPIView):
    serializer_class = serializers.PostSerializer
    pagination_class = paginations.FollowSuggestionPagination

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_create(self, serializer):
        author = self.request.user
        return serializer.save(author=author)
    
    def get_queryset(self):
        return (
            models.Post.objects
                .select_related('author')
                .prefetch_related('comments', 'likes')
        )

class PostDetailView(generics.RetrieveAPIView):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer

class LikeView(generics.ListCreateAPIView):
    queryset = models.Like.objects.all()
    serializer_class = serializers.LikeSerializer

    def perform_create(self, serializer):
        post = get_object_or_404(models.Post, pk=self.kwargs.get('pk'))
        liker = self.request.user

        return serializer.save(post=post, liker=liker)
    
    def get_queryset(self):
        post_id = self.kwargs.get('pk', None)
        post = get_object_or_404(models.Post, pk=post_id)
        return models.Like.objects.filter(post=post)

class CommentView(generics.ListCreateAPIView):
    serializer_class = serializers.CommentSerializer

    def perform_create(self, serializer):
        author = self.request.user
        post = get_object_or_404(models.Post, pk=self.kwargs['pk'])

        return serializer.save(
            author=author,
            post=post
        )

    def get_serializer_context(self):
        return {'request': self.request, 'kwargs': self.kwargs}

    def get_queryset(self):
        post_id = self.kwargs['pk']
        post = get_object_or_404(models.Post, pk=post_id)

        return post.comments.select_related('author').all()