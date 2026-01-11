from rest_framework import serializers
from .models import CustomUser, Follow, Notification
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
        
        follow_user = Follow.objects.create(follower=follower, following=following)

        # send a notification
        Notification.objects.create(
            sender=follower,
            receiver=following,
            description=f' started following you.'
        )

        return follow_user


class UnFollowSerializer(serializers.Serializer):
    user_id = serializers.CharField(write_only=True)

    def validate_user_id(self, value):
        user = get_object_or_404(CustomUser, pk=value)

        if self.context['request'].user.custom_user == user:
            raise ValidationError("You cannot unfollow yourself.")

        if not Follow.objects.filter(
            follower = self.context['request'].user.custom_user,
            following = user
        ).exists():
            raise ValidationError("You already not following.")
        
        return value
    
    def create(self, validated_data):
        follower = self.context['request'].user.custom_user
        following = get_object_or_404(CustomUser, pk=validated_data['user_id'])
        followed_user = Follow.objects.get(follower=follower, following=following)
        followed_user.delete()

        return {'success': f'You unfollowed {following.user.username}'}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email']
    
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
    follower = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['user', 'bio', 'following', 'follower', 'profile_picture']
    
    def get_follower(self, obj):
        follows = obj.follower.all()
        return UserSerializer([f.follower.user for f in follows], many=True).data
    
    def get_following(self, obj):
        followers = obj.following.all()
        return UserSerializer([f.following.user for f in followers], many=True).data

    def get_profile_picture(self, obj):
        if not obj.profile_picture:
            return 'https://res.cloudinary.com/dld9ikquj/image/upload/v1768036307/default_profile_pic_modb9y.svg'
        
        return obj.profile_picture.url

    def update(self, instance, validated_data):
        request = self.context['request']

        user_data = validated_data.pop('user', {})
        user_serializer = UserSerializer(instance=instance.user, data=user_data, context={'request': request}, partial=True)
        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()

        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()

        return instance


class FollowSuggestionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField()
    username = serializers.CharField()
    is_following = serializers.SerializerMethodField()
    profile_picture = serializers.SerializerMethodField()

    def get_profile_picture(self, obj):
        user_picture = obj.custom_user.profile_picture

        if user_picture:
            return user_picture.url
        
        return 'https://res.cloudinary.com/dld9ikquj/image/upload/v1768036307/default_profile_pic_modb9y.svg'


    def get_is_following(self, obj):
        follower = self.context['request'].user.custom_user
        print(f'follow suggestion: {follower}')
        
        return Follow.objects.filter(
            follower=follower,
            following=obj.custom_user
        ).exists()

class NotificationSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(
        slug_field = 'user__username',
        read_only = True
    )

    receiver = serializers.SlugRelatedField(
        slug_field = 'user__username',
        read_only = True
    )

    class Meta: 
        model = Notification
        fields = ['id', 'sender', 'receiver', 'description', 'created_at']
        extra_fields = {'created_at': {'read_only': True}}
