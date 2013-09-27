#from django.contrib.auth.models import User, Group
from models import Event, Shift, ShiftType
from rest_framework import serializers


class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('title', 'description', 'start', 'shifts')


class ShiftSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Shift
        fields = ('event', 'shift_type', 'start', 'stop')


class ShiftTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ShiftType
        fields = ('title', 'description')