from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .serializers import FollowSerializer
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