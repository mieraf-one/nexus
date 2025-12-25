from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .serializers import SignupSerializer

# Create your views here.
class SignupView(CreateAPIView):
    serializer_class = SignupSerializer