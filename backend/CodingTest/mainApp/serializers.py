from rest_framework import serializers
from mainApp.models import *

class Lecture_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ('lectureId', 'lectureName')

class Question_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('questionId', 'lectureId', 'skeletonCode', 'questionName', 'deadline', 'problemExplain', 'requirements', 'answerCode', 'relatedResource', 'submissionCount')

class Testcase_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Testcase
        fields = ('testcaseId', 'questionId', 'input', 'output', 'isHidden')

class Code_Saved_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Code_Saved
        fields = ('code_savedId', 'questionId', 'code')

class Code_Submitted_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Code_Submitted
        fields = ('code_submittedId', 'questionId','sub_date', 'code')
