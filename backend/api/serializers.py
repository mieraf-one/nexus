from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import ValidationError

CustomUser = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}


    def validate_confirm_password(self, value):
        password = self.initial_data.get('password')

        if password != value:
            raise ValidationError('Passwords do not match')

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        return CustomUser.objects.create_user(**validated_data)
