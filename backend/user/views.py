from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework.response import Response
from .serializers import FollowSerializer, ProfileSerializer, UnFollowSerializer, FollowSuggestionSerializer
from rest_framework import status
from .models import CustomUser, Follow
from django.contrib.auth.models import User
from .paginations import FollowSuggestionPagination


class FollowView(CreateAPIView):
    serializer_class = FollowSerializer

    def post(self, request, pk):
        serializer = self.get_serializer(data={"user_id": pk}, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)

class ProfileView(RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer

    def get_serializer_context(self):
        return {'request': self.request}
    
    def get_object(self):
        return self.request.user.custom_user


class UnFollowView(CreateAPIView):
    serializer_class = UnFollowSerializer

    def post(self, request, pk):
        serializer = self.get_serializer(data={'user_id': pk}, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        response = serializer.save()

        return Response(response, status=status.HTTP_201_CREATED)


class FollowSuggestionView(ListAPIView):
    serializer_class = FollowSuggestionSerializer
    pagination_class = FollowSuggestionPagination

    def get_queryset(self):
        user = self.request.user.custom_user

        following_ids = Follow.objects.filter(
            follower=user
        ).values_list('following_id', flat=True)

        return User.objects.exclude(
            custom_user__id__in=following_ids
        ).exclude(
            custom_user=user
        ).order_by('-id')
    