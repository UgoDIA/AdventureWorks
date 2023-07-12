from rest_framework import serializers
from .models import *

class DepartmentGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Dimdepartmentgroup
        fields='__all__'