from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from mainApp.models import *
from mainApp.serializers import *

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
