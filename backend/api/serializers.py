from rest_framework import serializers
from django.contrib.auth.models import User
from user.models import CustomUser
from rest_framework.validators import ValidationError

class SignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}


    def validate_confirm_password(self, value):
        password = self.initial_data.get('password')

        if password != value:
            raise ValidationError('Passwords do not match')

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        user = User.objects.create_user(**validated_data)
        CustomUser.objects.create(user=user)
        return user
