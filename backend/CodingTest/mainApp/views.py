from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from mainApp.models import Problem, TestCase, Code
from mainApp.serializers import ProblemSerializer, TestCaseSerializer, CodeSerializer

# Create your views here.

@csrf_exempt
def problemApi(request, id = 0):
    if request.method == 'GET':
        problem = Problem.objects.all()
        problem_serializer = ProblemSerializer(problem, many = True)
        return JsonResponse(problem_serializer.data, safe = False)
    elif request.method == 'POST':
        problem_data = JSONParser().parse(request)
        problem_serializer = ProblemSerializer(data = problem_data)
        if problem_serializer.is_valid():
            problem_serializer.save()
            return JsonResponse("Added Successfully", safe = False)
        return JsonResponse("Failed to Add", safe = False)
    elif request.method == 'PUT':
        problem_data = JSONParser().parse(request)
        problem = Problem.objects.get(ProblemId = problem_data['ProblemId'])
        problem_serializer = ProblemSerializer(problem, data = problem_data)
        if problem_serializer.is_valid():
            problem_serializer.save()
            return JsonResponse("Update Successfully", safe = False)
        return JsonResponse("Failed to Update", safe = False)
    elif request.method == 'DELETE':
        problem = Problem.objects.get(ProblemId = id)
        problem.delete()
        return JsonResponse("Deleted Successfully", safe = False)

@csrf_exempt
def testcaseApi(request, id = 0):
    if request.method == 'GET':
        testcase = TestCase.objects.all()
        testcase_serializer = TestCaseSerializer(testcase, many = True)
        return JsonResponse(testcase_serializer.data, safe = False)
    elif request.method == 'POST':
        testcase_data = JSONParser().parse(request)
        testcase_serializer = TestCaseSerializer(data = testcase_data)
        if testcase_serializer.is_valid():
            testcase_serializer.save()
            return JsonResponse("Added Successfully", safe = False)
        return JsonResponse("Failed to Add", safe = False)
    elif request.method == 'PUT':
        testcase_data = JSONParser().parse(request)
        testcase = TestCase.objects.get(TestCaseId = testcase_data['TestCaseId'])
        testcase_serializer = TestCaseSerializer(testcase, data = testcase_data)
        if testcase_serializer.is_valid():
            testcase_serializer.save()
            return JsonResponse("Update Successfully", safe = False)
        return JsonResponse("Failed to Update", safe = False)
    elif request.method == 'DELETE':
        testcase = TestCase.objects.get(TestCaseId = id)
        testcase.delete()
        return JsonResponse("Deleted Successfully", safe = False)

@csrf_exempt
def codeApi(request, id = 0):
    if request.method == 'GET':
        code = Code.objects.all()
        code_serializer = CodeSerializer(code, many = True)
        return JsonResponse(code_serializer.data, safe = False)
    elif request.method == 'POST':
        code_data = JSONParser().parse(request)
        code_serializer = CodeSerializer(data = code_data)
        if code_serializer.is_valid():
            code_serializer.save()
            return JsonResponse("Added Successfully", safe = False)
        return JsonResponse("Failed to Add", safe = False)
    elif request.method == 'PUT':
        code_data = JSONParser().parse(request)
        code = Code.objects.get(CodeId = code_data['CodeId'])
        code_serializer = CodeSerializer(code, data = code_data)
        if code_serializer.is_valid():
            code_serializer.save()
            return JsonResponse("Update Successfully", safe = False)
        return JsonResponse("Failed to Update", safe = False)
    elif request.method == 'DELETE':
        code = Code.objects.get(CodeId = id)
        code.delete()
        return JsonResponse("Deleted Successfully", safe = False)