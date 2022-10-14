from rest_framework import serializers
from mainApp.models import Problem, TestCase, Code

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ('ProblemId', 'LectureName', 'ProblemName', 'DeadLine', 'ProblemExplanation', 'Requirements', 'TestCaseId', 'RelatedResources')

class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = ('TestCaseId', 'CaseInput' ,'CaseOutput')

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = ('CodeId', 'CodeInput')