from rest_framework.generics import CreateAPIView
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny

# Create your views here.
class SignupView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [ AllowAny ]