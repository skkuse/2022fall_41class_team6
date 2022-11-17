from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.

class Lecture(models.Model):
    lectureId = models.IntegerField(primary_key = True)
    lectureName = models.TextField(default='')

class Question(models.Model):
    questionId = models.IntegerField(primary_key = True)
    lectureId = models.ForeignKey(Lecture, on_delete = models.CASCADE)
    skeletonCode = models.TextField(default = '')
    questionName = models.CharField(max_length = 500, default = '')
    deadline = models.DateField(null = True)
    problemExplain = models.TextField(default = '')
    requirements = models.TextField(default = '')
    answerCode = models.TextField(default = '')
    relatedResource = models.TextField(default = '')
    submissionCount = models.IntegerField(default = 0)


class Testcase(models.Model):
    testcaseId = models.IntegerField(primary_key = True)
    questionId = models.ForeignKey(Question, on_delete = models.CASCADE)
    input = models.TextField(default = '')
    output = models.TextField(default = '')
    isHidden = models.BooleanField(default = False)

class Code_Saved(models.Model):
    code_savedId = models.IntegerField(primary_key = True)
    questionId = models.ForeignKey(Question, on_delete = models.CASCADE)
    code = models.TextField(default = '')

class Code_Submitted(models.Model): 
    code_submittedId = models.IntegerField(primary_key = True)
    questionId = models.ForeignKey(Question, on_delete = models.CASCADE)
    sub_date = models.DateField(null = True)
    code = models.TextField(default = '')
