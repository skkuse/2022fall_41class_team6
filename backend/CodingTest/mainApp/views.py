from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from mainApp.models import *
from mainApp.serializers import *

import json
import os,sys

# Create your views here.

@csrf_exempt
def lectureApi(request, id = 0):
    if request.method == 'GET':
        if id == 0: # 'lecture/' case
            lecture = Lecture.objects.all()
        else: # 'lecture/<id>/' case
            lecture = Lecture.objects.filter(lectureId = id)
        lecture_serializer = Lecture_Serializer(lecture, many = True)
        return JsonResponse(lecture_serializer.data, safe = False)
    elif request.method == 'POST':
        lecture_data = JSONParser().parse(request)
        lecture_serializer = Lecture_Serializer(data = lecture_data)
        if lecture_serializer.is_valid():
            lecture_serializer.save()
            return JsonResponse("Added Successfully", safe = False)
        return JsonResponse("Failed to Add", safe = False)
    elif request.method == 'PUT':
        lecture_data = JSONParser().parse(request)
        lecture = Lecture.objects.get(lectureId = lecture_data['lectureId'])
        lecture_serializer = Lecture_Serializer(lecture, data = lecture_data)
        if lecture_serializer.is_valid():
            lecture_serializer.save()
            return JsonResponse("Update Successfully", safe = False)
        return JsonResponse("Failed to Update", safe = False)
    elif request.method == 'DELETE':
        lecture = Lecture.objects.get(lectureId = id)
        lecture.delete()
        return JsonResponse("Deleted Successfully", safe = False)

def questionApi(request, id = 0):
    if request.method == 'GET':
        if id == 0: # 'question/' case
            question = Question.objects.all()
        else: # 'question/<id>/' case
            question = Question.objects.filter(questionId = id)
        question_serializer = Question_Serializer(question, many = True)
        return JsonResponse(question_serializer.data, safe = False)
    elif request.method == 'POST':
        question_data = JSONParser().parse(request)
        question_serializer = Question_Serializer(data = question_data)
        if question_serializer.is_valid():
            question_serializer.save()
            return JsonResponse("Added Successfully", safe = False)
        return JsonResponse("Failed to Add", safe = False)
    elif request.method == 'PUT':
        question_data = JSONParser().parse(request)
        question = Question.objects.get(questionId = question_data['questionId'])
        question_serializer = Question_Serializer(question, data = question_data)
        if question_serializer.is_valid():
            question_serializer.save()
            return JsonResponse("Update Successfully", safe = False)
        return JsonResponse("Failed to Update", safe = False)
    elif request.method == 'DELETE':
        question = Question.objects.get(questionId = id)
        question.delete()
        return JsonResponse("Deleted Successfully", safe = False)

def testcaseApi(request, question_id = 0, id=0):
    if request.method == 'GET':
        if question_id == 0: # 'testcase/' case
            testcase = Testcase.objects.all()
        elif id == 0: # 'testcase/<question_id>/' case
            testcase = Testcase.objects.filter(questionId = question_id)
        else: # 'testcase/<question_id>/<id>/' case
            testcase = Testcase.objects.filter(questionId = question_id, testcaesId = id)
        testcase_serializer = Testcase_Serializer(testcase, many = True)
        return JsonResponse(testcase_serializer.data, safe = False)
    elif request.method == 'POST':
        testcase_data = JSONParser().parse(request)
        testcase_serializer = Testcase_Serializer(data = testcase_data)
        if testcase_serializer.is_valid():
            testcase_serializer.save()
            return JsonResponse("Testcase is Successfully Added", safe = False)
        return JsonResponse("Fail to Add Testcase", safe = False)
    elif request.method == 'PUT':
        testcase_data = JSONParser().parse(request)
        testcase = Testcase.objects.get(testcaseId = testcase_data['testcaseId'])
        testcase_serializer = Testcase_Serializer(testcase, data = testcase_data)
        if testcase_serializer.is_valid():
            testcase_serializer.save()
            return JsonResponse("Testcase is Successfully Updated", safe = False)
        return JsonResponse("Fail to Update Testcase", safe = False)
    elif request.method == 'DELETE':
        testcase = Testcase.objects.get(testcaseId = id)
        testcase.delete()
        return JsonResponse("Testcase is Successfully Deleted", safe = False)

def code_savedApi(request, question_id = 0, id=0):
    if request.method == 'GET':
        if question_id == 0: # 'code_saved/' case
            code_saved = Code_Saved.objects.all()
        elif id == 0: # 'code_saved/<question_id>/' case
            code_saved = Code_Saved.objects.filter(questionId = question_id)
        else: # 'code_saved/<question_id>/<id>/' case
            code_saved = Code_Saved.objects.filter(questionId = question_id, code_savedId = id)
        code_saved_serializer = Code_Saved_Serializer(code_saved, many = True)
        return JsonResponse(code_saved_serializer.data, safe = False)
    elif request.method == 'POST':
        code_saved_data = JSONParser().parse(request)
        code_saved_serializer = Code_Saved_Serializer(data = code_saved_data)
        if code_saved_serializer.is_valid():
            code_saved_serializer.save()
            return JsonResponse("Saved Code is Successfully Added", safe = False)
        return JsonResponse("Fail to Add Saved Code", safe = False)
    elif request.method == 'PUT':
        code_saved_data = JSONParser().parse(request)
        code_saved = Code_Saved.objects.get(code_savedId = code_saved_data['code_savedId'], questionId = code_saved_data['questionId'])
        code_saved_serializer = Code_Saved_Serializer(code_saved, data = code_saved_data)
        if code_saved_serializer.is_valid():
            code_saved_serializer.save()
            return JsonResponse("Saved Code is Successfully Updated", safe = False)
        return JsonResponse("Fail to Update Saved Code", safe = False)
    elif request.method == 'DELETE':
        code_saved = Code_Saved.objects.get(questionId = question_id, code_savedId = id)
        code_saved.delete()
        return JsonResponse("Saved COde is Succesfully Deleted", safe = False)

def code_submittedApi(request, question_id = 0, id=0):
    if request.method == 'GET':
        if question_id == 0: # 'code_submitted/' case
            code_submitted = Code_Submitted.objects.all()
        elif id == 0: # 'code_submitted/<question id>/' case
            code_submitted = Code_Submitted.objects.filter(questionId = question_id)
        else: # 'code_submitted/<question id>/' case
            code_submitted = Code_Submitted.objects.filter(questionId = question_id, code_submittedId = id)
        code_submitted_serializer = Code_Submitted_Serializer(code_submitted, many = True)
        return JsonResponse(code_submitted_serializer.data, safe = False)
    elif request.method == 'POST':
        code_submitted_data = JSONParser().parse(request)
        code_submitted_serializer = Code_Submitted_Serializer(data = code_submitted_data)
        if code_submitted_serializer.is_valid():
            code_submitted_serializer.save()
            return JsonResponse("Submitted Code is Successfully Added", safe = False)
        return JsonResponse("Fail to Add", safe = False)
    elif request.method == 'PUT':
        code_submitted_data = JSONParser().parse(request)
        code_submitted = Code_Submitted.objects.get(code_submittedId = code_submitted_data['code_submittedId'], questionId = code_submitted_data['questionId'])
        code_submitted_serializer = Code_Submitted_Serializer(code_submitted, data = code_submitted_data)
        if code_submitted_serializer.is_valid():
            code_submitted_serializer.save()
            return JsonResponse("Submitted Code is Update Successfully", safe = False)
        return JsonResponse("Fail to Update", safe = False)
    elif request.method == 'DELETE':
        code_submitted = Question.objects.get(questionId = question_id, code_submittedId = id)
        code_submitted.delete()
        return JsonResponse("Deleted Successfully", safe = False)
 
def codeEfficiencyApi(request, question_id = 0, id=0):
    if request.method == 'GET':
        code_submitted = Code_Submitted.objects.filter(questionId = question_id, code_submittedId = id)
        code_submitted_codeonly_serializer = Code_Submitted_Codeonly_Serializer(code_submitted, many = True)
        rawcode = code_submitted_codeonly_serializer.data[0]["code"]

        # export code to temp/rawcode.py
        testfile = open('./temp/rawcode.py', 'w')
        testfile.write(rawcode)
        testfile.close()

        # do multimetric and save as temp/multiout.json
        terminal_command = "multimetric temp/rawcode.py | tee temp/multiout.json"
        os.system(terminal_command)
        
        #######################################################
        # calculating efficiency algorithm should be improved #
        #######################################################
        # open temp/multiout.json and get cyclomatic complexity
        multiout = open ("./temp/multiout.json", "r")
        outjson = json.load(multiout)
        multiout.close()
        cycomp = outjson['overall']['cyclomatic_complexity']

        # calculate efficiency from cyclomatic complexity
        if(cycomp <= 50):
            efficiency = 100 - cycomp * 2
        else:
            efficiency = 0

        return JsonResponse(efficiency, safe = False)
    return JsonResponse("only GET method is available", safe = False)
