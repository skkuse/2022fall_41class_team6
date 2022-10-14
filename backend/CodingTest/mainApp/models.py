from django.db import models

# Create your models here.

class Problem(models.Model):
    ProblemId = models.AutoField(primary_key = True)
    LectureName = models.CharField(max_length = 500)
    ProblemName = models.CharField(max_length = 500)
    DeadLine = models.DateField()
    ProblemExplanation = models.TextField()
    Requirements = models.TextField()
    TestCaseId = models.IntegerField()
    RelatedResources = models.TextField()

class TestCase(models.Model):
    TestCaseId = models.AutoField(primary_key = True)
    CaseInput = models.CharField(max_length = 500)
    CaseOutput = models.CharField(max_length = 500)

class Code(models.Model):
    CodeId = models.AutoField(primary_key = True)
    CodeInput = models.TextField()