from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response
from .serializers import FollowSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

# Create your views here.
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
