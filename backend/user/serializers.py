from rest_framework import serializers
from .models import CustomUser, Follow
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError


class FollowSerializer(serializers.Serializer):
    user_id = serializers.CharField(write_only=True)

    def validate_user_id(self, value):
        user = get_object_or_404(CustomUser, pk=value)

        if self.context['request'].user.custom_user.id == value:
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