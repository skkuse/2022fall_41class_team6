"""mainApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from mainApp import views

urlpatterns = [
    path('lecture/', views.lectureApi),
    path('lecture/<id>/', views.lectureApi),

    path('question/', views.questionApi),
    path('question/<id>/', views.questionApi),

    path('testcase/', views.testcaseApi),
    path('testcase/<question_id>/', views.testcaseApi),
    path('testcase/<question_id>/<id>', views.testcaseApi),

    path('code_saved/', views.code_savedApi),
    path('code_saved/<question_id>/', views.code_savedApi),
    path('code_saved/<question_id>/<id>', views.code_savedApi),

    path('code_submitted/', views.code_submittedApi),
    path('code_submitted/<question_id>/', views.code_submittedApi),
    path('code_submitted/<question_id>/<id>', views.code_submittedApi),
    path('code_submitted/<question_id>/<id>/efficiency', views.codeEfficiencyApi),
    path('code_submitted/<question_id>/<id>/visibility', views.code_submittedApi),
    path('code_submitted/<question_id>/<id>/plagiarism', views.codePlagiarismApi),
    path('code_submitted/<question_id>/<id>/explain', views.codeExplainApi)
]
