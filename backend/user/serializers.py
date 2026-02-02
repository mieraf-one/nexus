from rest_framework import serializers
from . import models
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class FollowSerializer(serializers.Serializer):
    user_id = serializers.CharField(write_only=True)

    def validate_user_id(self, value):
        user = get_object_or_404(CustomUser, pk=value)

        if self.context['request'].user == user:
            raise ValidationError("You cannot follow yourself.")

        if models.Follow.objects.filter(
            follower = self.context['request'].user,
            following = user
        ).exists():
            raise ValidationError("Already following.")
        
        return value
    
    def create(self, validated_data):
        follower = self.context['request'].user
        following = get_object_or_404(CustomUser, pk=validated_data['user_id'])
        
        follow_user = models.Follow.objects.create(follower=follower, following=following)

        # send a notification
        models.Notification.objects.create(
            sender=follower,
            receiver=following,
            description=f' started following you.'
        )

        return follow_user

class UnFollowSerializer(serializers.Serializer):
    user_id = serializers.CharField(write_only=True)

    def validate_user_id(self, value):
        user = get_object_or_404(CustomUser, pk=value)

        if self.context['request'].user == user:
            raise ValidationError("You cannot unfollow yourself.")

        if not models.Follow.objects.filter(
            follower = self.context['request'].user,
            following = user
        ).exists():
            raise ValidationError("You already not following.")
        
        return value
    
    def create(self, validated_data):
        follower = self.context['request'].user
        following = get_object_or_404(CustomUser, pk=validated_data['user_id'])
        followed_user = models.Follow.objects.get(follower=follower, following=following)
        followed_user.delete()

        return {'success': f'You unfollowed {following.username}'}

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Like
        fields = ['id', 'post', 'liker']
        extra_kwargs = {'post': {'read_only': True}, 'liker': {'read_only': True}}
    
    def create(self, validated_data):
        post = validated_data['post']
        liker = validated_data['liker']

        is_liked_before = models.Like.objects.filter(post=post, liker=liker).first()

        if is_liked_before:
            is_liked_before.delete()
            return is_liked_before
        
        return models.Like.objects.create(
            post=post,
            liker=liker
        )

class FollowSuggestionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField()
    username = serializers.CharField()
    is_following = serializers.SerializerMethodField()
    profile_picture = serializers.URLField()


    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'username', 'is_following', 'profile_picture']


    def get_is_following(self, obj):
        follower = self.context['request'].user
        
        return models.Follow.objects.filter(
            follower=follower,
            following=obj
        ).exists()

class CommentSerializer(serializers.ModelSerializer):
    author = FollowSuggestionSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = ['id', 'post', 'author', 'content', 'created_at']
        extra_kwargs = {'post': {'read_only': True}, 'author': {'read_only': True}}

class PostSerializer(serializers.ModelSerializer):
    author = FollowSuggestionSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = models.Post
        fields = ['id', 'author', 'photo', 'caption', 'edited_at', 'likes_count', 'is_liked', 'comments', 'comments_count']

    def get_likes_count(self, obj):
        return len(obj.likes.all())

    def get_is_liked(self, obj):
        user = self.context['request'].user
        return obj.likes.filter(liker=user).exists()
    
    def get_comments_count(self, obj):
        return len(obj.comments.all())

class UserSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()
    posts = PostSerializer(many=True, read_only=True)
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'bio', 'following', 'follower', 'profile_picture', 'posts', 'is_owner', 'is_following']
    
    def get_is_owner(self, obj):
        owner = self.context['request'].user
        return owner == obj
    
    def get_is_following(self, obj):
        following = self.context['request'].user
        follower = obj

        if follower == following: return None

        return models.Follow.objects.filter(
            follower=follower,
            following=following
        ).exists()

class NotificationSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(
        slug_field = 'username',
        read_only = True
    )

    receiver = serializers.SlugRelatedField(
        slug_field = 'username',
        read_only = True
    )

    class Meta: 
        model = models.Notification
        fields = ['id', 'sender', 'receiver', 'description', 'created_at']
        extra_fields = {'created_at': {'read_only': True}}

class FollowersSerializer(serializers.ModelSerializer):
    follower = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['follower']
    
    def get_follower(self, obj):
        request = self.context['request']
        followers_user_obj = [user.follower for user in obj.follower.all()]

        followers = FollowSuggestionSerializer(followers_user_obj, many=True, context={'request': request})

        return followers.data

class FollowingSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['following']
    
    def get_following(self, obj):
        request = self.context['request']
        following_user_obj = [user.following for user in obj.following.all()]

        following = FollowSuggestionSerializer(following_user_obj, many=True, context={'request': request})

        return following.data
