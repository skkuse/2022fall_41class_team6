from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.utils import timezone

from mainApp.models import *
from mainApp.serializers import *

from urllib.parse import quote_plus, unquote_plus
import urllib.request as req
from bs4 import BeautifulSoup
from selenium import webdriver

import json
import os,sys
import copydetect
import decimal
import openai
import traceback


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

@csrf_exempt
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

@csrf_exempt
def testcaseApi(request, question_id = 0, id=0):
    if request.method == 'GET':
        if question_id == 0: # 'testcase/' case
            testcase = Testcase.objects.all()
        elif id == 0: # 'testcase/<question_id>/' case
            testcase = Testcase.objects.filter(questionId = question_id)
        else: # 'testcase/<question_id>/<id>/' case
            testcase = Testcase.objects.filter(questionId = question_id, testcaseId = id)
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
@csrf_exempt
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
        outjson = {
                # 0: no error
                # 1: error
                "error" : 1,
                "code_savedId" : 0,
                "errormsg" : "undefined error"
                }

        # get code from POST request
        code_saved_data = JSONParser().parse(request)

        # if there are no code in Json input, raise error
        try:
            code_saved_data["code"]
        except:
            outjson["errormsg"] = "no code in json"
            return JsonResponse(outjson)

        # set data
        code_saved_data["questionId"] = question_id
        
        # get valid id
        validid = Code_Saved.objects.order_by("code_savedId").last().code_savedId + 1
        code_saved_data["code_savedId"] = validid

        # serialize
        code_saved_serializer = Code_Saved_Serializer(data = code_saved_data)

        # if serializer is valid add to db
        if code_saved_serializer.is_valid():
            outjson["error"] = 0
            outjson["code_savedId"] = validid
            outjson["errormsg"] = ""
            code_saved_serializer.save()
            return JsonResponse(outjson)

        # if serializer is not valid return error
        else:
            outjson["errormsg"] = "invalid data"
            return JsonResponse(outjson)

        # undefined error case
        return JsonResponse(outjson)

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
        return JsonResponse("Saved Code is Succesfully Deleted", safe = False)

@csrf_exempt
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
        outjson = {
                # 0: no error
                # 1: submit count exceed
                # 2: other errors
                "error" : 2,
                "code_submittedId" : 0,
                "errormsg" : "undefined error"
                }

        # get code from POST request
        code_submitted_data = JSONParser().parse(request)

        # if there are no code in Json input, raise error
        try:
            code_submitted_data["code"]
        except:
            outjson["errormsg"] = "no code in json"
            return JsonResponse(outjson)

        # set data
        code_submitted_data["questionId"] = question_id
        code_submitted_data["sub_date"] = timezone.localdate()
        
        # check submit count
        code_submitted_this_question = Code_Submitted.objects.filter(questionId = question_id)
        submit_count = len(code_submitted_this_question)

        # submit count left
        if submit_count < 3:
            # get valid id
            validid = Code_Submitted.objects.order_by("code_submittedId").last().code_submittedId + 1
            code_submitted_data["code_submittedId"] = validid

            # serialize
            code_submitted_serializer = Code_Submitted_Serializer(data = code_submitted_data)
            # if serializer is valid add to db
            if code_submitted_serializer.is_valid():
                outjson["error"] = 0
                outjson["code_submittedId"] = validid
                outjson["errormsg"] = ""
                code_submitted_serializer.save()
                return JsonResponse(outjson)

            # if serializer is not valid return error
            else:
                outjson["errormsg"] = "invalid data"
                return JsonResponse(outjson)

        # submit count >= 3 case
        else:
            outjson["error"] = 1
            outjson["errormsg"] = "submit count exceeded"
            return JsonResponse(outjson)

        # undefined error case
        return JsonResponse(outjson)

    elif request.method == 'PUT':
        return JsonResponse("PUT method not available", safe = False)

    elif request.method == 'DELETE':
        code_submitted = Code_Submitted.objects.get(questionId = question_id, code_submittedId = id)
        code_submitted.delete()
        return JsonResponse("Deleted Successfully", safe = False)

@csrf_exempt 
def codeEfficiencyApi(request, question_id = 0, id=0):
    if request.method == 'GET':
        question = Question.objects.filter(questionId = question_id)
        question_answercodeonly_serializer = Question_AnswerCodeonly_Serializer(question, many = True)
        code_submitted = Code_Submitted.objects.filter(questionId = question_id, code_submittedId = id)
        code_submitted_codeonly_serializer = Code_Submitted_Codeonly_Serializer(code_submitted, many = True)
        
        rawcode = code_submitted_codeonly_serializer.data[0]["code"]
        answercode = question_answercodeonly_serializer.data[0]["answerCode"]

        # export code to temp/tempcode.py
        tempfile = open('./temp/tempcode.py', 'w')
        tempfile.write(rawcode)
        tempfile.close()

        # export answercode to temp/answercode.py
        tempfile = open('./temp/answercode.py', 'w')
        tempfile.write(answercode)
        tempfile.close()

        # do multimetric for submitted code and save as ./temp/efficiency.json
        terminal_command = "multimetric ./temp/tempcode.py > ./temp/efficiency.json"
        os.system(terminal_command)

        # do multimetric for answer code and save as ./temp/answereff.json
        terminal_command = "multimetric ./temp/answercode.py > ./temp/answereff.json"
        os.system(terminal_command)

        # get data from files
        eff_file = open ("./temp/efficiency.json", "r")
        outjson = json.load(eff_file)
        eff_file.close()
        anseff_file = open("./temp/answereff.json", "r")
        ansoutjson = json.load(anseff_file)
        anseff_file.close()
     
        cycomp = outjson['overall']['cyclomatic_complexity']
        anscycomp = ansoutjson['overall']['cyclomatic_complexity']
        loc = outjson['overall']['loc']
        ansloc = ansoutjson['overall']['loc']
        diff = outjson['overall']['halstead_difficulty']
        ansdiff = ansoutjson['overall']['halstead_difficulty']
        ###
        datacomp = 10
        ansdatacomp = 10
        ###

        # grade from the number of lines of code
        if ( loc < ansloc ):
            locscore = 25
        elif ( loc == ansloc ):
            locscore = 24
        else: 
            locscore = 24
            locdiff = loc - ansloc
            while ( locscore > 0 and locdiff > 0):
                locscore -= 1
                # 1 point reduce per 10% longer code
                locdiff -= decimal.Decimal('0.1')  * ansloc
        
        # grade from halstead_difficulty
        if ( diff < ansdiff ):
            diffscore = 25
        elif ( diff == ansdiff ):
            diffscore = 24
        else: 
            diffscore = 24
            diffdiff = diff - ansdiff
            while ( diffscore > 0 and diffdiff > 0):
                diffscore -= 1
                # 1 point reduce per 10% more halstead_difficulty
                diffdiff -= 0.1 * ansdiff

        
        # make python file to fit in memory_profiler
        # save as ./temp/datatemp.py
        dataf = open("./temp/datatemp.py", 'w')
        dataf.write("@profile\n")
        dataf.write(rawcode)
        dataf.write("\nsolution()\n")
        dataf.close()
        # repeat with answer code
        dataf = open("./temp/datatemp_ans.py", 'w')
        dataf.write("@profile\n")
        dataf.write(answercode)
        dataf.write("\nsolution()\n")
        dataf.close()
        
        # read first testcase and make input file to test data complexity
        testcase = Testcase.objects.filter(questionId = question_id)[0]
        testcase_serializer = Testcase_Serializer(testcase)
        inputdata = testcase_serializer.data["input"]
        with open("./temp/testinput.txt", "w") as tifile:
            tifile.write(inputdata)

        # run file with memory profiler and give testcase input
        # then log as ./temp/dataout.txt
        tc = "python3 -m memory_profiler ./temp/datatemp.py < ./temp/testinput.txt > ./temp/dataout.txt"
        os.system(tc)
        # repeat with answer code
        tc = "python3 -m memory_profiler ./temp/datatemp_ans.py < ./temp/testinput.txt > ./temp/dataout_ans.txt"
        os.system(tc)

        # parse logfile and pick maximum memory usage
        with open("./temp/dataout.txt", "r") as logfile:
            nextline = logfile.readline()
            memmax = 0
            while ( nextline != '' ):
                linesplit = nextline.split()
                for i in range(len(linesplit)):
                    if(linesplit[i] == 'MiB'):
                        memmax = max(memmax, float(linesplit[i-1]))
                        break
                nextline = logfile.readline()
        # repeat with answer code's log file
        with open("./temp/dataout_ans.txt", "r") as logfile:
            nextline = logfile.readline()
            memmax_ans = 0
            while ( nextline != '' ):
                linesplit = nextline.split()
                for i in range(len(linesplit)):
                    if(linesplit[i] == 'MiB'):
                        memmax_ans = max(memmax_ans, float(linesplit[i-1]))
                        break
                nextline = logfile.readline()
        
        # grade from dataflow complexity
        if ( memmax < memmax_ans ):
            datacompscore = 25
        elif ( memmax == memmax_ans ):
            datacompscore = 24
        else: 
            datacompscore = 24
            memmax_copy = memmax
            while ( memmax_copy > memmax_ans and datacompscore > 0):
                datacompscore -= 1
                # 1 point reduce per 2x more memory usage
                memmax_copy /= 2

        # grade from cyclomatic complexity
        if ( cycomp < anscycomp ):
            cycompscore = 25
        elif ( cycomp == anscycomp ):
            cycompscore = 24
        else: 
            cycompscore = 24
            cycompdiff = cycomp - anscycomp
            while ( cycompscore > 0 and cycompdiff > 0):
                cycompscore -= 1
                # 1 point reduce per 0.5 more cyclomatic complexity
                cycompdiff -= 0.5
        
        # make dictionary for output
        outscore = {
            "line_of_codes" : [locscore, ansloc, loc],
            "halstead_difficulty" : [diffscore, ansdiff, diff],
            "dataflow_complexity" : [datacompscore, memmax_ans, memmax],
            "controlflow_complexity" : [cycompscore, anscycomp, cycomp]
        }

        return JsonResponse(outscore)
    return JsonResponse("only GET method is available", safe = False)

@csrf_exempt
def codePlagiarismApi(request, question_id = 0, id=0):
    if request.method == 'GET':
        code_submitted = Code_Submitted.objects.filter(questionId = question_id, code_submittedId = id)
        code_submitted_codeonly_serializer = Code_Submitted_Codeonly_Serializer(code_submitted, many = True)
        testcode = code_submitted_codeonly_serializer.data[0]["code"]

        question = Question.objects.filter(questionId = question_id)
        question_answercodeonly_serializer = Question_AnswerCodeonly_Serializer(question, many = True)
        answercode = question_answercodeonly_serializer.data[0]["answerCode"]

        # export code to temp/testcode.py
        testfile = open('./temp/testcode.py', 'w')
        testfile.write(testcode)
        testfile.close()

        # export answercode to temp/answercode.py
        testfile = open('./temp/answercode.py', 'w')
        testfile.write(answercode)
        testfile.close()
        
        #######################################################
        fp1 = copydetect.CodeFingerprint('./temp/testcode.py', 25, 1)
        fp2 = copydetect.CodeFingerprint('./temp/answercode.py', 25, 1)
        _, similarities, _ = copydetect.compare_files(fp1, fp2)

        plagiarism = 100 * similarities[0]        

        return JsonResponse(plagiarism, safe = False)
    return JsonResponse("only GET method is available", safe = False)

@csrf_exempt
def codeVisibilityApi(request, question_id, id):
    if request.method == 'GET':
        question = Question.objects.filter(questionId = question_id)
        code_submitted = Code_Submitted.objects.filter(questionId = question_id, code_submittedId = id)
        code_submitted_codeonly_serializer = Code_Submitted_Codeonly_Serializer(code_submitted, many = True)

        rawcode = code_submitted_codeonly_serializer.data[0]["code"]

        # export code to temp/tempcode.py
        tempfile = open('./temp/tempcode.py', 'w')
        tempfile.write(rawcode)
        tempfile.close()

        # do pylama for submitted code and save output as pylamaReport#.json
        terminal_command = "pylama ./temp/tempcode.py -l \"mypy\" --format json --report ./temp/pylamaReport_mypy.json"
        os.system(terminal_command)
        terminal_command = "pylama ./temp/tempcode.py -l \"pylint\" --format json --report ./temp/pylamaReport_pylint.json"
        os.system(terminal_command)
        terminal_command = "pylama ./temp/tempcode.py -l \"eradicate\" --format json --report ./temp/pylamaReport_eradicate.json"
        os.system(terminal_command)
        terminal_command = "pylama ./temp/tempcode.py -l \"radon\" --format json --report ./temp/pylamaReport_radon.json"
        os.system(terminal_command)
        terminal_command = "pylama ./temp/tempcode.py -l \"pycodestyle\" --format json --report ./temp/pylamaReport_pycodestyle.json"
        os.system(terminal_command)

        # get json from pylamaReport.json
        pylamaJsonfile = open ("./temp/pylamaReport_mypy.json", "r")
        pylamaJson_mypy = json.load(pylamaJsonfile)
        pylamaJsonfile.close()
        score1 = max(0, 20 - len(pylamaJson_mypy))

        pylamaJsonfile = open ("./temp/pylamaReport_pylint.json", "r")
        pylamaJson_pylint = json.load(pylamaJsonfile)
        pylamaJsonfile.close()
        score2 = max(0, 20 - len(pylamaJson_pylint))

        pylamaJsonfile = open ("./temp/pylamaReport_eradicate.json", "r")
        pylamaJson_eradicate = json.load(pylamaJsonfile)
        pylamaJsonfile.close()
        score3 = max(0, 20 - len(pylamaJson_eradicate))

        pylamaJsonfile = open ("./temp/pylamaReport_radon.json", "r")
        pylamaJson_radon = json.load(pylamaJsonfile)
        pylamaJsonfile.close()
        score4 = max(0, 20 - len(pylamaJson_radon))

        pylamaJsonfile = open ("./temp/pylamaReport_pycodestyle.json", "r")
        pylamaJson_pycodestyle = json.load(pylamaJsonfile)
        pylamaJsonfile.close()
        score5 = max(0, 20 - len(pylamaJson_pycodestyle))

        # make dictionary for output
        outscore = {
            "mypy" : [score1],
            "pylint" : [score2],
            "eradicate" : [score3],
            "radon" : [score4],
            "pycodestyle" : [score5]
        }

        # add minus score factors
        for _dict in pylamaJson_mypy:
            outscore["mypy"].append(_dict["message"])

        for _dict in pylamaJson_pylint:
            outscore["pylint"].append(_dict["message"])

        for _dict in pylamaJson_eradicate:
            outscore["eradicate"].append(_dict["message"])
        
        for _dict in pylamaJson_radon:
            outscore["radon"].append(_dict["message"])
        
        for _dict in pylamaJson_pycodestyle:
            outscore["pycodestyle"].append(_dict["message"])

        return JsonResponse(outscore)
    return JsonResponse("only GET method is available", safe = False)

@csrf_exempt
def codeExplainApi(request, question_id = 0, id=0):
    if request.method == 'GET':
        code_submitted = Code_Submitted.objects.filter(questionId = question_id, code_submittedId = id)
        code_submitted_codeonly_serializer = Code_Submitted_Codeonly_Serializer(code_submitted, many = True)
        rawcode = code_submitted_codeonly_serializer.data[0]["code"]
        
        My_OpenAI_key = "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"
        openai.api_key = My_OpenAI_key

        # set openapi model
        response = openai.Completion.create(
            model="text-davinci-002",
            prompt= rawcode + "\"\"\"\nHere's what the above class is doing:\n1.",
            temperature=0.2,
            max_tokens=64,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            stop=["\"\"\""]
        )
        result = "Written code is doing the following.\n1. " + response.choices[0].text.strip()
        return JsonResponse(result, safe= False)
    else:
        return JsonResponse("only GET method is available!", safe= False)

@csrf_exempt
def unittestApi(request, testcase_id = 0, id = 0):
    if request.method == 'GET':
        code_submitted = Code_Submitted.objects.filter(code_submittedId = id)
        code_submitted_codeonly_serializer = Code_Submitted_Codeonly_Serializer(code_submitted, many = True)
        testcode = code_submitted_codeonly_serializer.data[0]["code"]

        testcase = Testcase.objects.filter(testcaseId = testcase_id)
        testcase_serializer = Testcase_Serializer(testcase, many = True)
        input = testcase_serializer.data[0]["input"].replace('\r', '')
        output = testcase_serializer.data[0]["output"].replace('\r', '')

        # export code to temp/testcode.py
        testfile = open('temp/testcode.py', 'w')
        testfile.write(testcode)
        testfile.close()

        # export code to temp/input.txt
        testfile = open('temp/input.txt', 'w')
        testfile.write(input)
        testfile.close()

        # export code to temp/output.txt
        testfile = open('temp/output.txt', 'w')
        testfile.write(output)
        testfile.close()

        # do unittest and save as temp/unittestresult.txt
        terminal_command = "python3 -m unittest mainApp/myunittest.py 2> temp/unittestresult.txt"
        os.system(terminal_command)

        # correct "." wrong "F" error "E"
        testfile = open('temp/unittestresult.txt', 'r')
        return JsonResponse(testfile.read()[0], safe = False)
    return JsonResponse("only GET method is available", safe = False)

@csrf_exempt
def unittestApi2(request, testcase_id = 0):
    # make dictionary for output
    outdict = {
            "pass" : "",
            "testinput" : "",
            "testoutput" : "",
            "youroutput" : ""
            }

    # if the method is not POST, return error message
    if request.method != 'POST':
        errmsg = "only POST method is available!"
        for i in outdict:
            outdict[i] = errmsg
        return JsonResponse(outdict)

    # get user's code from request. 
    submit_data = JSONParser().parse(request)
    testcode = submit_data["code"]

    # get testcase input, output
    testcase = Testcase.objects.filter(testcaseId = testcase_id)
    testcase_serializer = Testcase_Serializer(testcase, many = True)
    tinput = testcase_serializer.data[0]["input"].replace('\r', '')
    output = testcase_serializer.data[0]["output"].replace('\r', '')

    # export code to temp/testcode.py
    testfile = open('./temp/testcode.py', 'w')
    testfile.write(testcode)
    testfile.write("\nprint(solution(), end='')")
    testfile.close()

    # export code to temp/input.txt
    testfile = open('./temp/input.txt', 'w')
    testfile.write(tinput)
    testfile.close()

    # export code to temp/output.txt
    testfile = open('./temp/output.txt', 'w')
    testfile.write(output)
    testfile.close()

    # make answer tuple from output.txt
    file = open('./temp/output.txt', 'r')
    right_ans = file.read().split('\n')
    if len(right_ans) == 1:
        right_ans = int(right_ans[0])
    else:
        right_ans = tuple(map(int, right_ans))
    file.close()
    right_ans = str(right_ans)

    # get user output
    command = "python3 ./temp/testcode.py < ./temp/input.txt > ./temp/useroutput.txt 2>&1"
    os.system(command)
    
    # get user output
    user_output_file = open('./temp/useroutput.txt', 'r')
    user_output = user_output_file.read()
    user_output_file.close()

    # compare outputs and check pass
    if right_ans == user_output:
        outdict["pass"] = 1
    else:
        outdict["pass"] = 0

    # update output
    outdict["testinput"] = tinput
    outdict["testoutput"] = right_ans
    outdict["youroutput"] = user_output

    return JsonResponse(outdict)

@csrf_exempt
def codeExecutionApi(request, question_id = 0):
    # return error message if the method is not POST
    if request.method != 'POST':
        outdict = {
                "output" : "Use POST request"
                }
        return JsonResponse(outdict)

    # read first testcase and make input file to test data complexity
    testcase = Testcase.objects.filter(questionId = question_id)[0]
    testcase_serializer = Testcase_Serializer(testcase)
    inputdata = testcase_serializer.data["input"]
    with open("./temp/testinput.txt", "w") as tifile:
        tifile.write(inputdata)

    # get code from request
    submit_data = JSONParser().parse(request)
    usercode = submit_data["code"]

    # make output dictionary
    outdict = {
            "output" : ""
            }

    # make file to execute
    execf = open("./temp/exectemp.py", 'w')
    execf.write(usercode)
    execf.write("\nprint(solution(), end='')\n")
    execf.close()

    # execute and redirect stdout,stderr to execout.txt
    command = "python3 ./temp/exectemp.py < ./temp/testinput.txt > ./temp/execout.txt 2>&1"
    os.system(command)

    # read execout.txt
    with open("./temp/execout.txt", "r") as f:
        outtxt = f.read()

    outdict["output"] = outtxt
    
    return JsonResponse(outdict)


@csrf_exempt
def referenceApi(request, question_id = 0):
    if request.method != 'GET':
        return JsonResponse("only GET method is available!", safe= False)
    else:

        outdict = {
            "video" : ["",""], #영상 제목, 영상 링크
            "question" :  ["",""], #관련 질문 링크
            "learning" : [["",""],["",""],["",""]] #[관련자료 제목, 관련자료 링크] *3
            }
        
        question = Question.objects.filter(questionId = question_id)
        question_serializer = Question_Serializer(question, many = True)
        reference = question_serializer.data[0]["relatedResource"]

        reference_list = reference.split()


        baseurl = "https://www.google.com/search?q="

        #검색어는 db relatedresource 참고
        plusurl = reference_list[1]
        url = baseurl + quote_plus(plusurl, encoding='utf-8') #관련 자료 위한 url
        url_video = baseurl + quote_plus(plusurl+"영상", encoding='utf-8') #관련 영상 크롤링 위한 url
        driver = webdriver.Chrome()
        
        driver.get(url)
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        r = soup.select('.yuRUbf')

        driver.get(url_video)
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        rv = soup.select('.sI5x9c')
        
        
        outdict["video"] = [rv[0].select_one('.cHaqb').text, rv[0].a.attrs['href']]

        outdict["question"] = [reference_list[1]+"연습 문제", reference_list[0]]

        t=0
        for i in r:
            outdict["learning"][t] = [i.select_one('.LC20lb.DKV0Md').text, unquote_plus(i.a.attrs['href'], encoding='utf-8')]
            t += 1
            if t >=3:
                break


        return JsonResponse(outdict, safe = False)

