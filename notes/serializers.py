from rest_framework import serializers

from .models import *


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ("id", "name", "category", "nameCat", "date", "text")


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ("id", "name", "link")


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ("id", "text", "legid", "type")


class LegendSerializer(serializers.ModelSerializer):

    class Meta:
        model = Legends
        fields = ("id", "name", "link", "text")