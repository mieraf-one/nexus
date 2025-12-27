from rest_framework import serializers
from .models import CustomUser, Follow
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User


class FollowSerializer(serializers.Serializer):
    user_id = serializers.CharField(write_only=True)

    def validate_user_id(self, value):
        user = get_object_or_404(CustomUser, pk=value)

        if self.context['request'].user.custom_user == user:
            raise ValidationError("You cannot follow yourself.")

        if Follow.objects.filter(
            follower = self.context['request'].user.custom_user,
            following = user
        ).exists():
            raise ValidationError("Already following.")
        
        return value
    
    def create(self, validated_data):
        follower = self.context['request'].user.custom_user
        following = get_object_or_404(CustomUser, pk=validated_data['user_id'])
        return Follow.objects.create(follower=follower, following=following)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email']
    
    def validate_username(self, value):
        user = self.context['request'].user

        if User.objects.filter(username=value).exclude(pk=user.pk).exists():
            raise ValidationError('Username not available')
        
        return value
    
    def validate_email(self, value):
        user = self.context['request'].user

        if User.objects.filter(email=value).exclude(pk=user.pk).exists():
            raise ValidationError('Email not available')
        
        return value

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CustomUser
        fields = ['user', 'bio', 'profile_picture']
    
    def update(self, instance, validated_data):
        request = self.context['request']
        
        user_data = validated_data.pop('user', {})
        user_serializer = UserSerializer(instance=instance.user, data=user_data, context={'request': request}, partial=True)
        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()

        instance.bio = validated_data.get('bio', instance.bio)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.save()

        return instance