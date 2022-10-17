from django.db import models

# Create your models here.

class Lecture(models.Model):
    lectureId = models.IntegerField(primary_key = True)
    lectureName = models.TextField(default='')

class Question(models.Model):
    questionId = models.IntegerField(primary_key = True)
    lectureId = models.ForeignKey(Lecture, on_delete = models.CASCADE)

class Testcase(models.Model):
    testcasId = models.IntegerField(primary_key = True)
    questionId = models.ForeignKey(Question, on_delete = models.CASCADE)

class Code_Saved(models.Model):
    code_savedId = models.IntegerField(primary_key = True)
    questionId = models.ForeignKey(Question, on_delete = models.CASCADE)

class Code_Submitted(models.Model): 
    code_submittedId = models.IntegerField(primary_key = True)
    questionId = models.ForeignKey(Question, on_delete = models.CASCADE)
